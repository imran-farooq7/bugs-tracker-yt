import IssueForm from "../../components/IssueForm";
import prisma from "@/prisma/client";
interface Props {
	params: {
		id: string;
	};
}

const IssueEditPage = async ({ params }: Props) => {
	const issue = await prisma.issue.findUnique({
		where: {
			id: params.id,
		},
	});
	return <IssueForm issue={issue!} />;
};
export default IssueEditPage;
