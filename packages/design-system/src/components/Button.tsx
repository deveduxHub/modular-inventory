'use client'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  block?: boolean
  iconOnly?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
}

/**
 * Button — primitive del DS.
 * Usa las clases .btn / .btn-{variant} / .btn-{size} de
 * @surte/design-system/styles (fuente: construction-guide/design-system).
 */
export function Button({
  variant = 'primary',
  size = 'md',
  block = false,
  iconOnly = false,
  leadingIcon,
  trailingIcon,
  className = '',
  children,
  type = 'button',
  ...rest
}: ButtonProps): React.JSX.Element {
  const classes = [
    'btn',
    `btn-${variant}`,
    size === 'lg' && 'btn-lg',
    size === 'sm' && 'btn-sm',
    block && 'btn-block',
    iconOnly && 'btn-icon',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={classes} {...rest}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  )
}
