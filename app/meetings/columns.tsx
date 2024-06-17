// app/meetings/columns.tsx
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
import { Badge } from "@/components/ui/badge"; // Import the Badge component
import { Dropdown } from "react-day-picker";

export type Meeting = {
	jobNumber: string;
	date: string;
	timeZoneDisplayName: string;
	requiresAttention: boolean;
	videoLink: string;
	status: string;
	zoomJoinLink: string;
	vriRoomNumber: number;
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
		header: () => <div className="text-center">Job Number</div>,
		cell: ({ row }) => (
			<div className="text-center">{row.getValue("jobNumber") as string}</div>
		),
	},
	{
		accessorKey: "date",
		header: () => <div className="text-center">Date & Time</div>,
		cell: ({ row }) => {
			const date = row.getValue("date") as string;
			return <div className="text-center">{date}</div>;
		},
	},
	{
		accessorKey: "timeZoneDisplayName",
		header: () => <div className="text-center">Time Zone</div>,
		cell: ({ row }) => (
			<div className="text-center">
				{row.getValue("timeZoneDisplayName") as string}
			</div>
		),
	},
	{
		accessorKey: "badge",
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
	},
	{
		accessorKey: "videoLink",
		header: () => <div className="text-center">3rd Party Video Link</div>,
		cell: ({ row }) => (
			<div className="text-center">{row.getValue("videoLink") as string}</div>
		),
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
	},
	{
		accessorKey: "vriRoomNumber",
		header: () => <div className="text-center">Vri Room</div>,
		cell: ({ row }) => (
			<div className="text-center">
				{row.getValue("vriRoomNumber") as string}
			</div>
		),
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
	},
];
