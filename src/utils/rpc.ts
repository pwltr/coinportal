import { invoke } from '@tauri-apps/api'
import type { InvokeArgs } from '@tauri-apps/api/tauri'

type Response<Body> = {
  status: 'success' | 'error'
  data?: Body | null
  message?: string
}

function call<T>(cmd: string, args: InvokeArgs): Promise<Response<T>> {
  return new Promise((resolve, reject) => {
    invoke<Response<T>>(cmd, args)
      .then((response) => {
        if (response.status === 'success') {
          resolve(response)
        } else {
          reject(response)
        }
      })
      .catch((error) =>
        reject({
          status: 'error',
          message: error,
        }),
      )
  })
}

export const generateWallet = async ({ name, extension }: { name?: string; extension: string }) => {
  return call<GenerateWalletResult>('generate_wallet', {
    name,
    extension,
  })
}

export const recoverWallet = async ({
  name,
  seedPhrase,
  extension,
}: {
  name?: string
  seedPhrase: string
  extension: string
}) => {
  return call<RecoverWalletResult>('recover_wallet', {
    name,
    seedPhrase,
    extension,
  })
}

export const getWalletBalance = async (
  name?: string,
): Promise<Response<GetWalletBalanceResult>> => {
  return call<GetWalletBalanceResult>('get_wallet_balance', { name })
}

export const getReceiveInvoice = async (name?: string) => {
  return call<GetReceiveInvoiceResult>('get_receive_invoice', { name })
}

export const getFidelityBondAddress = async ({
  name,
  locktime,
}: {
  name?: string
  locktime: {
    month: number
    year: number
  }
}) => {
  return call<GetFidelityBondAddressResult>('get_fidelity_bond_address', {
    name,
    locktime,
  })
}

export const getOffers = async ({
  network,
  makerAddress,
}: {
  network?: string
  makerAddress?: number
}) => {
  return call<DownloadOffersResult>('get_offers', { network, makerAddress })
}

export const runTaker = async ({
  name,
  sendAmount,
  feeRate,
  makerCount,
  txCount,
}: {
  name?: string
  sendAmount: number
  feeRate?: number
  makerCount?: number
  txCount?: number
}) => {
  return call<null>('run_taker', { name, sendAmount, feeRate, makerCount, txCount })
}

export const directSend = async ({
  name,
  sendAmount,
  destination,
  coinsToSpend,
  feeRate,
  dontBroadcast,
}: {
  name?: string
  sendAmount: number
  destination: string
  coinsToSpend: string
  feeRate?: string
  dontBroadcast?: boolean
}) => {
  return call<DirectSendResult>('direct_send', {
    name,
    feeRate,
    sendAmount,
    destination,
    coinsToSpend,
    dontBroadcast,
  })
}
