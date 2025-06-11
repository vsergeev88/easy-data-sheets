import React from 'react'
import BaseFieldset from '@/components/baseFormItems/BaseFieldset'

type FieldsetProps = {
  children: React.ReactNode
  legend?: string
  className?: string
}

const Fieldset: React.FC<FieldsetProps> = ({ children, legend, className }) => {
  return (
    <BaseFieldset legend={legend} className={className}>
      {children}
    </BaseFieldset>
  )
}
export default Fieldset
