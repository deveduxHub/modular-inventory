---
name: storybook
description: Cada componente con .stories.tsx cubriendo variantes, sizes, estados, a11y.
scope: Fase 0..N · DS components y feature components shared
---

# Storybook Evaluator

## Cobertura obligatoria por componente

1. **Archivo `Component.stories.tsx`** con CSF 3.0 y autodocs.
2. **Story `Default`** baseline.
3. **Story por cada variante** declarada en el contrato XML.
4. **Story por cada size**.
5. **Story por cada estado** (hover/focus/disabled/loading/error según aplique).
6. **Story `Playground`** con `argTypes` controlando TODAS las props.
7. **Story `AllVariants`** lado a lado para snapshot visual.
8. **Story `A11y`** con `@storybook/addon-a11y` activo → cero violaciones AA.

## Estructura mínima
```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta = {
  title: 'DS/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: { variant: { control: 'select', options: ['primary','secondary','ghost','danger'] } },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: 'Guardar' } };
export const Loading: Story = { args: { children: 'Guardando…', 'data-loading': true } };
export const AllVariants: Story = { render: () => /* 4 botones lado a lado */ };
```

## Addons obligatorios
- `@storybook/addon-essentials`
- `@storybook/addon-a11y`
- `@storybook/addon-interactions` para flujos
- `@storybook/test-runner` en CI

## Bloqueos
- Componente sin `.stories.tsx` → FAIL.
- Story sin `argTypes` cuando hay props con union types → FAIL.
- Cero violaciones a11y en panel de Storybook.

## Output
```json
{ "ok": false, "violations": [{ "component": "Modal", "missing": ["stories.tsx", "A11y story"], "fix": "Create Modal.stories.tsx with at minimum Default, Sizes, AllVariants" }] }
```
