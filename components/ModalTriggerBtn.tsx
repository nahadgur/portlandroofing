import Link from 'next/link'
import { CSSProperties } from 'react'

interface Props {
  children: React.ReactNode
  style?: CSSProperties
  className?: string
}

export default function ModalTriggerBtn({ children, style, className }: Props) {
  return (
    <Link
      href="/contact"
      className={className}
      style={{
        cursor: 'pointer',
        textDecoration: 'none',
        ...style,
      }}
    >
      {children}
    </Link>
  )
}
