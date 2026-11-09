import type { ReactNode } from 'react'

type Variant = 'primary' | 'inverse' | 'outline' | 'text'

interface ActionLinkProps {
  /** When missing, the control renders as an unavailable (disabled) state. */
  href?: string
  variant?: Variant
  /** Opens in a new tab. */
  external?: boolean
  children: ReactNode
}

export function ActionLink({
  href,
  variant = 'primary',
  external = false,
  children,
}: ActionLinkProps) {
  const base = variant === 'text' ? 'text-link' : `btn btn--${variant}`

  if (!href) {
    return (
      <span className={`${base} is-disabled`} role="link" aria-disabled="true">
        {children}
      </span>
    )
  }

  return (
    <a
      className={base}
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {children}
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}
