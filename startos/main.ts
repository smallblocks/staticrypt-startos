import { sdk } from './sdk'

const uiPort = 3000

export const main = sdk.setupMain(async ({ effects }) => {
  console.info('Starting StatiCrypt!')

  const subcontainer = await sdk.SubContainer.of(
    effects,
    { imageId: 'main' },
    sdk.Mounts.of().mountVolume({
      volumeId: 'main',
      subpath: null,
      mountpoint: '/data',
      readonly: false,
    }),
    'staticrypt-sub',
  )

  return sdk.Daemons.of(effects).addDaemon('primary', {
    subcontainer,
    exec: {
      command: ['node', 'src/server.js'],
      env: {
        PORT: String(uiPort),
        NODE_ENV: 'production',
      },
    },
    ready: {
      display: 'Web Interface',
      fn: () =>
        sdk.healthCheck.checkPortListening(effects, uiPort, {
          successMessage: 'StatiCrypt is ready',
          errorMessage: 'StatiCrypt is not ready',
        }),
    },
    requires: [],
  })
})
