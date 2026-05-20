'use client'
import type { HTMLAttributes, ReactNode } from 'react'

export type AlertTone = 'info' | 'success' | 'warning' | 'error'

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  tone?: AlertTone
  title?: ReactNode
  icon?: ReactNode
  children?: ReactNode
}

const defaultIcons: Record<AlertTone, string> = {
  info: 'ℹ',
  success: '✓',
  warning: '⚠',
  error: '✕',
}

/**
 * Alert — banner inline con tono semántico.
 */
export function Alert({
  tone = 'info',
  title,
  icon,
  className = '',
  children,
  ...rest
}: AlertProps): React.JSX.Element {
  const classes = ['alert', `alert-${tone}`, className].filter(Boolean).join(' ')
  return (
    <div role="status" className={classes} {...rest}>
      <span className="alert-icon" aria-hidden="true">
        {icon ?? defaultIcons[tone]}
      </span>
      <div className="alert-content">
        {title !== undefined && <div className="alert-title">{title}</div>}
        {children !== undefined && <div className="alert-message">{children}</div>}
      </div>
    </div>
  )
}
