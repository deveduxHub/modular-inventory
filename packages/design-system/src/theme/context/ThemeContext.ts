'use client'
// Re-export from canonical location for backward compatibility
export { ThemeContext } from '../ThemeContext.js'
export type { ThemeContextValue, ThemeMode } from '../tokens/types.js'

// Legacy alias shape — kept for any internal consumers
export interface ResolvedTheme {
  mode: 'light' | 'dark'
  tokens: import('../tokens/types.js').DesignTokens
}
