'use client'
import { useParams } from 'next/navigation'

export default function Editor() {
  const { id } = useParams()
  return <div>View {id}</div>
}
