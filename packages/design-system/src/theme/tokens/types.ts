/**
 * Token architecture:
 *   Global (primitives) → Semantic (purpose) → Component (element-level)
 *
 * Only semantic tokens are public API — global/component are internal.
 */

// ─── Global (primitives) — internal, NOT overridable via ThemeProvider ─────
export type ColorScale = '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | '950'

// ─── Semantic tokens — the public surface ───────────────────────────────────
export interface ColorTokens {
  // Brand
  'color-primary': string
  'color-primary-hover': string
  'color-primary-active': string
  'color-primary-subtle': string

  // Feedback
  'color-success': string
  'color-success-subtle': string
  'color-warning': string
  'color-warning-subtle': string
  'color-error': string
  'color-error-subtle': string
  'color-info': string
  'color-info-subtle': string

  // Surface / Background
  'color-bg-base': string
  'color-bg-subtle': string
  'color-bg-muted': string
  'color-bg-overlay': string

  // Text
  'color-text-primary': string
  'color-text-secondary': string
  'color-text-disabled': string
  'color-text-inverse': string
  'color-text-on-primary': string

  // Border
  'color-border-default': string
  'color-border-strong': string
  'color-border-focus': string
}

export interface SpacingTokens {
  'spacing-0': string
  'spacing-1': string  // 4px
  'spacing-2': string  // 8px
  'spacing-3': string  // 12px
  'spacing-4': string  // 16px
  'spacing-5': string  // 20px
  'spacing-6': string  // 24px
  'spacing-8': string  // 32px
  'spacing-10': string // 40px
  'spacing-12': string // 48px
  'spacing-16': string // 64px
}

export interface TypographyTokens {
  'font-family-sans': string
  'font-family-mono': string

  'font-size-xs': string   // 12px
  'font-size-sm': string   // 14px
  'font-size-base': string // 16px
  'font-size-lg': string   // 18px
  'font-size-xl': string   // 20px
  'font-size-2xl': string  // 24px
  'font-size-3xl': string  // 30px
  'font-size-4xl': string  // 36px

  'font-weight-normal': string   // 400
  'font-weight-medium': string   // 500
  'font-weight-semibold': string // 600
  'font-weight-bold': string     // 700

  'line-height-tight': string   // 1.25
  'line-height-snug': string    // 1.375
  'line-height-normal': string  // 1.5
  'line-height-relaxed': string // 1.625
}

export interface RadiusTokens {
  'radius-none': string // 0
  'radius-sm': string   // 2px
  'radius-md': string   // 6px
  'radius-lg': string   // 8px
  'radius-xl': string   // 12px
  'radius-2xl': string  // 16px
  'radius-full': string // 9999px
}

export interface ShadowTokens {
  'shadow-sm': string
  'shadow-md': string
  'shadow-lg': string
  'shadow-none': string
}

export interface ZIndexTokens {
  'z-base': string
  'z-dropdown': string
  'z-sticky': string
  'z-modal': string
  'z-toast': string
  'z-tooltip': string
}

/** Full public token set — all keys map to CSS custom property names (without --surte-) */
export type DesignTokens = ColorTokens &
  SpacingTokens &
  TypographyTokens &
  RadiusTokens &
  ShadowTokens &
  ZIndexTokens

/** Partial override — consumers only specify what they want to change */
export type ThemeOverrides = Partial<DesignTokens>

/** Theme mode: explicit light/dark or follow OS preference */
export type ThemeMode = 'light' | 'dark' | 'system'

/** Value exposed by ThemeContext */
export interface ThemeContextValue {
  /** Current mode prop as supplied to ThemeProvider */
  mode: ThemeMode
  /** Resolved effective mode after system detection */
  resolvedMode: 'light' | 'dark'
  /** Merged token set (base theme + overrides) — read-only snapshot */
  tokens: DesignTokens
  /** Pin to an explicit mode (or "system") */
  setMode: (mode: ThemeMode) => void
  /** Apply partial token overrides at runtime */
  setOverrides: (overrides: ThemeOverrides) => void
}
