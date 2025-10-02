"use client";

import type { DataSheetResponse } from "@/lib/data/datasheetResponses";

declare module "@tanstack/react-table" {
	interface TableMeta<TData extends RowData> {
		onRowClick?: (row: TData) => void;
		addQuickNotes?: (row: TData, notes: string) => void;
	}
}

import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type RowData,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Pencil, Star } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

import ResponseDetailsModal from "./ResponseDetailsModal";

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
			<div className="cursor-pointer">
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
		accessorKey: "bookmarked",
		header: () => <div className="text-right" />,
		cell: ({ row }) => {
			return (
				<Button
					className="text-center font-medium"
					onClick={(e) => {
						e.stopPropagation();
					}}
					size="icon"
					variant="ghost"
				>
					<Star
						className={cn(
							"text-3xl",
							(row.getValue("bookmarked") as boolean)
								? "text-yellow-500"
								: "text-slate-500"
						)}
					/>
				</Button>
			);
		},
	},
	// {
	// 	id: "actions",
	// 	enableHiding: false,
	// 	cell: ({ row }) => {
	// 		const response = row.original;

	// 		return (
	// 			<DropdownMenu>
	// 				<DropdownMenuTrigger asChild>
	// 					<Button className="h-8 w-8 p-0" variant="ghost">
	// 						<span className="sr-only">Open menu</span>
	// 						<MoreHorizontal />
	// 					</Button>
	// 				</DropdownMenuTrigger>
	// 				<DropdownMenuContent align="end">
	// 					<DropdownMenuLabel>Actions</DropdownMenuLabel>
	// 					<DropdownMenuItem
	// 						onClick={() => navigator.clipboard.writeText(response.id)}
	// 					>
	// 						Copy payment ID
	// 					</DropdownMenuItem>
	// 					<DropdownMenuSeparator />
	// 					<DropdownMenuItem>View customer</DropdownMenuItem>
	// 					<DropdownMenuItem>View payment details</DropdownMenuItem>
	// 				</DropdownMenuContent>
	// 			</DropdownMenu>
	// 		);
	// 	},
	// },
];

type ResponsesTableProps = {
	responses: DataSheetResponse[];
};

const ResponsesTable: React.FC<ResponsesTableProps> = ({ responses }) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
	const [rowSelection, setRowSelection] = useState({});
	const [openDetailsModal, setOpenDetailsModal] = useState(false);
	const [activeResponse, setActiveResponse] =
		useState<DataSheetResponse | null>(null);

	const onRowClick = (response: DataSheetResponse) => {
		setActiveResponse(response);
		setOpenDetailsModal(true);
	};

	const addQuickNotes = (response: DataSheetResponse, notes: string) => {
		console.log("addQuickNotes", response, notes);
	};

	const table = useReactTable({
		data: responses,
		columns,
		onSortingChange: setSorting,
		onColumnFiltersChange: setColumnFilters,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		onColumnVisibilityChange: setColumnVisibility,
		onRowSelectionChange: setRowSelection,
		state: {
			sorting,
			columnFilters,
			columnVisibility,
			rowSelection,
		},
		meta: {
			onRowClick,
			addQuickNotes,
		},
	});

	return (
		<div className="w-full bg-background">
			<div className="flex items-center py-4">
				<Input
					className="max-w-sm"
					onChange={(event) =>
						table.getColumn("contacts")?.setFilterValue(event.target.value)
					}
					placeholder="Filter contacts..."
					value={
						(table.getColumn("contacts")?.getFilterValue() as string) ?? ""
					}
				/>
				{/* <DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="ml-auto" variant="outline">
							Columns <ChevronDown />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						{table
							.getAllColumns()
							.filter((column) => column.getCanHide())
							.map((column) => {
								return (
									<DropdownMenuCheckboxItem
										checked={column.getIsVisible()}
										className="capitalize"
										key={column.id}
										onCheckedChange={(value) =>
											column.toggleVisibility(!!value)
										}
									>
										{column.id}
									</DropdownMenuCheckboxItem>
								);
							})}
					</DropdownMenuContent>
				</DropdownMenu> */}
			</div>
			<div className="overflow-hidden rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => {
									return (
										<TableHead key={header.id}>
											{header.isPlaceholder
												? null
												: flexRender(
														header.column.columnDef.header,
														header.getContext()
													)}
										</TableHead>
									);
								})}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows?.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow
									data-state={row.getIsSelected() && "selected"}
									key={row.id}
									onClick={() => table.options.meta?.onRowClick?.(row.original)}
									onKeyDown={(e) => {
										if (e.key === "Enter") {
											table.options.meta?.onRowClick?.(row.original);
										}
									}}
								>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									className="h-24 text-center"
									colSpan={columns.length}
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>
			<div className="flex items-center justify-end space-x-2 py-4">
				<div className="flex-1 text-muted-foreground text-sm">
					{table.getFilteredSelectedRowModel().rows.length} of{" "}
					{table.getFilteredRowModel().rows.length} row(s) selected.
				</div>
			</div>
			<ResponseDetailsModal
				openDetailsModal={openDetailsModal}
				response={activeResponse}
				setOpenDetailsModal={() => {
					setOpenDetailsModal(false);
					setActiveResponse(null);
				}}
			/>
		</div>
	);
};

export default ResponsesTable;
