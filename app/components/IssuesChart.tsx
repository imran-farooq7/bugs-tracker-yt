"use client";
import { Card } from "@radix-ui/themes";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface Props {
	open: number;
	close: number;
	inProgress: number;
}
const IssuesChart = ({ close, inProgress, open }: Props) => {
	const data = [
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
		<Card>
			<ResponsiveContainer width={"100%"} height={300}>
				<BarChart data={data}>
					<XAxis dataKey={"label"} />
					<YAxis />
					<Bar dataKey={"value"} barSize={50} fill="#87CEEB" />
				</BarChart>
			</ResponsiveContainer>
		</Card>
	);
};
export default IssuesChart;
