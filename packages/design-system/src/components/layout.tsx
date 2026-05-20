'use client'
import type { HTMLAttributes, ReactNode } from 'react'

type Gap = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12

function gapVar(g: Gap | undefined): string | undefined {
  if (g === undefined) return undefined
  return `var(--space-${g})`
}

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: Gap
  as?: 'div' | 'section' | 'article' | 'aside' | 'header' | 'footer' | 'main'
  children?: ReactNode
}

/** Stack — column flex con gap basado en tokens (--space-N). */
export function Stack({
  gap = 4,
  as: As = 'div',
  className = '',
  style,
  children,
  ...rest
}: StackProps): React.JSX.Element {
  return (
    <As
      className={['stack', className].filter(Boolean).join(' ')}
      style={{ gap: gapVar(gap), ...style }}
      {...rest}
    >
      {children}
    </As>
  )
}

export interface RowProps extends HTMLAttributes<HTMLDivElement> {
  gap?: Gap
  align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around'
  wrap?: boolean
  children?: ReactNode
}

const ALIGN_MAP = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  baseline: 'baseline',
  stretch: 'stretch',
} as const

const JUSTIFY_MAP = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around',
} as const

/** Row — flex horizontal con gap, align, justify, wrap. */
export function Row({
  gap = 4,
  align = 'center',
  justify = 'start',
  wrap = false,
  className = '',
  style,
  children,
  ...rest
}: RowProps): React.JSX.Element {
  return (
    <div
      className={['row', className].filter(Boolean).join(' ')}
      style={{
        gap: gapVar(gap),
        alignItems: ALIGN_MAP[align],
        justifyContent: JUSTIFY_MAP[justify],
        flexWrap: wrap ? 'wrap' : undefined,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}

/** Spacer — flex:1, ocupa espacio sobrante. */
export function Spacer(): React.JSX.Element {
  return <div className="spacer" />
}

/** Divider — separador horizontal de 1px. */
export function Divider(props: HTMLAttributes<HTMLHRElement>): React.JSX.Element {
  return <hr className="divider" {...props} />
}
