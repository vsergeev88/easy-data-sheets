'use client'

import { useCounterStore } from '../stores/counterStore'

export default function Editor() {
  const { count, increment, reset } = useCounterStore()

  return (
    <div className='flex min-h-screen flex-col items-center justify-center p-4'>
      <h1 className='mb-6 text-2xl font-bold'>Zustand Counter Example</h1>

      <div className='mb-8 text-6xl font-bold'>{count}</div>

      <div className='flex gap-4'>
        <button
          onClick={increment}
          className='rounded-md bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700'
        >
          Increment
        </button>

        <button
          onClick={reset}
          className='rounded-md bg-gray-600 px-6 py-3 text-white transition-colors hover:bg-gray-700'
        >
          Reset
        </button>
      </div>
    </div>
  )
}
