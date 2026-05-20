'use client'
import type { JSX } from 'react'
import {
  Alert,
  Badge,
  Button,
  Card,
  DataTable,
  Divider,
  Field,
  Input,
  KpiCard,
  ListItem,
  Row,
  Spacer,
  Stack,
} from '@surte/design-system'

// ─── Seed data (productos peruanos reales) ──────────────────────────────
type Movimiento = {
  sku: string
  nombre: string
  vendido: number
  ganancia: number
  stock: number
}
const MOVIMIENTOS: ReadonlyArray<Movimiento> = [
  { sku: 'ARZ-COS-50', nombre: 'Arroz Costeño 50kg',     vendido: 18, ganancia: 540, stock:  6 },
  { sku: 'ACE-PRI-1L', nombre: 'Aceite Primor 1L',        vendido: 42, ganancia: 336, stock: 22 },
  { sku: 'AZU-CAS-5K', nombre: 'Azúcar Castillo 5kg',     vendido: 12, ganancia: 180, stock:  3 },
  { sku: 'LEC-GLO-1L', nombre: 'Leche Gloria 1L',         vendido: 64, ganancia: 320, stock: 41 },
  { sku: 'ATU-FLO-CN', nombre: 'Atún Florida lata',       vendido: 89, ganancia: 712, stock: 12 },
]

// ─── Section helper ─────────────────────────────────────────────────────
function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  readonly id: string
  readonly eyebrow: string
  readonly title: string
  readonly description?: string
  readonly children: React.ReactNode
}): JSX.Element {
  return (
    <section id={id} className="stack" style={{ gap: 'var(--space-6)' }}>
      <header className="stack" style={{ gap: 'var(--space-2)' }}>
        <span className="t-overline" style={{ color: 'var(--color-brand-700)' }}>
          {eyebrow}
        </span>
        <h2 className="t-h1" style={{ margin: 0 }}>{title}</h2>
        {description !== undefined && (
          <p className="t-body" style={{ margin: 0, color: 'var(--color-ink-600)', maxWidth: 640 }}>
            {description}
          </p>
        )}
      </header>
      <div>{children}</div>
    </section>
  )
}

// ─── Color swatch ───────────────────────────────────────────────────────
function Swatch({
  name,
  value,
  varName,
  textOnSwatch = 'auto',
}: {
  readonly name: string
  readonly value: string
  readonly varName: string
  readonly textOnSwatch?: 'light' | 'dark' | 'auto'
}): JSX.Element {
  const fg =
    textOnSwatch === 'light'
      ? '#fff'
      : textOnSwatch === 'dark'
        ? 'var(--color-ink-800)'
        : 'var(--color-ink-0)'
  return (
    <div
      className="stack"
      style={{
        gap: 0,
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--color-ink-100)',
      }}
    >
      <div style={{ background: value, height: 96, color: fg, padding: 'var(--space-3)' }}>
        <span className="t-mono" style={{ fontSize: 'var(--text-xs)' }}>{value.toUpperCase()}</span>
      </div>
      <div style={{ padding: 'var(--space-3)', background: 'var(--color-ink-0)' }}>
        <div className="t-body-medium" style={{ fontSize: 'var(--text-sm)' }}>{name}</div>
        <div className="t-mono" style={{ fontSize: 'var(--text-xs)', color: 'var(--color-ink-500)' }}>{varName}</div>
      </div>
    </div>
  )
}

