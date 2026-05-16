---
name: composition
description: Valida patrones de composición (slot, compound, render-props, asChild).
scope: Fase 0..N · DS components
---

# Composition Evaluator

## Reglas

1. **Slot pattern obligatorio en componentes con sub-partes** (Card, Modal, Form). Ej:
   ```tsx
   <Card>
     <Card.Header><Card.Title>…</Card.Title></Card.Header>
     <Card.Body>…</Card.Body>
     <Card.Footer>…</Card.Footer>
   </Card>
   ```
   No props como `headerContent`, `bodyContent`.

2. **`asChild` o equivalente** para botones/links que renderizan distinto elemento. Patrón Radix:
   ```tsx
   <Button asChild><Link to="/x">Ir</Link></Button>
   ```
   Bloquea: clonar children con `React.cloneElement` ad-hoc en cada componente.

3. **Cero "kitchen-sink" props.** Si un componente acepta `leftIcon`, `rightIcon`, `prefix`, `suffix`, `badge`… → refactor a slots.

4. **Render-props solo si hay state interno expuesto.** Ej:
   ```tsx
   <Dropdown>{({ isOpen, close }) => …}</Dropdown>
   ```
   No usar para casos donde el slot pattern basta.

5. **`children` siempre permitida** salvo en componentes void (Badge si solo texto, Input).

6. **No prop-drilling >2 niveles.** Si pasa, exigir Context o composición.

7. **Componentes "headless"** (lógica) separados de "visual" (Tailwind) cuando hay reuso múltiple. Ej: `useDisclosure()` + `<Modal/>`.

## Output
```json
{ "ok": true|false, "violations": [{ "component": "Card", "rule": "1-slot-pattern", "evidence": "prop headerContent detected", "fix": "Replace with Card.Header subcomponent" }] }
```
