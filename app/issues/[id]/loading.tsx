import { Card, Flex } from "@radix-ui/themes";
import Skeleton from "react-loading-skeleton";

const LoadingIssueDetails = () => {
	return (
		<div>
			<Skeleton />
			<Flex className="space-x-3" my={"2"}>
				<Skeleton width={"5rem"} />
				<Skeleton width={"8rem"} />
			</Flex>
			<Card className="prose" mt={"2"}>
				<Skeleton count={3} />
			</Card>
		</div>
	);
};
export default LoadingIssueDetails;
