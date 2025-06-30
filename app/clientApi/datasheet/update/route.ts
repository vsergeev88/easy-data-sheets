import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from "next/server";
import { type DataSheet, updateDataSheet } from "@/lib/data/dataSheets";

export async function POST(request: NextRequest) {
	try {
		// Проверяем аутентификацию
		const { userId } = await auth();
		if (!userId) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Парсим тело запроса
		const body = await request.json();
		const { dataSheet } = body as { dataSheet: DataSheet };

		if (!dataSheet) {
			return NextResponse.json(
				{ error: "DataSheet is required" },
				{ status: 400 }
			);
		}

		// Проверяем, что пользователь может редактировать этот dataSheet
		if (dataSheet.userId !== userId) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		// Обновляем dataSheet
		const updatedDataSheet = await updateDataSheet({
			...dataSheet,
			updatedAt: new Date(),
		});

		return NextResponse.json({
			success: true,
			dataSheet: updatedDataSheet,
		});
	} catch {
		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 }
		);
	}
}
