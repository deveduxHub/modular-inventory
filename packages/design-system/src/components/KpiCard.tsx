'use client'
import type { HTMLAttributes, ReactNode } from 'react'

export type KpiColor = 'inversion' | 'movimiento' | 'ganancia' | 'brand' | 'success' | 'error'

const COLOR_MAP: Record<KpiColor, string> = {
  inversion:   'var(--color-inversion)',
  movimiento:  'var(--color-movimiento)',
  ganancia:    'var(--color-ganancia)',
  brand:       'var(--color-brand-500)',
  success:     'var(--color-success-700)',
  error:       'var(--color-error-700)',
}

export interface KpiCardProps extends HTMLAttributes<HTMLDivElement> {
  label: ReactNode
  value: ReactNode
  color?: KpiColor
  delta?: { direction: 'up' | 'down'; label: ReactNode }
  hint?: ReactNode
}

/**
 * KpiCard — componente firma del producto.
 * Triángulo de valor: Inversión / Movimiento / Ganancia.
 * El color del border-top + value se controla con `color`.
 */
export function KpiCard({
  label,
  value,
  color = 'brand',
  delta,
  hint,
  className = '',
  ...rest
}: KpiCardProps): React.JSX.Element {
  const classes = ['kpi-card', className].filter(Boolean).join(' ')
  const style = { '--kpi-color': COLOR_MAP[color] } as React.CSSProperties
  return (
    <div className={classes} style={style} {...rest}>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">{value}</div>
      {delta !== undefined && (
        <div className={`kpi-delta ${delta.direction}`}>
          <span aria-hidden="true">{delta.direction === 'up' ? '↑' : '↓'}</span>
          <span>{delta.label}</span>
        </div>
      )}
      {hint !== undefined && (
        <div style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-sm)', color: 'var(--color-ink-500)' }}>
          {hint}
        </div>
      )}
    </div>
  )
}
