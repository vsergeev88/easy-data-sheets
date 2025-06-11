import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { TextCursorInput, SquareCheckBig, Text, ChevronDown, PencilRuler } from "lucide-react"




export default function LeftPanel() {
  const basicItems = [{
    id: "text-input",
    title: "Text input",
    icon: TextCursorInput,
    onClick: () => {
      console.log("Text input")
    }
  }, {
    id: "checkbox-radio",
    title: "Checkbox / Radio",
    icon: SquareCheckBig,
    onClick: () => {
      console.log("Checkbox / Radio")
    }
  }, {
    id: "select",
    title: "Dropdown / Select",
    icon: ChevronDown,
    onClick: () => {
      console.log("Select")
    },
    isSoon: true,
  }, {
    id: "drawing",
    title: "Drawing",
    icon: PencilRuler,
    onClick: () => {
      console.log("Drawing")
    },
    isSoon: true,
  }, {
    id: "text",
    title: "Text",
    icon: Text,
    onClick: () => {
      console.log("Text")
    },
    isSoon: true,
  }]

  return <div className="p-2">
    <Accordion type="multiple" defaultValue={["basic"]}>
      <AccordionItem value="basic">
        <AccordionTrigger className="text-sm uppercase font-bold">Basic elements</AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col gap-2 ignore-deselect">
            {basicItems.map((item) => (
              <li className="w-full" key={item.id}>
                <Button variant="ghost" size="sm" className="w-full justify-start" disabled={item.isSoon} onClick={item.onClick}>
                  <item.icon />
                  <span>{item.title}</span>
                </Button>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="templates">
        <AccordionTrigger className="text-sm uppercase font-bold">Section Templates</AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col gap-2">
            <li className="w-full">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Empty Section
              </Button>
            </li>
            <li className="w-full">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Customer Contacts
              </Button>
            </li>

            <li className="w-full">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Delivery Address
              </Button>
            </li>

            <li className="w-full">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                External Sizing
              </Button>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="colors">
        <AccordionTrigger disabled className="text-sm uppercase font-bold opacity-30 pointer-events-none">Branding colors (soon)</AccordionTrigger>
        <AccordionContent>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </div>
}