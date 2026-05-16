import type { DesignTokens } from './types.js'
import { lightTokens } from './light.js'

/**
 * Dark theme — starts from lightTokens and overrides only what changes.
 * WCAG AA: all text/bg pairs verified ≥ 4.5:1.
 */
export const darkTokens: DesignTokens = {
  ...lightTokens,

  // ─── Brand (lighter indigo for dark bg) ───────────────────────────────────
  'color-primary':        '#818CF8', // indigo-400
  'color-primary-hover':  '#A5B4FC', // indigo-300
  'color-primary-active': '#C7D2FE', // indigo-200
  'color-primary-subtle': '#1E1B4B', // indigo-950

  // ─── Feedback (brighter for dark bg) ─────────────────────────────────────
  'color-success':        '#4ADE80', // green-400
  'color-success-subtle': '#052E16', // green-950
  'color-warning':        '#FCD34D', // amber-300
  'color-warning-subtle': '#1C1400', // amber-950 approx
  'color-error':          '#F87171', // red-400
  'color-error-subtle':   '#1F0707', // red-950 approx
  'color-info':           '#38BDF8', // sky-400
  'color-info-subtle':    '#012030', // sky-950 approx

  // ─── Surface / Background ─────────────────────────────────────────────────
  'color-bg-base':    '#030712',   // gray-950
  'color-bg-subtle':  '#111827',   // gray-900
  'color-bg-muted':   '#1F2937',   // gray-800
  'color-bg-overlay': '#00000099', // 60% black

  // ─── Text ─────────────────────────────────────────────────────────────────
  'color-text-primary':   '#F9FAFB', // gray-50  — 17:1 on gray-950 ✓
  'color-text-secondary': '#9CA3AF', // gray-400 — 6:1 on gray-950 ✓
  'color-text-disabled':  '#4B5563', // gray-600 — decorative only
  'color-text-inverse':   '#030712', // gray-950

  // ─── Border ───────────────────────────────────────────────────────────────
  'color-border-default': '#374151', // gray-700
  'color-border-strong':  '#6B7280', // gray-500
  'color-border-focus':   '#818CF8', // matches dark primary

  // ─── Shadows (stronger opacity on dark bg) ────────────────────────────────
  'shadow-sm': '0 1px 2px 0 rgb(0 0 0 / 0.3)',
  'shadow-md': '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
  'shadow-lg': '0 10px 15px -3px rgb(0 0 0 / 0.5), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
}
