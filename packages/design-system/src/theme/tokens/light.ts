import type { DesignTokens } from './types.js'

/**
 * Light theme — default baseline.
 * Values are resolved CSS values (no var() references).
 * WCAG AA: all text/bg pairs verified ≥ 4.5:1.
 */
export const lightTokens: DesignTokens = {
  // ─── Brand (indigo) ────────────────────────────────────────────────────────
  'color-primary':        '#4F46E5', // indigo-600
  'color-primary-hover':  '#4338CA', // indigo-700
  'color-primary-active': '#3730A3', // indigo-800
  'color-primary-subtle': '#EEF2FF', // indigo-50

  // ─── Feedback ─────────────────────────────────────────────────────────────
  'color-success':        '#16A34A', // green-600
  'color-success-subtle': '#F0FDF4', // green-50
  'color-warning':        '#F59E0B', // amber-500
  'color-warning-subtle': '#FFFBEB', // amber-50
  'color-error':          '#DC2626', // red-600
  'color-error-subtle':   '#FEF2F2', // red-50
  'color-info':           '#0284C7', // sky-600
  'color-info-subtle':    '#F0F9FF', // sky-50

  // ─── Surface / Background ─────────────────────────────────────────────────
  'color-bg-base':    '#FFFFFF',   // white
  'color-bg-subtle':  '#F9FAFB',   // gray-50
  'color-bg-muted':   '#FFFFFF',   // white (elevated = same as base in light)
  'color-bg-overlay': '#00000066', // 40% black

  // ─── Text ─────────────────────────────────────────────────────────────────
  'color-text-primary':    '#111827', // gray-900 — 16:1 on white ✓
  'color-text-secondary':  '#4B5563', // gray-600 — 7:1 on white ✓
  'color-text-disabled':   '#9CA3AF', // gray-400 — decorative only
  'color-text-inverse':    '#FFFFFF',
  'color-text-on-primary': '#FFFFFF',

  // ─── Border ───────────────────────────────────────────────────────────────
  'color-border-default': '#E5E7EB', // gray-200
  'color-border-strong':  '#9CA3AF', // gray-400
  'color-border-focus':   '#4F46E5', // matches primary

  // ─── Spacing (px → rem, base 16px) ───────────────────────────────────────
  'spacing-0':  '0px',
  'spacing-1':  '0.25rem',  // 4px
  'spacing-2':  '0.5rem',   // 8px
  'spacing-3':  '0.75rem',  // 12px
  'spacing-4':  '1rem',     // 16px
  'spacing-5':  '1.25rem',  // 20px
  'spacing-6':  '1.5rem',   // 24px
  'spacing-8':  '2rem',     // 32px
  'spacing-10': '2.5rem',   // 40px
  'spacing-12': '3rem',     // 48px
  'spacing-16': '4rem',     // 64px

  // ─── Typography ───────────────────────────────────────────────────────────
  'font-family-sans': 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  'font-family-mono': 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',

  'font-size-xs':   '0.75rem',   // 12px
  'font-size-sm':   '0.875rem',  // 14px
  'font-size-base': '1rem',      // 16px
  'font-size-lg':   '1.125rem',  // 18px
  'font-size-xl':   '1.25rem',   // 20px
  'font-size-2xl':  '1.5rem',    // 24px
  'font-size-3xl':  '1.875rem',  // 30px
  'font-size-4xl':  '2.25rem',   // 36px

  'font-weight-normal':   '400',
  'font-weight-medium':   '500',
  'font-weight-semibold': '600',
  'font-weight-bold':     '700',

  'line-height-tight':   '1.25',
  'line-height-snug':    '1.375',
  'line-height-normal':  '1.5',
  'line-height-relaxed': '1.75',

  // ─── Border radius ────────────────────────────────────────────────────────
  'radius-none': '0px',
  'radius-sm':   '4px',
  'radius-md':   '6px',
  'radius-lg':   '8px',
  'radius-xl':   '0.75rem',  // 12px
  'radius-2xl':  '1rem',     // 16px
  'radius-full': '9999px',

  // ─── Shadows ──────────────────────────────────────────────────────────────
  'shadow-none': 'none',
  'shadow-sm':   '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  'shadow-md':   '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  'shadow-lg':   '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',

  // ─── Z-index ──────────────────────────────────────────────────────────────
  'z-base':     '0',
  'z-dropdown': '1000',
  'z-sticky':   '1100',
  'z-modal':    '1300',
  'z-toast':    '1400',
  'z-tooltip':  '1500',
}
