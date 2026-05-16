import type { Metadata } from 'next'
import { AppProviders } from './_providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'Surte Inventory',
  description: 'B2B inventory management',
}

export default function RootLayout({
  children: _children,
}: Readonly<{ children: React.ReactNode }>): React.JSX.Element {
  return (
    <html lang="es-PE" suppressHydrationWarning>
      <body>
        <AppProviders />
      </body>
    </html>
  )
}
