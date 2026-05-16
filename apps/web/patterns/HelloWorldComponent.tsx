import type { JSX } from 'react'

export function HelloWorldComponent(_props: object): JSX.Element {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-3xl font-bold">Hello World veamos</h1>
    </main>
  )
}
