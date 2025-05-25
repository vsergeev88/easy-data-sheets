import React, { useState } from 'react'
import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { FieldSet } from '@/lib/types/form';

export type BaseFieldsetProps = {
  children: React.ReactNode
  fieldSet: FieldSet
  className?: string
  onLegendClick?: () => void
  index: number
}
const BaseFieldset: React.FC<BaseFieldsetProps> = ({ children, fieldSet, className, onLegendClick, index }) => {
  const [isOpen, setIsOpen] = useState(true);
  return <fieldset className={cn("border border-gray-300 py-1 px-1 bg-gray-300 relative p-4 pb-0", className)}>
    {
      fieldSet.legend && <div
        className="text-lg font-medium mb-4 flex items-center justify-between gap-2 w-full"
        onClick={() => onLegendClick?.()}>
        {`${index + 1}. ${fieldSet.legend}`}
        {isOpen ? <ChevronDown /> : <ChevronRight />}
      </div>
    }
    {isOpen && children}
    <Button variant="link" type="button" size="sm" onClick={() => setIsOpen(!isOpen)} className="mt-1">
      <span className="flex items-center gap-1 text-xs text-gray-500">
        {isOpen ? 'Collapse' : 'Expand'}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </span>
    </Button >
  </fieldset >;
};
export default BaseFieldset