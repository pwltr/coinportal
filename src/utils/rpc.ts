import { invoke } from '@tauri-apps/api'
import type { InvokeArgs } from '@tauri-apps/api/tauri'

type Response<Body> = {
  status: 'success' | 'error'
  data?: Body
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
      .catch((error) => {
        reject({
          status: 'error',
          message: error,
        })
      })
  })
}

export const generateWallet = async (args?: GenerateWalletRequest) => {
  return call<GenerateWalletResult>('generate_wallet', { ...args })
}

export const recoverWallet = async (args: RecoverWalletRequest) => {
  return call<RecoverWalletResult>('recover_wallet', { ...args })
}

export const getWalletBalance = async (args?: GetWalletBalanceRequest) => {
  return call<GetWalletBalanceResult>('get_wallet_balance', { ...args })
}

export const getReceiveAddress = async (args?: getReceiveAddressRequest) => {
  return call<getReceiveAddressResult>('get_receive_invoice', { ...args })
}

export const getFidelityBondAddress = async (args: GetFidelityBondAddressRequest) => {
  return call<GetFidelityBondAddressResult>('get_fidelity_bond_address', { ...args })
}

export const getOffers = async (args?: GetOffersRequest) => {
  return call<GetOffersResult>('get_offers', { ...args })
}

export const runTaker = async (args: RunTakerRequest) => {
  return call<RunTakerResult>('run_taker', { ...args })
}

export const directSend = async (args: DirectSendRequest) => {
  return call<DirectSendResult>('direct_send', { ...args })
}
