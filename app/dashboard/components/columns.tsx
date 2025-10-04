import type { ColumnDef } from "@tanstack/react-table";
import type { DataSheetResponse } from "@/lib/data/datasheetResponses";

import { Archive, ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AddToArchive } from "./AddToArchive";
import { AddToFavorites } from "./AddToFavorites";

export const columns: ColumnDef<DataSheetResponse>[] = [
	{
		id: "select",
		header: ({ table }) => (
			<Checkbox
				aria-label="Select all"
				bubbles={false}
				checked={
					table.getIsAllPageRowsSelected() ||
					(table.getIsSomePageRowsSelected() && "indeterminate")
				}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
			/>
		),
		cell: ({ row }) => (
			<Checkbox
				aria-label="Select row"
				checked={row.getIsSelected()}
				onCheckedChange={(value) => row.toggleSelected(!!value)}
			/>
		),
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: "datasheetName",
		header: "Datasheet Name",
		cell: ({ row }) => (
			<div className="cursor-pointer">{row.getValue("datasheetName")}</div>
		),
	},
	{
		accessorKey: "contacts",
		header: "Contacts",
		cell: ({ row }) => (
			<div className="cursor-pointer">{row.getValue("contacts")}</div>
		),
		enableHiding: false,
	},
	{
		accessorKey: "createdAt",
		header: ({ column }) => {
			return (
				<Button
					onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					variant="ghost"
				>
					Responded At
					<ArrowUpDown />
				</Button>
			);
		},
		cell: ({ row }) => (
			<div className="text-slate-600 text-xs">
				{Intl.DateTimeFormat("en-US", {
					dateStyle: "medium",
					timeStyle: "short",
				}).format(row.getValue("createdAt"))}
			</div>
		),
	},
	{
		accessorKey: "notes",
		header: () => <div className="text-center">Quick Notes</div>,
		cell: ({ row, table }) => {
			if (row.getValue("notes")) {
				return <div className="cursor-pointer">{row.getValue("notes")}</div>;
			}
			return (
				<div className="cursor-pointer text-center">
					<Button
						className="text-slate-400"
						onClick={(e) => {
							e.stopPropagation();
							table.options.meta?.addQuickNotes?.(
								row.original,
								row.getValue("notes")
							);
						}}
						variant="ghost"
					>
						<Pencil /> add notes
					</Button>
				</div>
			);
		},
	},
	{
		accessorKey: "actions",
		header: () => <div className="text-right" />,
		cell: ({ row }) => {
			return (
				<div className="flex items-center gap-2">
					<AddToFavorites
						id={row.original.id as string}
						isFavorite={row.original.bookmarked}
					/>
					<AddToArchive>
						<Button
							className="text-slate-400"
							onClick={(e) => e.stopPropagation()}
							size="icon"
							variant="ghost"
						>
							<Archive />
						</Button>
					</AddToArchive>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button className="h-8 w-8 p-0 text-slate-400" variant="ghost">
								<span className="sr-only">Open menu</span>
								<MoreHorizontal />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent
							align="end"
							onClick={(e) => e.stopPropagation()}
						>
							{row.original.unread ? (
								<DropdownMenuItem>Make read</DropdownMenuItem>
							) : (
								<DropdownMenuItem>Make unread</DropdownMenuItem>
							)}
							{row.original.archived ? (
								<DropdownMenuItem>Return from archive</DropdownMenuItem>
							) : (
								<AddToArchive>
									<DropdownMenuItem>Move to archive</DropdownMenuItem>
								</AddToArchive>
							)}
							<DropdownMenuItem>Move to trash</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			);
		},
	},
];
