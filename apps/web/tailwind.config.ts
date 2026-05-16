import type { Config } from 'tailwindcss'
import { surtePreset } from '@surte/design-system/tailwind'

const config: Config = {
  presets: [surtePreset],
  content: [
    './app/**/*.{ts,tsx}',
    '../../packages/design-system/src/**/*.{ts,tsx}',
    '../../packages/core/src/**/*.{ts,tsx}',
    '../../packages/shell-runtime/src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

export default config
