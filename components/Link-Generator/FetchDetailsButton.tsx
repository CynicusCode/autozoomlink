"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

interface FetchDetailsButtonProps {
	jobNumber: string;
}

const FetchDetailsButton: React.FC<FetchDetailsButtonProps> = ({
	jobNumber,
}) => {
	const handleFetchDetails = async () => {
		// Placeholder logic to search in Prisma using the jobNumber
		// Replace this with your actual Prisma query logic
		const fetchedData = await prisma.job.findUnique({
			where: { jobNumber: jobNumber },
		});

		// Handle the fetched data as needed
		console.log("Fetched data:", fetchedData);

		// Optionally, you can navigate to another page after fetching the details
		// router.push("/path/to/another/page");
	};

	return (
		<div className="flex justify-center">
			<Button
				onClick={handleFetchDetails}
				className="bg-orange-600 text-white hover:bg-orange-700"
			>
				Fetch Details
			</Button>
		</div>
	);
};

export default FetchDetailsButton;
