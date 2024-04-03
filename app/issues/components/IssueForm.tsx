"use client";
import { Button, Text, TextArea, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import Spinner from "@/app/components/Spinner";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Issue } from "@prisma/client";
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
	ssr: false,
});
interface Props {
	issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
	const { register, control, handleSubmit, formState } = useForm();
	const [isLoading, setIsLoading] = useState(false);
	const { errors } = formState;
	const router = useRouter();
	const onSubmitHandler = async (data: any) => {
		try {
			setIsLoading(true);
			if (issue) {
				await axios.patch(`/api/issues/${issue.id}`, data);
			} else {
				await axios.post("/api/issues", data);
			}
			router.push("/issues");
			router.refresh();
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<form
			className="max-w-xl p-5 space-y-3"
			onSubmit={handleSubmit(onSubmitHandler)}
		>
			<TextField.Root>
				<TextField.Input
					placeholder="Title"
					{...register("title", {
						required: "Title is required",
					})}
					defaultValue={issue?.title}
				/>
			</TextField.Root>
			{errors.title?.message && (
				<Text color="red" as="p" className="mt-2">
					{errors.title.message as string}
				</Text>
			)}
			<Controller
				render={({ field }) => (
					<SimpleMDE placeholder="Description" {...field} />
				)}
				control={control}
				{...register("description", {
					required: "Description is required",
				})}
				defaultValue={issue?.description}
			/>
			{errors.description?.message && (
				<Text color="red" as="p">
					{errors.description.message as string}
				</Text>
			)}
			<Button>
				{issue ? "Edit Issue" : `Submit New Issue `}
				{isLoading && <Spinner />}
			</Button>
		</form>
	);
};
export default IssueForm;
