import Link from 'next/link'
import type { ReactNode } from 'react'

// Authored inline links and emphasis; never auto-link repeated keywords.
export default function InlineText({ text }: { text: string }) {
  const parts: ReactNode[] = []
  const pattern = /\[([^\]]+)\]\((https?:\/\/[^\s)]+|\/[^\s)]*)\)|\*\*([^*]+)\*\*/g
  let previous = 0
  for (const match of Array.from(text.matchAll(pattern))) {
    parts.push(text.slice(previous, match.index))
    if (match[3]) parts.push(<strong key={match.index}>{match[3]}</strong>)
    else if (match[2].startsWith('/')) parts.push(<Link key={match.index} href={match[2]} style={{ color: 'var(--amber)', textDecoration: 'underline' }}>{match[1]}</Link>)
    else parts.push(<a key={match.index} href={match[2]} style={{ color: 'var(--amber)', textDecoration: 'underline' }}>{match[1]}</a>)
    previous = match.index! + match[0].length
  }
  parts.push(text.slice(previous))
  return <>{parts}</>
}
