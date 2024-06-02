// app/components/Meetings/columns.tsx

"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

export type Appointment = {
	id: string;
	manualTitle: string;
	date: string;
	duration: string;
	timeZone: string;
	vri: boolean;
	videoLink: string;
};

export const columns: ColumnDef<Appointment>[] = [
	{
		accessorKey: "manualTitle",
		header: "Manual Title",
	},
	{
		accessorKey: "date",
		header: "Date & Time",
	},
	{
		accessorKey: "duration",
		header: "Duration",
	},
	{
		accessorKey: "timeZone",
		header: "Time Zone",
	},
	{
		accessorKey: "vri",
		header: "VRI",
		cell: ({ row }) => (row.original.vri ? "Yes" : "No"),
	},
	{
		accessorKey: "videoLink",
		header: "Video Link",
	},
	{
		id: "actions",
		cell: ({ row }) => {
			const appointment = row.original;
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
							onClick={() => console.log("Generate link for", appointment.id)}
						>
							Generate Link
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
