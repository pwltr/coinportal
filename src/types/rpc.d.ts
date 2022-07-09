type Response<Body> = {
  status: 'success' | 'error'
  data?: Body | null
  message?: string
}

type GenerateWalletRequest = { name?: string; extension?: string }

type GenerateWalletResult = {
  wallet_name: string
  seed_phrase: string
  extension: string | null
}

type RecoverWalletRequest = {
  name?: string
  seedPhrase: string
  extension: string
}

type RecoverWalletResult = {
  wallet_name: string
  extension: string | null
}

type GetWalletBalanceRequest = {
  name?: string
}

type GetWalletBalanceResult = {
  mediantime: number
  spendable_balance: SpendableBalance
  // incomplete_coinswaps: HashMap<
  //     Hash160,
  //     (
  //         Array<(ListUnspentResultEntry, IncomingSwapCoin)>,
  //         Array<(ListUnspentResultEntry, OutgoingSwapCoin)>,
  //     ),
  // >,
  live_timelocked_contracts: LiveTimelockedContracts
}

type SpendableBalance = {
  balance: Amount
  utxo_count: number
  // utxos: Array<(ListUnspentResultEntry, UTXOSpendInfo)>,
  // fidelity_bond_utxos: Array<(ListUnspentResultEntry, UTXOSpendInfo)>,
}

// type LiveTimelockedContracts = {
//     incoming_contract_utxos: Array<(IncomingSwapCoin, ListUnspentResultEntry)>,
//     outgoing_contract_utxos: Array<(OutgoingSwapCoin, ListUnspentResultEntry)>,
// }

type GetWalletAdressesRequest = {
  // TODO:
}

type GetWalletAdressesResult = {
  // TODO:
}

type getReceiveAddressRequest = {
  name?: string
}

type getReceiveAddressResult = {
  address: string
}

type GetFidelityBondAddressRequest = {
  name?: string
  locktime: {
    month: number
    year: number
  }
}

type GetFidelityBondAddressResult = {
  address: string
  unix_locktime: number
}

type GetOffersRequest = {
  network?: string
  makerAddress?: number
}

type GetOffersResult = {
  maker_addresses: Array<MakerAddress>
  addresses_offers_map: {
    address: string
  }
}

type RunTakerRequest = {
  name?: string
  sendAmount: number
  feeRate?: number
  makerCount?: number
  txCount?: number
}

type RunTakerResult = null

type RecoverFromIncompleteCoinswapRequest = {
  // TODO:
}

type RecoverFromIncompleteCoinswapResult = {
  // TODO:
}

type DirectSendRequest = {
  name?: string
  sendAmount: number
  destination: string
  coinsToSpend: string
  feeRate?: string
  dontBroadcast?: boolean
}

type DirectSendResult = {
  test_mempool_accept_result: TestMempoolAcceptResult
  txhex: string
  txid: Txid | null
}
