'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

export default function CustomField({
  onAddOtherValue,
}: {
  onAddOtherValue?: (otherValue: string) => void
}) {
  const [otherValue, setOtherValue] = useState('')

  return (
    <div className='flex w-full flex-row items-center space-x-2'>
      <div className='flex w-full items-center space-x-2'>
        <Input
          type='text'
          placeholder='Other'
          value={otherValue}
          className='max-w-lg'
          onChange={e => setOtherValue(e.target.value)}
        />
        <Button
          variant='outline'
          type='button'
          disabled={!otherValue}
          onClick={() => {
            onAddOtherValue?.(otherValue)
            setOtherValue('')
          }}
        >
          <PlusIcon /> Add
        </Button>
      </div>
    </div>
  )
}
