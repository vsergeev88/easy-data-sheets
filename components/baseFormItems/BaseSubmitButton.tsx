import { Button } from '@/components/ui/button'

export default function BaseSubmitButton() {
  return (
    <div className='flex justify-end'>
      <Button type='submit' size='lg'>Submit</Button>
    </div>
  )
}