"use client";

import { PlusIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function CustomField({
	onAddOtherValue,
}: {
	onAddOtherValue?: (otherValue: string) => void;
}) {
	const [otherValue, setOtherValue] = useState("");

	return (
		<div className="flex w-full flex-row items-center space-x-2">
			<div className="flex w-full items-center space-x-2">
				<Input
					className="max-w-lg"
					onChange={(e) => setOtherValue(e.target.value)}
					placeholder="Other"
					type="text"
					value={otherValue}
				/>
				<Button
					disabled={!otherValue}
					onClick={() => {
						onAddOtherValue?.(otherValue);
						setOtherValue("");
					}}
					type="button"
					variant="outline"
				>
					<PlusIcon /> Add
				</Button>
			</div>
		</div>
	);
}
