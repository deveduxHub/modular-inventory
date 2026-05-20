'use client'
import type { ReactNode } from 'react'

export interface DataTableColumn<Row> {
  key: keyof Row & string
  header: ReactNode
  align?: 'left' | 'right' | 'center'
  numeric?: boolean
  render?: (row: Row) => ReactNode
  width?: string | number
}

export interface DataTableProps<Row> {
  columns: ReadonlyArray<DataTableColumn<Row>>
  rows: ReadonlyArray<Row>
  rowKey: (row: Row, index: number) => string | number
  onRowClick?: (row: Row) => void
  empty?: ReactNode
  className?: string
}

/**
 * DataTable — tabla con header sticky-able, numeric right-align, hover row.
 */
export function DataTable<Row>({
  columns,
  rows,
  rowKey,
  onRowClick,
  empty,
  className = '',
}: DataTableProps<Row>): React.JSX.Element {
  if (rows.length === 0 && empty !== undefined) {
    return <>{empty}</>
  }

  return (
    <table className={['data-table', className].filter(Boolean).join(' ')}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th
              key={col.key}
              style={{
                textAlign: col.numeric ? 'right' : col.align ?? 'left',
                width: col.width,
              }}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr
            key={rowKey(row, i)}
            onClick={onRowClick !== undefined ? () => onRowClick(row) : undefined}
            style={onRowClick !== undefined ? { cursor: 'pointer' } : undefined}
          >
            {columns.map((col) => {
              const value = col.render !== undefined ? col.render(row) : (row[col.key] as ReactNode)
              return (
                <td
                  key={col.key}
                  className={col.numeric ? 'num' : undefined}
                  style={{ textAlign: col.numeric ? 'right' : col.align }}
                >
                  {value}
                </td>
              )
            })}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
