import { sdk } from '../sdk'

export const init = sdk.setupInit(async ({ effects }) => {
  console.info('Initializing StatiCrypt...')
  return {}
})

export const uninit = sdk.setupUninit(async ({ effects }) => {
  console.info('Uninitializing StatiCrypt...')
  return null
})
