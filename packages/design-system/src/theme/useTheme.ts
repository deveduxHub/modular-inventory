'use client'
import { use } from 'react'
import { ThemeContext } from './ThemeContext.js'

export function useTheme() {
  const ctx = use(ThemeContext)
  if (!ctx) throw new Error('[useTheme] must be used inside <ThemeProvider>')
  return ctx
}
