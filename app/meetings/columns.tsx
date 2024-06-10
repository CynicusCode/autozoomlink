// app/meetings/columns.tsx

"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

// Define the shape of our data
export type Meeting = {
	jobNumber: string;
	date: string;
	time: string;
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
		accessorKey: "jobNumber",
		header: "Job Number",
	},
	{
		accessorKey: "date",
		header: "Date & Time",
		cell: ({ row }) => {
			const date = row.getValue("date");
			const time = row.getValue("time");
			return `${date} ${time}`;
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
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
