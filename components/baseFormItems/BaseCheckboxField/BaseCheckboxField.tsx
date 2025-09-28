import type React from "react";
import type { IBareCheckboxFieldModel } from "@/app/stores/bareStores/fields/bareCheckboxFieldModel";

import { observer } from "mobx-react-lite";

import { Checkbox } from "@/components/ui/checkbox";

import CustomField from "./CustomField";

type BaseCheckboxFieldProps = {
	field: IBareCheckboxFieldModel;
};

const BaseCheckboxField: React.FC<BaseCheckboxFieldProps> = ({ field }) => {
	return (
		<div className="flex w-full flex-col space-y-2 bg-white px-2 py-2">
			{field.items.map((item) => (
				<div
					className="flex w-full flex-row items-start space-x-3 space-y-0"
					key={item}
				>
					<div>
						<Checkbox
							checked={field.value?.includes(item)}
							onCheckedChange={(checked) => {
								return checked
									? field.setValue([...field.value, item])
									: field.setValue(
											field.value?.filter((value: string) => value !== item)
										);
							}}
						/>
					</div>
					<div className="font-normal text-sm">{item}</div>
				</div>
			))}
			{field.withCustomField && (
				<CustomField
					onAddOtherValue={(otherValue) => {
						field.addItem(otherValue);
						field.setValue([...field.value, otherValue]);
					}}
				/>
			)}
		</div>
	);
};
export default observer(BaseCheckboxField);
