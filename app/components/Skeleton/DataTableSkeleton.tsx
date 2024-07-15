import { Skeleton } from "@/components/ui/skeleton";
import type React from "react";

const DataTableSkeleton: React.FC<{ rows?: number; columns?: number }> = ({
	rows = 5,
	columns = 5,
}) => {
	const columnsArray = Array(columns).fill(0);
	const rowsArray = Array(rows).fill(0);

	return (
		<div>
			<div className="flex space-x-2 mb-4">
				<Skeleton className="h-9 w-2/4" />
				<Skeleton className="h-9 w-1/4" />
				<Skeleton className="h-9 w-48" />
			</div>
			<div className="space-y-2">
				{rowsArray.map((_, rowIndex) => (
					<div key={`row-${rowIndex}-${Date.now()}`} className="flex space-x-2">
						{columnsArray.map((_, colIndex) => (
							<Skeleton
								key={`col-${colIndex}-${Date.now()}`}
								className="h-8 w-full"
							/>
						))}
					</div>
				))}
			</div>
		</div>
	);
};

export default DataTableSkeleton;
