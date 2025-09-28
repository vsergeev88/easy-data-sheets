import type React from "react";
import type { IBareCheckboxFieldModel } from "@/app/stores/bareStores/fields/bareCheckboxFieldModel";

import { observer } from "mobx-react-lite";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import CustomField from "./CustomField";

type BaseCheckboxFieldProps = {
	field: IBareCheckboxFieldModel;
};

const BaseCheckboxField: React.FC<BaseCheckboxFieldProps> = ({ field }) => {
	if (field.multipleChoice) {
		return (
			<div className="flex w-full flex-col space-y-2 bg-white px-2 py-2">
				{field.items.map((item) => (
					<div
						className="flex w-full flex-row items-start space-x-3 space-y-0"
						key={item}
					>
						<Checkbox
							checked={field.value?.includes(item)}
							id={item}
							onCheckedChange={(checked) => {
								return checked
									? field.setValue([...field.value, item])
									: field.setValue(
											field.value?.filter((value: string) => value !== item)
										);
							}}
						/>
						<Label className="font-normal text-sm" htmlFor={item}>
							{item}
						</Label>
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
	}

	return (
		<RadioGroup
			className="flex w-full flex-col bg-white px-2 py-2"
			defaultValue={field.items[0]}
			onValueChange={(value) => {
				field.setValue([value]);
			}}
		>
			{field.items.map((item) => {
				return (
					<div className="flex items-center space-x-2" key={item}>
						<RadioGroupItem id={item} value={item} />
						<Label className="font-normal text-sm" htmlFor={item}>
							{item}
						</Label>
					</div>
				);
			})}
			{field.withCustomField && (
				<CustomField
					onAddOtherValue={(otherValue) => {
						field.addItem(otherValue);
						field.setValue([otherValue]);
					}}
				/>
			)}
		</RadioGroup>
	);
};
export default observer(BaseCheckboxField);
