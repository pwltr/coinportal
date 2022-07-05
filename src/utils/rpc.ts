import { invoke } from '@tauri-apps/api'

type Response<Body> = {
  status: 'success' | 'error'
  data?: Body | null
  message?: string
}

export const generateWallet = async ({
  name,
  extension,
}: {
  name?: string
  extension: string
}): Promise<Response<GenerateWalletResult>> => {
  return new Promise((resolve, reject) => {
    invoke<Response<GenerateWalletResult>>('generate_wallet', {
      name,
      extension,
    }).then((response) => {
      if (response.status === 'success') {
        resolve(response)
      } else {
        reject(response)
      }
    })
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
}): Promise<Response<RecoverWalletResult>> => {
  return new Promise((resolve, reject) => {
    invoke<Response<RecoverWalletResult>>('recover_wallet', {
      name,
      seedPhrase,
      extension,
    }).then((response) => {
      if (response.status === 'success') {
        resolve(response)
      } else {
        reject(response)
      }
    })
  })
}

export const getWalletBalance = async (
  name?: string,
): Promise<Response<GetWalletBalanceResult>> => {
  return new Promise((resolve, reject) => {
    invoke<Response<GetWalletBalanceResult>>('get_wallet_balance', {
      name,
    }).then((response) => {
      if (response.status === 'success') {
        resolve(response)
      } else {
        reject(response)
      }
    })
  })
}

export const getReceiveInvoice = async (
  name?: string,
): Promise<Response<GetReceiveInvoiceResult>> => {
  return new Promise((resolve, reject) => {
    invoke<Response<GetReceiveInvoiceResult>>('get_receive_invoice', {
      name,
    }).then((response) => {
      if (response.status === 'success') {
        resolve(response)
      } else {
        reject(response)
      }
    })
  })
}

export const getFidelityBondAddress = async ({
  name,
  locktime,
}: {
  name?: string
  locktime: string
}): Promise<Response<GetFidelityBondAddressResult>> => {
  return new Promise((resolve, reject) => {
    invoke<Response<GetFidelityBondAddressResult>>('get_fidelity_bond_address', {
      name,
      locktime,
    }).then((response) => {
      if (response.status === 'success') {
        resolve(response)
      } else {
        reject(response)
      }
    })
  })
}

export const runTaker = async ({
  name,
  sendAmount,
}: {
  name?: string
  sendAmount: number
}): Promise<Response<null>> => {
  return new Promise((resolve, reject) => {
    invoke<Response<null>>('run_taker', { name, sendAmount }).then((response) => {
      if (response.status === 'success') {
        resolve(response)
      } else {
        reject(response)
      }
    })
  })
}
