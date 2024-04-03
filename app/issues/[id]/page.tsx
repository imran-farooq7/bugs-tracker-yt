import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import prisma from "@/prisma/client";
import { Box, Button, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import DeleteIssueButton from "../components/DeleteIssueButton";
import { getServerSession } from "next-auth";
import authOptions from "@/lib/authOptions";
interface Props {
	params: {
		id: string;
	};
}
const IssueDetailsPage = async ({ params }: Props) => {
	const session = await getServerSession(authOptions);
	const issue = await prisma.issue.findUnique({
		where: {
			id: params.id,
		},
	});
	if (!issue) {
		notFound();
	}
	return (
		<Grid className="ml-4 mt-4 max-w-7xl " columns={"2"}>
			<Box className="space-y-3">
				<Heading>{issue?.title}</Heading>
				<Flex gap={"3"}>
					<IssueStatusBadge status={issue.status} />
					<p>{issue?.createdAt.toDateString()}</p>
				</Flex>
				<Card>{issue?.description}</Card>
			</Box>
			{session && (
				<Flex gap={"3"}>
					<Link href={`/issues/${issue.id}/edit`}>
						<Button>Edit Issue</Button>
					</Link>
					<DeleteIssueButton issueId={issue.id} />
				</Flex>
			)}
		</Grid>
	);
};
export default IssueDetailsPage;
