import { Card, Flex, Text } from "@radix-ui/themes";

interface Props {
	open: number;
	close: number;
	inProgress: number;
}
const IssuesSummary = ({ close, inProgress, open }: Props) => {
	const IssuesStatus = [
		{
			label: "Open",
			value: open,
		},
		{
			label: "Closed",
			value: close,
		},
		{
			label: "In Progress",
			value: inProgress,
		},
	];
	return (
		<Flex gap={"4"}>
			{IssuesStatus.map((status) => (
				<Card key={status.label}>
					<Flex direction={"column"} align={"center"}>
						<Text>{status.label}</Text>
						<Text className="font-bold" size={"6"}>
							{status.value}
						</Text>
					</Flex>
				</Card>
			))}
		</Flex>
	);
};
export default IssuesSummary;
