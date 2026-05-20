'use client'
import type { HTMLAttributes, ReactNode } from 'react'

export interface ListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  thumb?: ReactNode
  title: ReactNode
  meta?: ReactNode
  end?: ReactNode
}

/**
 * ListItem — fila de lista con thumb · body (title + meta) · end.
 * Útil para listas de productos, alertas, movimientos.
 */
export function ListItem({
  thumb,
  title,
  meta,
  end,
  className = '',
  onClick,
  ...rest
}: ListItemProps): React.JSX.Element {
  const classes = ['list-item', className].filter(Boolean).join(' ')
  return (
    <div
      className={classes}
      role={onClick !== undefined ? 'button' : undefined}
      tabIndex={onClick !== undefined ? 0 : undefined}
      onClick={onClick}
      {...rest}
    >
      {thumb !== undefined && <div className="list-item-thumb">{thumb}</div>}
      <div className="list-item-body">
        <div className="list-item-title">{title}</div>
        {meta !== undefined && <div className="list-item-meta">{meta}</div>}
      </div>
      {end !== undefined && <div className="list-item-end">{end}</div>}
    </div>
  )
}
