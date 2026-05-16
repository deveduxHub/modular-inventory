import type {
  PatternSpec,
  PatternDefinition,
  PatternInstance,
  PatternInstanceOptions,
} from '../types/pattern.js'

export function definePattern<TConfig extends object, TProps extends object>(
  spec: PatternSpec<TConfig, TProps>,
): PatternDefinition<TConfig, TProps> {
  const frozenSpec = Object.freeze({ ...spec })

  const definition: PatternDefinition<TConfig, TProps> = {
    spec: frozenSpec,
    instance(
      options: PatternInstanceOptions<TConfig> = {},
    ): PatternInstance<TConfig, TProps> {
      const config = {
        ...(spec.defaults ?? ({} as TConfig)),
        ...(options.config ?? {}),
      } as TConfig
      return Object.freeze<PatternInstance<TConfig, TProps>>({
        _patternId:   spec.id,
        _spec:        frozenSpec,
        _config:      config,
        _instanceKey: options.key ?? spec.id,
      })
    },
  }

  return Object.freeze(definition)
}
