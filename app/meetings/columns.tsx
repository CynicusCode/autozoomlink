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
		accessorKey: "timeZone",
		header: () => <div className="text-center">Time Zone</div>,
		cell: ({ row }) => (
			<div className="text-center">{row.getValue("timeZone") as string}</div>
		),
	},
	{
		accessorKey: "requiresAttention",
		header: () => <div className="text-center">Requires Attention</div>,
		cell: ({ row }) => (
			<div className="text-center">
				{row.getValue("requiresAttention") as string}
			</div>
		),
	},
	{
		accessorKey: "thirdPartyVideoLink",
		header: () => <div className="text-center">3rd Party Video Link</div>,
		cell: ({ row }) => (
			<div className="text-center">
				{row.getValue("thirdPartyVideoLink") as string}
			</div>
		),
	},
	{
		accessorKey: "Link Status",
		header: () => <div className="text-center">Link Status</div>,
		cell: ({ row }) => (
			<div className="text-center">{row.getValue("Link Status") as string}</div>
		),
	},
	{
		accessorKey: "link",
		header: () => <div className="text-center">Link</div>,
		cell: ({ row }) => (
			<div className="text-center">{row.getValue("link") as string}</div>
		),
	},
	{
		accessorKey: "vriRoom",
		header: () => <div className="text-center">Vri Room</div>,
		cell: ({ row }) => (
			<div className="text-center">{row.getValue("vriRoom") as string}</div>
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
							<DropdownMenuItem>Delete</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];
