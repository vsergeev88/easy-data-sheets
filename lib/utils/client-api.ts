import type { DataSheet } from "@/lib/data/dataSheets";

export type ApiResponse<T> = {
	success: boolean;
	data?: T;
	error?: string;
};

export async function updateDataSheetClient(
	dataSheet: DataSheet
): Promise<ApiResponse<DataSheet>> {
	try {
		const response = await fetch("/clientApi/datasheet/update", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ dataSheet }),
		});

		const result = await response.json();

		if (!response.ok) {
			return {
				success: false,
				error: result.error || "Failed to update dataSheet",
			};
		}

		return {
			success: true,
			data: result.dataSheet,
		};
	} catch {
		return {
			success: false,
			error: "Network error occurred",
		};
	}
}
