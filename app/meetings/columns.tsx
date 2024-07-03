import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react"; // Import the ArrowUpDown icon

export type Meeting = {
	jobNumber: string;
	date: string;
	timeZoneDisplayName: string;
	requiresAttention: boolean;
	videoLink: string;
	status: string;
	zoomJoinLink: string;
	vriRoomNumber: number | null;
	vri: boolean;
	vriLabel: boolean;
	vriType: boolean;
	createdbyLLS: boolean;
};

export const columns: ColumnDef<Meeting>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected()}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
				aria-label="Select row"
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "jobNumber",
		header: ({ column }) => (
			<div className="flex items-center justify-center cursor-pointer">
				Job Number
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</div>
		),
		cell: ({ row }) => (
			<div className="text-center">{row.getValue("jobNumber") as string}</div>
		),
		enableSorting: true,
	},
	{
		accessorKey: "date",
		header: ({ column }) => (
			<div className="flex items-center justify-center cursor-pointer">
				Date & Time
				<ArrowUpDown className="ml-2 h-4 w-4" />
			</div>
		),
		cell: ({ row }) => {
			const date = row.getValue("date") as string;
			return <div className="text-center">{date}</div>;
		},
		enableSorting: true,
	},
	{
		accessorKey: "timeZoneDisplayName",
		header: () => <div className="text-center">Time Zone</div>,
		cell: ({ row }) => (
			<div className="text-center">
				{row.getValue("timeZoneDisplayName") as string}
			</div>
		),
		enableSorting: true,
	},
	{
		accessorKey: "requiresAttention",
		header: () => <div className="text-center">Requires Attention</div>,
		cell: ({ row }) => {
			const { vri, vriLabel, vriType } = row.original;
			const badgeColor =
				vri && vriLabel && vriType
					? "text-green-600 bg-green-100"
					: "text-red-600 bg-red-100";
			const badgeText =
				vri && vriLabel && vriType ? "OK" : "Requires Attention";

			return (
				<div className="text-center">
					<Badge className={badgeColor}>{badgeText}</Badge>
				</div>
			);
		},
		enableSorting: true,
		sortingFn: (rowA, rowB) => {
			const a = rowA.original;
			const b = rowB.original;
			return (a.vri && a.vriLabel && a.vriType) ===
				(b.vri && b.vriLabel && b.vriType)
				? 0
				: a.vri && a.vriLabel && a.vriType
					? -1
					: 1;
		},
	},
	{
		accessorKey: "videoLink",
		header: () => <div className="text-center">3rd Party Video Link</div>,
		cell: ({ row }) => (
			<div className="text-center">{row.getValue("videoLink") as string}</div>
		),
		enableSorting: true,
	},
	{
		accessorKey: "status",
		header: () => <div className="text-center">Status</div>,
		cell: ({ row }) => {
			const { createdbyLLS, videoLink } = row.original;

			let statusText = "Pending Customer";
			let statusColor = "text-yellow-600 bg-yellow-100";

			if (createdbyLLS) {
				statusText = "Link Provided";
				statusColor = "text-green-600 bg-green-100";
			} else if (videoLink.toLowerCase().includes("demo")) {
				statusText = "Demo Link Pending";
				statusColor = "text-red-600 bg-red-100";
			} else if (videoLink.includes("http")) {
				statusText = "Cust. Provided Link";
				statusColor = "text-blue-600 bg-blue-100";
			}

			return (
				<div className="text-center">
					<Badge className={statusColor}>{statusText}</Badge>
				</div>
			);
		},
		enableSorting: true,
		sortingFn: (rowA, rowB) => {
			const getStatusPriority = (row: Meeting) => {
				if (row.createdbyLLS) return 1;
				if (row.videoLink.toLowerCase().includes("demo")) return 2;
				if (row.videoLink.includes("http")) return 3;
				return 4; // Pending Customer
			};
			return (
				getStatusPriority(rowA.original) - getStatusPriority(rowB.original)
			);
		},
	},
	{
		accessorKey: "zoomJoinLink",
		header: () => <div className="text-center">Link</div>,
		cell: ({ row }) => (
			<div className="text-center truncate max-w-xs">
				<a
					href={row.getValue("zoomJoinLink") as string}
					target="_blank"
					rel="noopener noreferrer"
				>
					{row.getValue("zoomJoinLink") as string}
				</a>
			</div>
		),
		size: 150,
		enableSorting: true,
	},
	{
		accessorKey: "vriRoomNumber",
		header: () => <div className="text-center">Vri Room</div>,
		cell: ({ row }) => (
			<div className="text-center">
				{row.getValue("vriRoomNumber") as string}
			</div>
		),
		enableSorting: true,
	},
	{
		id: "actions",
		header: () => <div className="text-center">Actions</div>,
		cell: ({ row }) => {
			const meeting = row.original;
			return (
				<div className="text-center">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" className="h-8 w-8 p-0">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal className="h-4 w-4" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Actions</DropdownMenuLabel>
							<DropdownMenuItem
								onClick={() => navigator.clipboard.writeText(meeting.jobNumber)}
							>
								Copy Job Number
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>View Details</DropdownMenuItem>
							<DropdownMenuItem>Edit Meeting</DropdownMenuItem>
							<DropdownMenuItem>Generate Zoom Link</DropdownMenuItem>
							<DropdownMenuItem>
								Generate Link & Notify Customer
							</DropdownMenuItem>
							<DropdownMenuItem>Refetch</DropdownMenuItem>
							<DropdownMenuItem>Delete</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
		enableSorting: false,
	},
];
