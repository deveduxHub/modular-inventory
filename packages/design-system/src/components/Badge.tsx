'use client'
import type { HTMLAttributes, ReactNode } from 'react'

export type BadgeTone = 'neutral' | 'brand' | 'success' | 'warning' | 'error'

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  children?: ReactNode
}

/**
 * Badge — chip pequeño con tono semántico.
 * tone: neutral | brand | success | warning | error
 */
export function Badge({
  tone = 'neutral',
  className = '',
  children,
  ...rest
}: BadgeProps): React.JSX.Element {
  const classes = ['badge', `badge-${tone}`, className].filter(Boolean).join(' ')
  return (
    <span className={classes} {...rest}>
      {children}
    </span>
  )
}
