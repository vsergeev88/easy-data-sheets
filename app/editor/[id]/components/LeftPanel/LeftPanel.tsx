import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { TextCursorInput, SquareCheckBig, Text, ChevronDown, PencilRuler, SquareDashed } from 'lucide-react'
import { addTextInput, useEditorStore } from '@/app/editor/stores/editorStore'
import { FIELD_TYPES } from '@/lib/types/form'

export default function LeftPanel() {
  const { addField, selectedFieldSetId, addEmptySection } = useEditorStore()

  const basicItems = [
    {
      id: 'text-input',
      title: 'Text input',
      icon: TextCursorInput,
      onClick: () => {
        addTextInput(selectedFieldSetId)
      },
    },
    {
      id: 'checkbox-radio',
      title: 'Checkbox / Radio',
      icon: SquareCheckBig,
      onClick: () => {
        const fieldId = crypto.randomUUID()
        addField(selectedFieldSetId, {
          id: fieldId,
          type: FIELD_TYPES.CHECKBOX,
          name: fieldId,
          label: 'Checkbox / Radio',
          description: 'Select one or more options',
          required: false,
          items: ['Option 1', 'Option 2', 'Option 3'],
          withCustomField: false,
        })
      },
    },
    {
      id: 'select',
      title: 'Dropdown / Select',
      icon: ChevronDown,
      onClick: () => {
        console.log('Select')
      },
      isSoon: true,
    },
    {
      id: 'drawing',
      title: 'Drawing',
      icon: PencilRuler,
      onClick: () => {
        console.log('Drawing')
      },
      isSoon: true,
    },
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
      id: 'section',
      title: 'New Section',
      icon: SquareDashed,
      onClick: () => {
        addEmptySection(selectedFieldSetId)
      },
    },
  ]

  return (
    <div className='p-2'>
      <Accordion type='multiple' defaultValue={['basic']}>
        <AccordionItem value='basic'>
          <AccordionTrigger className='text-sm font-bold uppercase'>
            Basic elements
          </AccordionTrigger>
          <AccordionContent>
            <ul className='ignore-deselect flex flex-col gap-2'>
              {basicItems.map(item => (
                <li className='w-full' key={item.id}>
                  <Button
                    variant='ghost'
                    size='sm'
                    className='w-full justify-start'
                    disabled={item.isSoon}
                    onClick={item.onClick}
                  >
                    <item.icon />
                    <span>{item.title} {item.isSoon && <span className='text-xs text-gray-500'>soon</span>}</span>
                  </Button>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='templates'>
          <AccordionTrigger className='text-sm font-bold uppercase'>
            Section Templates
          </AccordionTrigger>
          <AccordionContent>
            <ul className='flex flex-col gap-2'>
              <li className='w-full'>
                <Button variant='ghost' size='sm' className='w-full justify-start'>
                  Empty Section
                </Button>
              </li>
              <li className='w-full'>
                <Button variant='ghost' size='sm' className='w-full justify-start'>
                  Customer Contacts
                </Button>
              </li>

              <li className='w-full'>
                <Button variant='ghost' size='sm' className='w-full justify-start'>
                  Delivery Address
                </Button>
              </li>

              <li className='w-full'>
                <Button variant='ghost' size='sm' className='w-full justify-start'>
                  External Sizing
                </Button>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='colors'>
          <AccordionTrigger
            disabled
            className='pointer-events-none text-sm font-bold uppercase opacity-30'
          >
            Branding colors (soon)
          </AccordionTrigger>
          <AccordionContent></AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
