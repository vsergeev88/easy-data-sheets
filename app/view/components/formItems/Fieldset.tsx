import type React from "react";
import type { IViewFieldModel } from "../../stores/viewAppStore/fieldModel";
import type { IViewFieldSetModel } from "../../stores/viewAppStore/fieldSetModel";

import { useViewAppStore } from "@viewAppStore";
import { observer } from "mobx-react-lite";

import { ClickOutside } from "@/components/ClickOutside";
import { cn } from "@/lib/utils";

import { VIEW_FIELD_COMPONENTS_MAP } from "./viewFieldComponentsMap";

type FieldsetProps = {
	fieldSet: IViewFieldSetModel;
	className?: string;
	index: number;
};

const Fieldset: React.FC<FieldsetProps> = ({ fieldSet, className }) => {
	const { safeFormData } = useViewAppStore();

	return (
		<ClickOutside
			className="space-y-4"
			ignoreClass="ignore-deselect"
			onClickOutside={() => {
				safeFormData.setSelectedFieldSetId(null);
				safeFormData.setSelectedFieldId(null);
			}}
		>
			<div className={cn("border-2 border-transparent border-dashed")}>
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
								field: IViewFieldModel;
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
