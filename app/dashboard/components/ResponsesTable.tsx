"use client";

import type { DataSheetResponse } from "@/lib/data/datasheetResponses";

declare module "@tanstack/react-table" {
	interface TableMeta<TData extends RowData> {
		onRowClick?: (row: TData) => void;
		addQuickNotes?: (row: TData, notes: string) => void;
	}
}

import {
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
import { useState } from "react";

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

import { columns } from "./columns";
import ResponseDetailsModal from "./ResponseDetailsModal";

type ResponsesTableProps = {
	responses: DataSheetResponse[];
	withName?: boolean;
};

const ResponsesTable: React.FC<ResponsesTableProps> = ({
	responses,
	withName = false,
}) => {
	const [sorting, setSorting] = useState<SortingState>([]);
	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
		datasheetName: withName,
	});
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
									className={cn(
										row.original.unread && "bg-yellow-50/50 font-semibold"
									)}
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
