"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
interface Props {
	issueId: string;
}

const DeleteIssueButton = ({ issueId }: Props) => {
	const router = useRouter();
	const [error, setError] = useState(false);
	const onDeleteIssue = async () => {
		try {
			await axios.delete(`/api/issues/${issueId}`);
			router.push("/issues");
			router.refresh();
		} catch (error) {
			setError(true);
		}
	};
	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color="red">Delete Issue</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Title>Confirmation Delete Issue</AlertDialog.Title>
					<AlertDialog.Description>
						Are you sure you want to delete this issue?
					</AlertDialog.Description>
					<Flex mt={"3"} gap={"3"}>
						<AlertDialog.Cancel>
							<Button color="gray">Cancel</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button color="red" onClick={onDeleteIssue}>
								Delete Issue
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description>
						Issue could not be deleted right now
					</AlertDialog.Description>
					<Button
						color="gray"
						variant="soft"
						onClick={() => setError(false)}
						mt={"2"}
					>
						Ok
					</Button>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};
export default DeleteIssueButton;
