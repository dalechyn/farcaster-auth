import { http, type Hex, createPublicClient } from 'viem'
import { optimism } from 'viem/chains'
import {
  ID_REGISTRY_ADDRESS,
  idRegistryABI,
} from '../../contracts/idRegistry.js'
import type { EthereumConnector } from './connector.js'

interface ViemConfigArgs {
  rpcUrl?: string
}

export const viemConnector = (args?: ViemConfigArgs): EthereumConnector => {
  const publicClient = createPublicClient({
    chain: optimism,
    transport: http(args?.rpcUrl),
  })

  const getFid = async (custody: Hex): Promise<bigint> => {
    return publicClient.readContract({
      address: ID_REGISTRY_ADDRESS,
      abi: idRegistryABI,
      functionName: 'idOf',
      args: [custody],
    })
  }

  return {
    getFid,
  }
}
