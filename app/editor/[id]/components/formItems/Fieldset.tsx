import React from 'react'
import BaseFieldset from '@/components/baseFormItems/BaseFieldset';
import { useEditorStore } from '@/app/editor/stores/editorStore';
import { FieldSet } from '@/lib/types/form';
import { cn } from '@/lib/utils';
import { ClickOutside } from '@/components/ClickOutside';
import { Button } from '@/components/ui/button';
import AddFieldsetButton from '../AddFieldsetButton';

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
      <BaseFieldset fieldSet={fieldSet} className={className} index={index}>
        {children}
      </BaseFieldset>
    </div>
    {isSelected && <AddFieldsetButton fieldSetId={fieldSet.id} />}
  </ClickOutside>
};
export default Fieldset