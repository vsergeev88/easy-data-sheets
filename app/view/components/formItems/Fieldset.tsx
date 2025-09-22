import { useViewAppStore } from "@viewAppStore";
import { observer } from "mobx-react-lite";
import type React from "react";
import { ClickOutside } from "@/components/ClickOutside";
import type { Field, FieldSet } from "@/lib/types/form";
import { cn } from "@/lib/utils";
import { VIEW_FIELD_COMPONENTS_MAP } from "./viewFieldComponentsMap";

type FieldsetProps = {
	fieldSet: FieldSet;
	className?: string;
};

const Fieldset: React.FC<FieldsetProps> = ({ fieldSet, className }) => {
	const { safeFormData } = useViewAppStore();
	const isSelected = safeFormData.selectedFieldSetId === fieldSet.id;

	return (
		<ClickOutside
			className="space-y-4"
			ignoreClass="ignore-deselect"
			onClickOutside={() => {
				safeFormData.setSelectedFieldSetId(null);
				safeFormData.setSelectedFieldId(null);
			}}
		>
			<div
				className={cn("border-2 border-transparent border-dashed", {
					"border-blue-500": isSelected,
					"hover:border-blue-500/50": !isSelected,
				})}
			>
				<fieldset
					className={cn(
						"relative border border-gray-300 bg-gray-300 p-4 px-1 py-1",
						className
					)}
				>
					<div className="my-1 flex min-h-10 flex-row items-center justify-between gap-4">
						<div className="max-w-prose">{fieldSet.legend ?? ""}</div>
					</div>
					<div className="">
						{fieldSet.fields.map((field) => {
							const FieldComponent = VIEW_FIELD_COMPONENTS_MAP[
								field.type
							] as React.FC<{
								field: Field;
							}>;
							return <FieldComponent field={field} key={field.id} />;
						})}
					</div>
				</fieldset>
			</div>
		</ClickOutside>
	);
};
export default observer(Fieldset);
