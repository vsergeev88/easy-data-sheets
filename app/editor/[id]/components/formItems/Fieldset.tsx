import React from 'react'
import { useEditorStore } from '@/app/editor/stores/editorStore';
import { FieldSet } from '@/lib/types/form';
import { cn } from '@/lib/utils';
import { ClickOutside } from '@/components/ClickOutside';
import AddFieldsetButton from '../AddFieldsetButton';
import LegendEditable from './LegendEditable';

type FieldsetProps = {
  children: React.ReactNode
  fieldSet: FieldSet
  className?: string
  index: number
}

const Fieldset: React.FC<FieldsetProps> = ({ children, fieldSet, className, index }) => {
  const { selectedFieldSetId, setSelectedFieldSetId, setLegend } = useEditorStore()
  const isSelected = selectedFieldSetId === fieldSet.id

  return <ClickOutside onClickOutside={() => setSelectedFieldSetId(null)} ignoreClass="ignore-deselect">
    <div onClick={() => setSelectedFieldSetId(fieldSet.id)} className={cn("border-2 border-dashed border-transparent", {
      "border-blue-500": isSelected,
      "hover:border-blue-500/50": !isSelected
    })}>
      <fieldset
        className={cn("border border-gray-300 py-1 px-1 bg-gray-300 relative p-4", className)}
      >
        <LegendEditable legend={fieldSet.legend ?? ''} index={index} setLegend={(legend) => setLegend(fieldSet.id, legend)} />
        {children}
      </fieldset>
    </div>
    {isSelected && <AddFieldsetButton fieldSetId={fieldSet.id} />}
  </ClickOutside>
};
export default Fieldset