import { useEditorAppStore } from "@editorAppStore";
import {
	SquareCheckBig,
	SquareDashed,
	// Text,
	TextCursorInput,
} from "lucide-react";

import { FieldModel } from "@/app/editor/stores/editorAppStore/fieldModel";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CHOICE_TYPES, FIELD_TYPES } from "@/lib/types/form";

import {
	deliveryConditionsFieldset,
	emptyFieldset,
} from "../../constants/fieldsetTemplates";

export default function LeftPanel() {
	const { safeFormData } = useEditorAppStore();

	const basicItems = [
		{
			id: "text-input",
			title: "Text input",
			icon: TextCursorInput,
			onClick: () => {
				safeFormData.addTextInput(safeFormData.selectedFieldSetId);
			},
		},
		{
			id: "text-choice",
			title: "Choice (text)",
			icon: SquareCheckBig,
			onClick: () => {
				const fieldId = crypto.randomUUID();
				safeFormData.addField(
					safeFormData.selectedFieldSetId,
					FieldModel.create({
						id: fieldId,
						type: FIELD_TYPES.CHOICE,
						choiceType: CHOICE_TYPES.CHECKBOX,
						name: fieldId,
						label: "Choice (text)",
						description: "Select one or more options",
						required: false,
						items: ["Option 1", "Option 2", "Option 3"],
						withCustomField: false,
					})
				);
			},
		},
		// {
		// 	id: "select",
		// 	title: "Dropdown / Select",
		// 	icon: ChevronDown,
		// 	onClick: () => {
		// 		console.log("Select");
		// 	},
		// 	isSoon: true,
		// },
		// {
		// 	id: "drawing",
		// 	title: "Drawing",
		// 	icon: PencilRuler,
		// 	onClick: () => {
		// 		console.log("Drawing");
		// 	},
		// 	isSoon: true,
		// },
		// {
		//   id: 'text',
		//   title: 'Text',
		//   icon: Text,
		//   onClick: () => {
		//     console.log('Text')
		//   },
		//   isSoon: true,
		// },
		{
			id: "section",
			title: "New Section",
			icon: SquareDashed,
			onClick: () => {
				safeFormData.addEmptyFieldSet(safeFormData.selectedFieldSetId);
			},
		},
	];

	return (
		<div className="p-2">
			<Accordion defaultValue={["basic"]} type="multiple">
				<AccordionItem value="basic">
					<AccordionTrigger className="font-bold text-sm uppercase">
						Basic elements
					</AccordionTrigger>
					<AccordionContent>
						<ul className="ignore-deselect flex flex-col gap-2">
							{basicItems.map((item) => (
								<li className="w-full" key={item.id}>
									<Button
										className="w-full justify-start"
										onClick={item.onClick}
										size="sm"
										variant="ghost"
									>
										<item.icon />
										<span>{item.title}</span>
									</Button>
								</li>
							))}
						</ul>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="templates">
					<AccordionTrigger className="font-bold text-sm uppercase">
						Section Templates
					</AccordionTrigger>
					<AccordionContent>
						<ul className="flex flex-col gap-2">
							<li className="w-full">
								<Button
									className="w-full justify-start"
									onClick={() => {
										safeFormData.addFieldSet(
											emptyFieldset,
											safeFormData.selectedFieldSetId ?? ""
										);
									}}
									size="sm"
									variant="ghost"
								>
									Empty Section
								</Button>
							</li>
							<li className="w-full">
								<Button
									className="w-full justify-start"
									onClick={() => {
										safeFormData.addFieldSet(
											deliveryConditionsFieldset,
											safeFormData.selectedFieldSetId ?? ""
										);
									}}
									size="sm"
									variant="ghost"
								>
									Delivery Conditions
								</Button>
							</li>
						</ul>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="colors">
					<AccordionTrigger
						className="pointer-events-none font-bold text-sm uppercase opacity-30"
						disabled
					>
						Branding colors (soon)
					</AccordionTrigger>
					<AccordionContent />
				</AccordionItem>
			</Accordion>
		</div>
	);
}
