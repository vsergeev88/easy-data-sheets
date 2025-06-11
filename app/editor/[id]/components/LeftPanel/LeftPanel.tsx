import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"

export default function LeftPanel() {
  return <div className="p-2">
    <Accordion type="multiple" defaultValue={["basic"]}>
      <AccordionItem value="basic">
        <AccordionTrigger className="text-sm uppercase font-bold">Basic elements</AccordionTrigger>
        <AccordionContent>
          <ul className="flex flex-col gap-2 ignore-deselect">
            <li className="w-full">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Text input
              </Button>
            </li>
            <li className="w-full">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                Checkbox / Radio
              </Button>
            </li>
            <li className="w-full">
              <Button variant="ghost" disabled size="sm" className="w-full justify-start">
                Select (soon)
              </Button>
            </li>
            <li className="w-full">
              <Button variant="ghost" disabled size="sm" className="w-full justify-start">
                Drawing (soon)
              </Button>
            </li>
            <li className="w-full">
              <Button variant="ghost" disabled size="sm" className="w-full justify-start">
                Text (soon)
              </Button>
            </li>
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