// ─── Showcase ───────────────────────────────────────────────────────────
export function DesignSystemShowcaseComponent(_props: object): JSX.Element {
  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'var(--color-ink-25)',
        padding: 'var(--space-12) var(--space-6)',
      }}
    >
      <div
        className="stack"
        style={{ maxWidth: 'var(--container-max)', margin: '0 auto', gap: 'var(--space-12)' }}
      >
        {/* HERO */}
        <header className="stack" style={{ gap: 'var(--space-3)' }}>
          <Row gap={3} wrap>
            <Badge tone="brand">v1 · construction-guide</Badge>
            <Badge tone="success">tokens loaded</Badge>
            <span className="t-overline" style={{ color: 'var(--color-ink-500)' }}>
              @surte/design-system
            </span>
          </Row>
          <h1 className="t-display-3xl" style={{ margin: 0 }}>Design System</h1>
          <p className="t-body" style={{ margin: 0, color: 'var(--color-ink-600)', maxWidth: 720 }}>
            Componentes base del sistema Surte Inventory. Todos consumen los tokens definidos en{' '}
            <code className="t-mono" style={{ fontSize: 13 }}>construction-guide/design-system/</code>{' '}
            — la fuente de verdad. Renderizado vía el Pattern{' '}
            <code className="t-mono" style={{ fontSize: 13 }}>pattern.design-system</code>{' '}
            en la ruta{' '}
            <code className="t-mono" style={{ fontSize: 13 }}>/design-system</code>.
          </p>
          <Row gap={3} wrap>
            <Button variant="primary" onClick={() => { history.back() }}>← Volver</Button>
            <a href="/" className="btn btn-ghost btn-sm">Hello World</a>
          </Row>
        </header>

        {/* COLORS */}
        <Section
          id="colors"
          eyebrow="01 · Foundations"
          title="Colors"
          description="Paleta brand (cyan profundo), colores semánticos KPI (Inversión / Movimiento / Ganancia), feedback y neutrales warm-gray."
        >
          <Stack gap={6}>
            <div>
              <div className="t-overline" style={{ marginBottom: 'var(--space-3)' }}>Brand</div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
                  gap: 'var(--space-3)',
                }}
              >
                <Swatch name="brand-50"  value="#f0f7ff" varName="--color-brand-50"  textOnSwatch="dark" />
                <Swatch name="brand-100" value="#dceefe" varName="--color-brand-100" textOnSwatch="dark" />
                <Swatch name="brand-300" value="#84c4fb" varName="--color-brand-300" textOnSwatch="dark" />
                <Swatch name="brand-500" value="#0693e3" varName="--color-brand-500" textOnSwatch="light" />
                <Swatch name="brand-700" value="#035c93" varName="--color-brand-700" textOnSwatch="light" />
                <Swatch name="brand-900" value="#073d62" varName="--color-brand-900" textOnSwatch="light" />
              </div>
            </div>

            <div>
              <div className="t-overline" style={{ marginBottom: 'var(--space-3)' }}>KPI semánticos</div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  gap: 'var(--space-3)',
                }}
              >
                <Swatch name="Inversión"  value="#1a1b4b" varName="--color-inversion"  textOnSwatch="light" />
                <Swatch name="Movimiento" value="#0693e3" varName="--color-movimiento" textOnSwatch="light" />
                <Swatch name="Ganancia"   value="#f5a524" varName="--color-ganancia"   textOnSwatch="dark" />
              </div>
            </div>

            <div>
              <div className="t-overline" style={{ marginBottom: 'var(--space-3)' }}>Neutrales (warm gray)</div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
                  gap: 'var(--space-3)',
                }}
              >
                <Swatch name="ink-25"  value="#fbfbfa" varName="--color-ink-25"  textOnSwatch="dark" />
                <Swatch name="ink-100" value="#ecebe8" varName="--color-ink-100" textOnSwatch="dark" />
                <Swatch name="ink-300" value="#b8b5ad" varName="--color-ink-300" textOnSwatch="dark" />
                <Swatch name="ink-500" value="#6b6862" varName="--color-ink-500" textOnSwatch="light" />
                <Swatch name="ink-700" value="#3a3833" varName="--color-ink-700" textOnSwatch="light" />
                <Swatch name="ink-900" value="#16150f" varName="--color-ink-900" textOnSwatch="light" />
              </div>
            </div>
          </Stack>
        </Section>

        {/* TYPOGRAPHY */}
        <Section
          id="typography"
          eyebrow="02 · Foundations"
          title="Typography"
          description="Manrope para display & body, JetBrains Mono para números y datos tabulares."
        >
          <Card>
            <Stack gap={4}>
              <div className="t-display-3xl">S/. 12,480</div>
              <div className="t-display-2xl">Triángulo de valor</div>
              <div className="t-h1">Heading 1 · Dashboard</div>
              <div className="t-h2">Heading 2 · Sección</div>
              <div className="t-h3">Heading 3 · Subsección</div>
              <div className="t-body">
                Body 16px — el sistema de inventario muestra al mayorista cuánto invirtió,
                cuánto se movió y cuánto ganó, en tiempo real.
              </div>
              <div className="t-caption">Caption 14px · metadata secundaria</div>
              <div className="t-overline">Overline · etiqueta de sección</div>
              <div className="t-num" style={{ fontSize: 'var(--text-2xl)' }}>S/. 4,200.50</div>
            </Stack>
          </Card>
        </Section>

        {/* BUTTONS */}
        <Section
          id="buttons"
          eyebrow="03 · Components"
          title="Button"
          description="4 variantes × 3 tamaños. Hit target ≥ 44px en md/lg."
        >
          <Stack gap={6}>
            <Card>
              <Stack gap={4}>
                <div className="t-overline">Variants</div>
                <Row gap={3} wrap>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </Row>
                <Divider />
                <div className="t-overline">Sizes</div>
                <Row gap={3} wrap align="end">
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button iconOnly aria-label="add">＋</Button>
                </Row>
                <Divider />
                <div className="t-overline">Block</div>
                <Button block>Registrar entrada de productos</Button>
              </Stack>
            </Card>
          </Stack>
        </Section>

        {/* INPUTS */}
        <Section
          id="inputs"
          eyebrow="04 · Components"
          title="Input & Field"
          description="Hit target cómodo (56px). Estados: default · focus · error · with help."
        >
          <Card>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: 'var(--space-5)',
              }}
            >
              <Field label="SKU del producto" hint="Único en el sistema" htmlFor="f-sku">
                <Input id="f-sku" placeholder="ARZ-COS-50" defaultValue="ARZ-COS-50" />
              </Field>
              <Field label="Nombre" htmlFor="f-name">
                <Input id="f-name" placeholder="Arroz Costeño 50kg" />
              </Field>
              <Field label="Precio de venta (S/.)" htmlFor="f-price">
                <Input id="f-price" type="number" placeholder="0.00" />
              </Field>
              <Field label="Stock mínimo" error="Debe ser mayor a 0" htmlFor="f-min">
                <Input id="f-min" type="number" defaultValue="0" invalid />
              </Field>
            </div>
          </Card>
        </Section>

        {/* CARDS */}
        <Section id="cards" eyebrow="05 · Components" title="Card" description="4 variantes — default, flat, lifted, hero.">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            <Card>
              <div className="t-h3">Default</div>
              <p className="t-body" style={{ margin: 0, color: 'var(--color-ink-600)' }}>shadow-sm + border</p>
            </Card>
            <Card variant="flat">
              <div className="t-h3">Flat</div>
              <p className="t-body" style={{ margin: 0, color: 'var(--color-ink-600)' }}>sin shadow</p>
            </Card>
            <Card variant="lifted">
              <div className="t-h3">Lifted</div>
              <p className="t-body" style={{ margin: 0, color: 'var(--color-ink-600)' }}>shadow-md</p>
            </Card>
            <Card variant="hero">
              <div className="t-h3">Hero</div>
              <p className="t-body" style={{ margin: 0, color: 'var(--color-ink-600)' }}>shadow-lg, sin border</p>
            </Card>
          </div>
        </Section>

        {/* BADGES & ALERTS */}
        <Section
          id="feedback"
          eyebrow="06 · Components"
          title="Badge & Alert"
          description="Status chips y banners semánticos para vencimientos, stock crítico, confirmaciones."
        >
          <Stack gap={5}>
            <Card>
              <Stack gap={4}>
                <div className="t-overline">Badges</div>
                <Row gap={2} wrap>
                  <Badge tone="neutral">neutral</Badge>
                  <Badge tone="brand">brand</Badge>
                  <Badge tone="success">success</Badge>
                  <Badge tone="warning">warning</Badge>
                  <Badge tone="error">error</Badge>
                </Row>
              </Stack>
            </Card>
            <Stack gap={3}>
              <Alert tone="info" title="Período cambiado">
                Las KPI se recalcularon a "esta semana".
              </Alert>
              <Alert tone="success" title="Entrada registrada">
                Aceite Primor 1L · 24 unidades · S/. 192.00 sumado al stock.
              </Alert>
              <Alert tone="warning" title="Vencimiento próximo">
                Aceite Primor 1L vence en 3 días — 8 unidades en stock.
              </Alert>
              <Alert tone="error" title="Stock crítico">
                Azúcar Castillo 5kg · solo 3 sacos disponibles (mín: 10).
              </Alert>
            </Stack>
          </Stack>
        </Section>

        {/* KPI CARDS */}
        <Section
          id="kpi"
          eyebrow="07 · Components"
          title="KPI Card"
          description="Triángulo de valor — el componente firma del producto."
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'var(--space-5)',
            }}
          >
            <KpiCard
              color="inversion"
              label="Inversión"
              value="S/. 8,280"
              delta={{ direction: 'up', label: '12% vs semana anterior' }}
              hint="42 entradas registradas"
            />
            <KpiCard
              color="movimiento"
              label="Movimiento"
              value="S/. 12,480"
              delta={{ direction: 'up', label: '8% vs semana anterior' }}
              hint="225 unidades vendidas"
            />
            <KpiCard
              color="ganancia"
              label="Ganancia"
              value="S/. 4,200"
              delta={{ direction: 'down', label: '3% vs semana anterior' }}
              hint="margen promedio 33.6%"
            />
          </div>
        </Section>

        {/* DATA TABLE */}
        <Section
          id="datatable"
          eyebrow="08 · Components"
          title="DataTable"
          description="Tabla genérica tipada. Numeric right-align con tabular-nums."
        >
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <DataTable<Movimiento>
              rowKey={(r) => r.sku}
              rows={MOVIMIENTOS}
              columns={[
                { key: 'sku',      header: 'SKU' },
                { key: 'nombre',   header: 'Producto' },
                { key: 'vendido',  header: 'Vendido', numeric: true },
                {
                  key: 'ganancia',
                  header: 'Ganancia',
                  numeric: true,
                  render: (r) => `S/. ${r.ganancia.toLocaleString()}`,
                },
                {
                  key: 'stock',
                  header: 'Stock',
                  numeric: true,
                  render: (r) =>
                    r.stock < 10 ? (
                      <Row gap={2} justify="end">
                        <span>{r.stock}</span>
                        <Badge tone="warning">bajo</Badge>
                      </Row>
                    ) : (
                      <span>{r.stock}</span>
                    ),
                },
              ]}
            />
          </Card>
        </Section>

        {/* LIST ITEM */}
        <Section
          id="listitem"
          eyebrow="09 · Components"
          title="ListItem"
          description="Fila de lista con thumb · body · end. Útil para movimientos y alertas en mobile."
        >
          <Stack gap={3}>
            <ListItem
              thumb={<span>ARZ</span>}
              title="Arroz Costeño 50kg"
              meta="6 sacos · vence 28 jun"
              end={<span style={{ color: 'var(--color-success-700)' }}>+ S/. 540</span>}
            />
            <ListItem
              thumb={<span>ACE</span>}
              title="Aceite Primor 1L"
              meta="22 unid · vence 19 may"
              end={<span style={{ color: 'var(--color-success-700)' }}>+ S/. 336</span>}
            />
            <ListItem
              thumb={<span>AZU</span>}
              title="Azúcar Castillo 5kg"
              meta="3 sacos · stock crítico"
              end={<Badge tone="error">repón</Badge>}
            />
          </Stack>
        </Section>

        {/* EMPTY STATE */}
        <Section
          id="empty"
          eyebrow="10 · Patterns"
          title="Empty state"
          description="Cuando no hay datos, muestra un estado vacío con CTA claro."
        >
          <Card>
            <div className="empty">
              <div className="empty-icon">📦</div>
              <div className="empty-title">Sin productos todavía</div>
              <p className="empty-msg">
                Crea tu primer producto para empezar a registrar entradas y movimientos.
              </p>
              <Row gap={3} style={{ marginTop: 'var(--space-3)' }}>
                <Button>Crear producto</Button>
                <Button variant="ghost">Importar catálogo</Button>
              </Row>
            </div>
          </Card>
        </Section>

        {/* FOOTER */}
        <footer
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
            padding: 'var(--space-6) 0',
            borderTop: '1px solid var(--color-ink-100)',
            color: 'var(--color-ink-500)',
            fontSize: 'var(--text-sm)',
          }}
        >
          <span>@surte/design-system · v1</span>
          <Spacer />
          <a href="/" style={{ color: 'var(--color-brand-700)' }}>← Volver al inicio</a>
        </footer>
      </div>
    </main>
  )
}
