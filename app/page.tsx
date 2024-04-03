import { Flex, Grid } from "@radix-ui/themes";
import IssuesChart from "./components/IssuesChart";
import IssuesSummary from "./components/IssuesSummary";
import LatestIssues from "./components/LatestIssues";
import prisma from "@/prisma/client";

const HomePage = async () => {
	const open = await prisma.issue.count({
		where: {
			status: "OPEN",
		},
	});
	const close = await prisma.issue.count({
		where: {
			status: "CLOSED",
		},
	});
	const inProgress = await prisma.issue.count({
		where: {
			status: "IN_PROGRESS",
		},
	});
	return (
		<Grid columns={{ initial: "1", md: "2" }} gap={"7"}>
			<Flex gap={"5"} direction={"column"}>
				<IssuesSummary open={open} close={close} inProgress={inProgress} />
				<IssuesChart open={open} close={close} inProgress={inProgress} />
			</Flex>
			<LatestIssues />
		</Grid>
	);
};
export default HomePage;
