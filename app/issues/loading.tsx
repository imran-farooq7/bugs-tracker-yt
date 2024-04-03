import { Button, Link, Table } from "@radix-ui/themes";
import IssueStatusBadge from "../components/IssueStatusBadge";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const LoadingIssuesPage = () => {
	const issues = [1, 2, 3, 4, 5];
	return (
		<div className="max-w-7xl mt-4 ml-4">
			<Button>
				<Link href={"issues/new"}>New Issue</Link>
			</Button>
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
						<Table.Row key={issue}>
							<Table.Cell>
								<Skeleton />
							</Table.Cell>
							<Table.Cell>
								<Skeleton />
							</Table.Cell>
							<Table.Cell>
								<Skeleton />
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	);
};
export default LoadingIssuesPage;
