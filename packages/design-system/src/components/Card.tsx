'use client'
import type { HTMLAttributes, ReactNode } from 'react'

export type CardVariant = 'default' | 'flat' | 'lifted' | 'hero'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant
  children?: ReactNode
}

/**
 * Card — contenedor base del DS.
 * variant: default | flat | lifted | hero
 */
export function Card({
  variant = 'default',
  className = '',
  children,
  ...rest
}: CardProps): React.JSX.Element {
  const classes = [
    'card',
    variant === 'flat' && 'card-flat',
    variant === 'lifted' && 'card-lifted',
    variant === 'hero' && 'card-hero',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  )
}
