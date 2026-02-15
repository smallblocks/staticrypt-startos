import { setupVersionGraph } from '@start9labs/start-sdk'

export const versionGraph = setupVersionGraph({
  '0.1.0:0': {
    up: async ({ effects }) => {
      console.info('Fresh install of StatiCrypt 0.1.0')
      return {}
    },
    down: async ({ effects }) => {
      console.info('Uninstalling StatiCrypt')
      return null
    },
  },
})
