import prisma from "@/prisma/client";
import { Card, Flex, Table } from "@radix-ui/themes";
import IssueStatusBadge from "./IssueStatusBadge";
import Link from "next/link";
const LatestIssues = async () => {
	const issues = await prisma.issue.findMany({
		orderBy: {
			createdAt: "desc",
		},
		take: 5,
	});
	return (
		<Card>
			<Table.Root>
				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.Cell>
								<Flex justify={"between"}>
									<Link href={`/issues/${issue.id}`}>{issue.title}</Link>
									<IssueStatusBadge status={issue.status} />
								</Flex>
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</Card>
	);
};
export default LatestIssues;
