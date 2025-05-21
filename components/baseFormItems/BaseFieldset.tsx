import React, { useState } from 'react'
import { cn } from '@/lib/utils';
import { ChevronUp } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type BaseFieldsetProps = {
  children: React.ReactNode
  legend?: string
  className?: string
  onLegendClick?: () => void
}
const BaseFieldset: React.FC<BaseFieldsetProps> = ({ children, legend, className, onLegendClick }) => {
  const [isOpen, setIsOpen] = useState(true);
  return <fieldset className={cn("border border-gray-300 py-1 px-1 bg-gray-300 md:mb-4 mb-6 relative", className)}>
    {
      legend && <legend
        className="text-lg font-medium bg-white px-2 py-1 border-gray-400 border border-b-4 border-r-4 flex items-center gap-2"
        onClick={() => onLegendClick?.()}>
        {legend}
        {isOpen ? <ChevronDown /> : <ChevronRight />}
      </legend>
    }
    {/* {children} */}
    {isOpen && children}
    <Button variant="ghost" type="button" onClick={() => setIsOpen(!isOpen)}>
      <span className="flex items-center gap-1 text-xs text-gray-500">
        {isOpen ? 'Collapse' : 'Expand'}
        {isOpen ? <ChevronUp /> : <ChevronDown />}
      </span>
    </Button >
  </fieldset >;
};
export default BaseFieldset