import type { LazyExoticComponent, ComponentType } from 'react'
import type { CapabilityToken } from './capability.js'

export type SlotKind =
  | 'data-display'
  | 'action'
  | 'feedback'
  | 'navigation'
  | 'layout'
  | 'form'

export type ResolvedContext = Readonly<Partial<Record<CapabilityToken, unknown>>>

export interface PatternSpec<TConfig extends object, TProps extends object> {
  readonly id:         string
  readonly slotKind:   SlotKind
  readonly requires:   ReadonlyArray<CapabilityToken>
  readonly Component:  LazyExoticComponent<ComponentType<TProps>>
  readonly selector:   (ctx: ResolvedContext, config: TConfig) => TProps
  readonly visibility: (ctx: ResolvedContext) => boolean
  readonly defaults?:  TConfig
}

export interface PatternInstanceOptions<TConfig extends object> {
  readonly config?: Partial<TConfig>
  readonly key?:    string
}

export interface PatternInstance<
  TConfig extends object = object,
  TProps extends object = object,
> {
  readonly _patternId:   string
  readonly _spec:        PatternSpec<TConfig, TProps>
  readonly _config:      TConfig
  readonly _instanceKey: string
}

export interface PatternDefinition<TConfig extends object, TProps extends object> {
  readonly spec: PatternSpec<TConfig, TProps>
  instance(options?: PatternInstanceOptions<TConfig>): PatternInstance<TConfig, TProps>
}
