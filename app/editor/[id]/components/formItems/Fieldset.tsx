import React from 'react'
import BaseFieldset from '@/components/baseFormItems/BaseFieldset';
import { useEditorStore } from '@/app/editor/stores/editorStore';
import { FieldSet } from '@/lib/types/form';
import { cn } from '@/lib/utils';
import { ClickOutside } from '@/components/ClickOutside';
import AddFieldsetButton from '../AddFieldsetButton';
import BaseFieldsetLegend from '@/components/baseFormItems/BaseFieldsetLegend';

type FieldsetProps = {
  children: React.ReactNode
  fieldSet: FieldSet
  className?: string
  index: number
}

const Fieldset: React.FC<FieldsetProps> = ({ children, fieldSet, className, index }) => {
  const { selectedFieldSetId, setSelectedFieldSetId } = useEditorStore()
  const isSelected = selectedFieldSetId === fieldSet.id

  return <ClickOutside onClickOutside={() => setSelectedFieldSetId(null)}>
    <div onClick={() => setSelectedFieldSetId(fieldSet.id)} className={cn("border-2 border-dashed border-transparent", {
      "border-blue-500": isSelected,
      "hover:border-blue-500/50": !isSelected
    })}>
      <fieldset
        className={cn("border border-gray-300 py-1 px-1 bg-gray-300 relative p-4", className)}
      >
        <BaseFieldsetLegend legend={fieldSet.legend ?? ''} index={index} />
        {children}
      </fieldset>
    </div>
    {isSelected && <AddFieldsetButton fieldSetId={fieldSet.id} />}
  </ClickOutside>
};
export default Fieldset