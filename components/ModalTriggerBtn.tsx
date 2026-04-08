'use client'

import { CSSProperties } from 'react'

interface Props {
  children: React.ReactNode
  style?: CSSProperties
  className?: string
}

export default function ModalTriggerBtn({ children, style, className }: Props) {
  return (
    <button
      className={className}
      style={{
        cursor: 'pointer',
        border: 'none',
        background: 'none',
        padding: 0,
        ...style,
      }}
      onClick={() => window.dispatchEvent(new CustomEvent('openModal'))}
    >
      {children}
    </button>
  )
}
