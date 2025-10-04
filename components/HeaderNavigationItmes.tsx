"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export const HeaderNavigationItems = () => {
	const pathname = usePathname();
	return (
		<>
			<Link
				className={cn(
					"text-sm",
					pathname === "/dashboard/responses" &&
						"font-bold underline underline-offset-8"
				)}
				href="/dashboard/responses"
			>
				Responses
			</Link>
			<Link
				className={cn(
					"text-sm",
					pathname === "/dashboard/datasheets" &&
						"font-bold underline underline-offset-8"
				)}
				href="/dashboard/datasheets"
				prefetch={true}
			>
				My data sheets
			</Link>
		</>
	);
};
