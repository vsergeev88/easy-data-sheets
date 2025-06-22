import { observer } from "mobx-react-lite";
import type React from "react";
import type { ICheckboxFieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import { Checkbox } from "@/components/ui/checkbox";
import CustomField from "./CustomField";

type BaseCheckboxFieldProps = {
	field: ICheckboxFieldModel;
};

const BaseCheckboxField: React.FC<BaseCheckboxFieldProps> = ({
	field
}) => {
	return (
		<div className="flex w-full flex-col space-y-2 bg-white px-2 py-2">
			{field.items.map((item) => (
				<div
					key={item}
					className="flex w-full flex-row items-start space-y-0 space-x-3"
				>
					<div>
						<Checkbox
							checked={field.value?.includes(item)}
							onCheckedChange={(checked) => {
								return checked
									? field.setValue([...field.value, item])
									: field.setValue(
										field.value?.filter(
											(value: string) => value !== item,
										),
									);
							}}
						/>
					</div>
					<div className="text-sm font-normal">{item}</div>
				</div>
			))}
			{field.withCustomField && (
				<CustomField
					onAddOtherValue={() => {
						field.setValue([...field.value, ""]);
					}}
				/>
			)}
		</div>
	);
};
export default observer(BaseCheckboxField);
