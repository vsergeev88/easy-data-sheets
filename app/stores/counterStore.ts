import { create } from 'zustand'

type CounterState = {
  count: number
  increment: () => void
  reset: () => void
}

// deprecated
export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 })
}))