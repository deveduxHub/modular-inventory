import type { Config } from 'tailwindcss'

export const surtePreset: Config = {
  content: [],
  theme: {
    extend: {
      colors: {
        surte: {
          primary:          'var(--surte-color-primary)',
          'primary-hover':  'var(--surte-color-primary-hover)',
          'bg-base':        'var(--surte-color-bg-base)',
          'bg-surface':     'var(--surte-color-bg-subtle)',
          'bg-elevated':    'var(--surte-color-bg-muted)',
          'text-primary':   'var(--surte-color-text-primary)',
          'text-secondary': 'var(--surte-color-text-secondary)',
          'text-disabled':  'var(--surte-color-text-disabled)',
          border:           'var(--surte-color-border-default)',
          'border-strong':  'var(--surte-color-border-strong)',
          danger:           'var(--surte-color-error)',
          success:          'var(--surte-color-success)',
          warning:          'var(--surte-color-warning)',
        },
      },
      borderRadius: {
        'surte-sm': 'var(--surte-radius-sm)',
        'surte-md': 'var(--surte-radius-md)',
        'surte-lg': 'var(--surte-radius-lg)',
      },
      boxShadow: {
        'surte-sm': 'var(--surte-shadow-sm)',
        'surte-md': 'var(--surte-shadow-md)',
      },
      fontFamily: {
        surte:      ['var(--surte-font-family-sans)', 'system-ui', 'sans-serif'],
        'surte-mono': ['var(--surte-font-family-mono)', 'monospace'],
      },
      fontSize: {
        'surte-xs':   ['var(--surte-font-size-xs)',   { lineHeight: 'var(--surte-line-height-normal)' }],
        'surte-sm':   ['var(--surte-font-size-sm)',   { lineHeight: 'var(--surte-line-height-normal)' }],
        'surte-base': ['var(--surte-font-size-base)', { lineHeight: 'var(--surte-line-height-normal)' }],
        'surte-lg':   ['var(--surte-font-size-lg)',   { lineHeight: 'var(--surte-line-height-tight)' }],
        'surte-xl':   ['var(--surte-font-size-xl)',   { lineHeight: 'var(--surte-line-height-tight)' }],
        'surte-2xl':  ['var(--surte-font-size-2xl)',  { lineHeight: 'var(--surte-line-height-tight)' }],
        'surte-3xl':  ['var(--surte-font-size-3xl)',  { lineHeight: 'var(--surte-line-height-tight)' }],
      },
    },
  },
  plugins: [],
}

export default surtePreset
