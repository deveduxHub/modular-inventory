// RouterAdapter contract — implementation lives in @surte/shell-runtime
export interface RouterAdapter {
  useCurrentPath(): string
  push(url: string): void | Promise<void>
  replace(url: string): void | Promise<void>
  prefetch?(url: string): void
}
