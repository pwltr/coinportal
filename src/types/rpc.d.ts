type Response<Body> = {
  status: 'success' | 'error'
  data?: Body | null
  message?: string
}

type GenerateWalletResult = {
  wallet_name: string
  seed_phrase: string
  extension: string | null
}

type RecoverWalletResult = {
  wallet_name: string
  extension: string | null
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

type GetWalletAdressesResult = {
  // TODO:
}

type GetReceiveInvoiceResult = {
  address: string
}

type GetFidelityBondAddressResult = {
  address: string
  unix_locktime: number
}

type RecoverFromIncompleteCoinswapResult = {
  // TODO:
}

type DownloadOffersResult = {
  // TODO:
}

type DirectSendResult = {
  test_mempool_accept_result: TestMempoolAcceptResult
  txhex: string
  txid: Txid | null
}
