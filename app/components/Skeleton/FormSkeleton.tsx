//app/components/Skeleton/FormSkeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import type React from "react";

const SkeletonLoader: React.FC = () => (
	<div className="space-y-4">
		<Skeleton className="h-6 w-1/2" />
		<Skeleton className="h-6 w-1/4" />
		<Skeleton className="h-6 w-full" />
		<Skeleton className="h-6 w-3/4" />
		<Skeleton className="h-6 w-1/3" />
	</div>
);

export default SkeletonLoader;
