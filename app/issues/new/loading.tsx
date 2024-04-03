import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewIssueLoading = () => {
	return (
		<div>
			<Skeleton />
			<Skeleton height={"20rem"} />
			<Skeleton width={"140px"} />
		</div>
	);
};
export default NewIssueLoading;
