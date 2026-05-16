'use client'
import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import { lightTokens } from './tokens/light.js'
import { darkTokens } from './tokens/dark.js'
import type { DesignTokens, ThemeMode, ThemeOverrides } from './tokens/types.js'
import { ThemeContext } from './ThemeContext.js'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getSystemPreference(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function resolveMode(mode: ThemeMode): 'light' | 'dark' {
  return mode === 'system' ? getSystemPreference() : mode
}

function applyTokens(tokens: DesignTokens, overrides: ThemeOverrides): void {
  const el = document.documentElement
  const merged: DesignTokens = { ...tokens, ...overrides }
  for (const [key, value] of Object.entries(merged) as [keyof DesignTokens, string][]) {
    el.style.setProperty(`--surte-${key}`, value)
  }
}

// ─── Props ────────────────────────────────────────────────────────────────────

export interface ThemeProviderProps {
  /**
   * "light" | "dark" | "system" (follows OS preference).
   * @default "system"
   */
  theme?: ThemeMode
  /** Partial token overrides applied on top of the resolved base theme. */
  overrides?: ThemeOverrides
  children: ReactNode
}

// ─── Component ────────────────────────────────────────────────────────────────

export function ThemeProvider({
  theme: themeProp = 'system',
  overrides: overridesProp,
  children,
}: ThemeProviderProps): React.JSX.Element {
  // SSR-safe: use light tokens as fallback; resolveMode guards window access
  const [mode, setModeState] = useState<ThemeMode>(themeProp)
  const [resolvedMode, setResolvedMode] = useState<'light' | 'dark'>(() =>
    resolveMode(themeProp),
  )
  const [overrides, setOverridesState] = useState<ThemeOverrides>(
    overridesProp ?? {},
  )

  // Sync mode when themeProp changes (controlled)
  useEffect(() => {
    setModeState(themeProp)
    setResolvedMode(resolveMode(themeProp))
  }, [themeProp])

  // Listen for OS preference changes when mode === "system"
  useEffect(() => {
    if (mode !== 'system') return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent): void => {
      setResolvedMode(e.matches ? 'dark' : 'light')
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [mode])

  // Sync overridesProp → state (controlled pattern)
  useEffect(() => {
    if (overridesProp !== undefined) {
      setOverridesState(overridesProp)
    }
  }, [overridesProp])

  // Apply CSS custom properties to <html>
  useEffect(() => {
    const base: DesignTokens = resolvedMode === 'dark' ? darkTokens : lightTokens
    applyTokens(base, overrides)
  }, [resolvedMode, overrides])

  // Toggle data-theme attribute on <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', resolvedMode)
  }, [resolvedMode])

  // Toggle .dark class on <html> for Tailwind dark: variant
  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedMode === 'dark')
  }, [resolvedMode])

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next)
    setResolvedMode(resolveMode(next))
  }, [])

  const setOverrides = useCallback((next: ThemeOverrides) => {
    setOverridesState((prev) => ({ ...prev, ...next }))
  }, [])

  const tokens = useMemo<DesignTokens>(() => {
    const base: DesignTokens = resolvedMode === 'dark' ? darkTokens : lightTokens
    return { ...base, ...overrides }
  }, [resolvedMode, overrides])

  const contextValue = useMemo(
    () => ({ mode, resolvedMode, tokens, setMode, setOverrides }),
    [mode, resolvedMode, tokens, setMode, setOverrides],
  )

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}
