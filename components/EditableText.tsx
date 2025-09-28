import { useState } from "react";

import { cn } from "@/lib/utils";

type EditableTextProps = {
	text: string;
	className?: string;
	inputClassName?: string;
	lines?: number;
	onBlur?: (nextText: string) => void;
};

export const EditableText: React.FC<EditableTextProps> = ({
	text,
	onBlur,
	className,
	inputClassName,
	lines = 1,
}) => {
	const [isEdit, setIsEdit] = useState(false);
	const [localText, setLocalText] = useState(text);

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
				{localText}
			</button>
		);
	}

	const commonProps = {
		autoFocus: true,
		className: cn("w-full", inputClassName),
		onBlur: () => {
			setIsEdit(false);
			onBlur?.(localText);
		},
		onChange: (
			e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
		) => {
			setLocalText(e.target.value);
		},
		value: localText,
	};

	if (lines > 1) {
		return <textarea {...commonProps} rows={lines} />;
	}

	return <input {...commonProps} type="text" />;
};
