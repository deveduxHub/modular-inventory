'use client'
import { createContext } from 'react'
import type { ThemeContextValue } from './tokens/types.js'

export const ThemeContext = createContext<ThemeContextValue | null>(null)
ThemeContext.displayName = 'Surte.ThemeContext'
