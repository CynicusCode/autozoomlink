// app/meetings/columns.tsx

"use client";

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

// Define the shape of our data
export type Meeting = {
	jobNumber: string;
	date: string;
	timeZone: string;
	requiresAttention: string;
	thirdPartyVideoLink: string;
	status: string;
	link: string;
	vriRoom: string;
};

// Define the columns
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
		header: "Job Number",
	},
	{
		accessorKey: "date",
		header: "Date & Time",
		cell: ({ row }) => {
			const date = row.getValue("date");
			return `${date}`;
		},
	},
	{
		accessorKey: "timeZone",
		header: "Time Zone",
	},
	{
		accessorKey: "requiresAttention",
		header: "Requires Attention",
	},
	{
		accessorKey: "thirdPartyVideoLink",
		header: "3rd Party Video Link",
	},
	{
		accessorKey: "status",
		header: "Status",
	},
	{
		accessorKey: "link",
		header: "Link",
	},
	{
		accessorKey: "vriRoom",
		header: "Vri Room",
	},
	{
		id: "actions",
		header: "Actions",
		cell: ({ row }) => {
			const meeting = row.original;
			return (
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
						<DropdownMenuItem>Generate Link & Notify Customer</DropdownMenuItem>
						<DropdownMenuItem>Delete</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
