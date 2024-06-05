import { type WalletClient, createWalletClient } from './createWalletClient.js'
import { viemConnector } from './ethereum/viemConnector.js'

describe('createWalletClient', () => {
  const config = {
    ethereum: viemConnector(),
  }

  let walletClient: WalletClient

  beforeEach(() => {
    walletClient = createWalletClient(config)
  })

  test('adds version to config', () => {
    expect(walletClient.config).toEqual({
      relay: 'https://relay.farcaster.xyz',
      version: 'v1',
    })
  })

  test('overrides version', () => {
    walletClient = createWalletClient({
      ...config,
      version: 'v2',
    })

    expect(walletClient.config).toEqual({
      relay: 'https://relay.farcaster.xyz',
      version: 'v2',
    })
  })

  test('includes app actions', () => {
    expect(walletClient.authenticate).toBeDefined()
  })
})
