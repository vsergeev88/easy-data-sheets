import { useState } from "react";

import { cn } from "@/lib/utils";

type EditableTextProps = {
	text: string;
	setText: (nextText: string) => void;
	className?: string;
	inputClassName?: string;
	lines?: number;
};

export const EditableText: React.FC<EditableTextProps> = ({
	text,
	setText,
	className,
	inputClassName,
	lines = 1,
}) => {
	const [isEdit, setIsEdit] = useState(false);

	if (!isEdit) {
		return (
			<button
				className={cn(
					"button-reset inline hover:cursor-text hover:underline",
					className
				)}
				onClick={() => setIsEdit(true)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						setIsEdit(false);
					}
				}}
				type="button"
			>
				{text}
			</button>
		);
	}

	if (lines > 1) {
		return (
			<textarea
				autoFocus
				className={cn("w-full", inputClassName)}
				onBlur={() => setIsEdit(false)}
				onChange={(e) => setText(e.target.value)}
				rows={lines}
				value={text}
			/>
		);
	}

	return (
		<input
			autoFocus
			className={cn("w-full", inputClassName)}
			onBlur={() => setIsEdit(false)}
			onChange={(e) => setText(e.target.value)}
			type="text"
			value={text}
		/>
	);
};
