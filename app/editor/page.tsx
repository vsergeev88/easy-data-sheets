'use client'

import { useCounterStore } from '../store/counterStore'

export default function Editor() {
  const { count, increment, reset } = useCounterStore()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-6">Zustand Counter Example</h1>

      <div className="text-6xl font-bold mb-8">{count}</div>

      <div className="flex gap-4">
        <button
          onClick={increment}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Increment
        </button>

        <button
          onClick={reset}
          className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  )
}