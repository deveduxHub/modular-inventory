'use client'
import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean
}

/**
 * Input — primitive textbox. Para wrapping con label / help, usar <Field>.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { invalid = false, className = '', ...rest },
  ref,
) {
  const classes = ['input', invalid && 'input-error', className].filter(Boolean).join(' ')
  return <input ref={ref} className={classes} aria-invalid={invalid || undefined} {...rest} />
})

export interface FieldProps {
  label?: ReactNode
  hint?: ReactNode
  error?: ReactNode
  htmlFor?: string
  children: ReactNode
  className?: string
}

/**
 * Field — wrapper de input con label, hint y error.
 * Patrón: <Field label="SKU" hint="Único en el sistema"><Input /></Field>
 */
export function Field({
  label,
  hint,
  error,
  htmlFor,
  children,
  className = '',
}: FieldProps): React.JSX.Element {
  const classes = ['input-group', className].filter(Boolean).join(' ')
  return (
    <div className={classes}>
      {label !== undefined && (
        <label className="input-label" htmlFor={htmlFor}>
          {label}
        </label>
      )}
      {children}
      {error !== undefined ? (
        <span className="input-help error">{error}</span>
      ) : hint !== undefined ? (
        <span className="input-help">{hint}</span>
      ) : null}
    </div>
  )
}
