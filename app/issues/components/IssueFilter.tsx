"use client";
import { Status } from "@prisma/client";
import { Select } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
const statuses: { label: string; value?: Status }[] = [
	{ label: "All" },
	{ label: "Open", value: "OPEN" },
	{ label: "Close", value: "CLOSED" },
	{ label: "In Progress", value: "IN_PROGRESS" },
];

const IssueFilter = () => {
	const router = useRouter();
	return (
		<Select.Root
			onValueChange={(status) => router.push(`/issues?status=${status}`)}
		>
			<Select.Trigger placeholder="Filter by status" />
			<Select.Content>
				{statuses.map((status) => (
					<Select.Item key={status.label} value={status.value || "All"}>
						{status.label}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};
export default IssueFilter;
