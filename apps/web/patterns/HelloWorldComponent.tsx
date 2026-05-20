import type { JSX } from 'react'

export function HelloWorldComponent(_props: object): JSX.Element {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-6)',
        padding: 'var(--space-6)',
        background: 'var(--color-ink-25)',
      }}
    >
      <span className="badge badge-brand">step.hello · /</span>
      <h1
        className="t-display-3xl"
        style={{ margin: 0, textAlign: 'center', maxWidth: 720 }}
      >
        Hello World veamos
      </h1>
      <p
        className="t-body"
        style={{
          margin: 0,
          color: 'var(--color-ink-600)',
          maxWidth: 520,
          textAlign: 'center',
        }}
      >
        Esta pantalla se renderiza a través del sistema Step → View → Pattern.
        Los tokens vienen del paquete <code className="t-mono" style={{ fontSize: 13 }}>@surte/design-system</code>.
      </p>
      <a href="/design-system" className="btn btn-primary">
        Ver el Design System →
      </a>
    </main>
  )
}
