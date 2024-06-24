// app/components/Skeleton/FormSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import type React from "react";

const SkeletonLoader: React.FC = () => (
	<div className="space-y-4">
		<Skeleton className="flex h-9 w-full" />
		<div className="flex space-x-2">
			<Skeleton className="h-9 w-1/6" />
			<Skeleton className="h-9 w-1/12" />
		</div>
		<Skeleton className="h-9 w-full" />
		<Skeleton className="h-9 w-3/4" />
		<Skeleton className="h-9 w-1/3" />
	</div>
);

export default SkeletonLoader;
