'use client'
import { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import type { RouterAdapter } from '@surte/core'

export function useNextjsAdapter(): RouterAdapter {
  const pathname = usePathname()
  const router = useRouter()

  return useMemo(
    (): RouterAdapter => ({
      useCurrentPath: () => pathname,
      push: (url) => router.push(url),
      replace: (url) => router.replace(url),
      prefetch: (url) => router.prefetch(url),
    }),
    [pathname, router],
  )
}
