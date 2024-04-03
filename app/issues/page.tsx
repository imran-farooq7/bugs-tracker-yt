import { Button, Flex, Table } from "@radix-ui/themes";
import Link from "next/link";
import prisma from "../../prisma/client";
import IssueStatusBadge from "../components/IssueStatusBadge";
import delay from "delay";
import LinkCustom from "../components/LinkCustom";
import IssueFilter from "./components/IssueFilter";
import { Status } from "@prisma/client";

const IssuesPage = async ({
	searchParams,
}: {
	searchParams: {
		status: Status;
	};
}) => {
	const statuses = Object.values(Status);
	const validStatus = statuses.includes(searchParams.status)
		? searchParams.status
		: undefined;
	const issues = await prisma.issue.findMany({
		where: {
			status: validStatus,
		},
	});
	return (
		<div className="max-w-7xl mt-4 ml-4">
			<Flex justify={"between"}>
				<IssueFilter />
				<Button>
					<Link href={"issues/new"}>New Issue</Link>
				</Button>
			</Flex>
			<Table.Root variant="surface" className="mt-4">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<LinkCustom href={`/issues/${issue.id}`}>
									{issue.title}
								</LinkCustom>
							</Table.Cell>
							<Table.Cell>
								<IssueStatusBadge status={issue.status} />
							</Table.Cell>
							<Table.Cell>{issue.createdAt.toDateString()}</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	);
};
export default IssuesPage;
