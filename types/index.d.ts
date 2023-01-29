import { Continify } from 'continify'

export interface ContinifyPluginOptions {
  name?: string
  continify?: string
}
export type ContinifyPluginDone = (err?: Error) => void
export type ContinifyPlugin = (
  ins: Continify,
  options: ContinifyPluginOptions,
  done?: ContinifyPluginDone
) => Promise<void> | void

declare function factory(
  plugin: ContinifyPlugin,
  options?: ContinifyPluginOptions
): Promise<void> | void

export = factory
export default factory
