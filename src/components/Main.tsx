import { useState, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { clipboard } from '@tauri-apps/api'
import styled from 'styled-components'

import {
  readWalletFile,
  getWalletBalance,
  getReceiveAddress,
  getFidelityBondAddress,
  runTaker,
  getOffers,
  directSend,
} from '~/utils'
import logo from '../logo.svg'

type Response<Body> = {
  status: 'success' | 'error'
  data?: Body | null
  message?: string
}

const Section = styled('div')`
  display: flex;
  justify-content: center;
  grid-gap: 0.5rem;
  margin-bottom: 1rem;
  padding: 0.2rem 0;
`

function Main() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  // TEMP: just debugging
  const [response, setResponse] = useState<Response<unknown> | null>(null)

  const [locktime, setLocktime] = useState('')

  const [coinswapAmount, setCoinswapAmount] = useState('')
  const [coinswapFeeRate, setCoinswapFeeRate] = useState('')
  const [coinswapMakerCount, setCoinswapMakerCount] = useState('')
  const [coinswapTxCount, setCoinswapTxCount] = useState('')

  const [directSendAmount, setDirectSendAmount] = useState('')
  const [directSendDestination, setDirectSendDestination] = useState('')
  const [directSendCoins, setDirectSendCoins] = useState('')
  const [directSendFeeRate, setDirectSendFeeRate] = useState('')

  useEffect(() => {
    const checkForWallet = async () => {
      try {
        await readWalletFile()
      } catch (error) {
        navigate('start')
      }
    }

    checkForWallet()
  })

  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>CoinPortal</h1>
      </header>

      <div className="App-body pt-8">
        <Section>
          <button
            className="btn"
            type="button"
            onClick={async () => {
              setIsLoading(true)
              getWalletBalance()
                .then((response) => {
                  console.log('response', response)
                  setResponse(response)
                  setIsLoading(false)
                })
                .catch((error) => {
                  console.error('error', error)
                  toast.error(error.message)
                  setResponse(error)
                  setIsLoading(false)
                })
            }}
          >
            Show Wallet Balance
          </button>

          <button
            className="btn"
            type="button"
            onClick={async () => {
              setIsLoading(true)
              getReceiveAddress()
                .then((response) => {
                  console.log('response', response)
                  clipboard.writeText(String(response.data?.address))
                  toast.success('Address copied to clipboard', {
                    id: 'clipboard1',
                    duration: 2500,
                  })
                  setResponse(response)
                  setIsLoading(false)
                })
                .catch((error) => {
                  console.error('error', error)
                  toast.error(error.message)
                  setResponse(error)
                  setIsLoading(false)
                })
            }}
          >
            Get Receive Invoice
          </button>

          <button
            className="btn"
            type="button"
            onClick={async () => {
              setIsLoading(true)
              getOffers()
                .then((response) => {
                  console.log('response', response)
                  setResponse(response)
                  setIsLoading(false)
                })
                .catch((error) => {
                  console.error('error', error)
                  toast.error(error.message)
                  setResponse(error)
                  setIsLoading(false)
                })
            }}
          >
            Get Offers
          </button>
        </Section>

        {/* <div className="divider"></div> */}

        <Section>
          <div className="">
            <input
              className="input w-52"
              type="text"
              placeholder="Locktime (YYYY-MM)"
              value={locktime}
              onChange={(event) => setLocktime(event.target.value)}
            />
          </div>

          <button
            className="btn"
            type="button"
            onClick={async () => {
              const [year, month] = locktime.split('-')
              setIsLoading(true)
              getFidelityBondAddress({ locktime: { year: Number(year), month: Number(month) } })
                .then((response) => {
                  console.log('response', response)
                  setResponse(response)
                  clipboard.writeText(String(response.data?.address))
                  toast.success('Address copied to clipboard', {
                    id: 'clipboard2',
                    duration: 2500,
                  })
                  setLocktime('')
                  setIsLoading(false)
                })
                .catch((error) => {
                  console.error('error', error)
                  toast.error(error.message)
                  setResponse(error)
                  setIsLoading(false)
                })
            }}
          >
            Get Fidelity Bond Address
          </button>
        </Section>

        {/* <div className="divider"></div> */}

        <Section>
          <div className="">
            <input
              className="input w-44"
              type="text"
              placeholder="Amount (in Satoshis)"
              value={coinswapAmount}
              onChange={(event) => setCoinswapAmount(event.target.value)}
            />
          </div>
          <div className="">
            <input
              className="input w-40"
              type="text"
              placeholder="Fee Rate (optional)"
              value={coinswapFeeRate}
              onChange={(event) => setCoinswapFeeRate(event.target.value)}
            />
          </div>
          <div className="">
            <input
              className="input w-52"
              type="text"
              placeholder="Maker Count (optional)"
              value={coinswapMakerCount}
              onChange={(event) => setCoinswapMakerCount(event.target.value)}
            />
          </div>
          <div className="">
            <input
              className="input w-44"
              type="text"
              placeholder="Tx Count (optional)"
              value={coinswapTxCount}
              onChange={(event) => setCoinswapTxCount(event.target.value)}
            />
          </div>

          <button
            className="btn"
            type="button"
            onClick={async () => {
              setIsLoading(true)
              runTaker({
                sendAmount: Number(coinswapAmount),
                feeRate: Number(coinswapFeeRate),
                makerCount: Number(coinswapMakerCount),
                txCount: Number(coinswapTxCount),
              })
                .then((response) => {
                  console.log('response', response)
                  setResponse(response)
                  setCoinswapAmount('')
                  setIsLoading(false)
                })
                .catch((error) => {
                  console.error('error', error)
                  toast.error(error.message)
                  setResponse(error)
                  setIsLoading(false)
                })
            }}
          >
            Run Coinswap
          </button>
        </Section>

        {/* <div className="divider"></div> */}

        <Section>
          <div className="">
            <input
              className="input w-44"
              type="text"
              placeholder="Amount (in Satoshis)"
              value={directSendAmount}
              onChange={(event) => setDirectSendAmount(event.target.value)}
            />
          </div>
          <div className="">
            <input
              className="input w-60"
              type="text"
              placeholder="Destination"
              value={directSendDestination}
              onChange={(event) => setDirectSendDestination(event.target.value)}
            />
          </div>
          <div className="">
            <input
              className="input w-60"
              type="text"
              placeholder="Coins To Spend"
              value={directSendCoins}
              onChange={(event) => setDirectSendCoins(event.target.value)}
            />
          </div>
          <div className="">
            <input
              className="input w-40"
              type="text"
              placeholder="Fee Rate (optional)"
              value={directSendFeeRate}
              onChange={(event) => setDirectSendFeeRate(event.target.value)}
            />
          </div>

          <button
            className="btn"
            type="button"
            onClick={async () => {
              setIsLoading(true)
              directSend({
                sendAmount: Number(directSendAmount),
                destination: directSendDestination,
                coinsToSpend: directSendCoins,
                feeRate: directSendFeeRate,
              })
                .then((response) => {
                  console.log('response', response)
                  setResponse(response)
                  setDirectSendAmount('')
                  setDirectSendDestination('')
                  setDirectSendCoins('')
                  setIsLoading(false)
                })
                .catch((error) => {
                  console.error('error', error)
                  toast.error(error.message)
                  setResponse(error)
                  setIsLoading(false)
                })
            }}
          >
            Direct Send
          </button>
        </Section>

        {/* <div className="divider"></div> */}

        <Section>
          <div className="">
            <input
              className="input w-72"
              type="text"
              placeholder="Hashvalue"
              // value={coinswapAmount}
              // onChange={(event) => setCoinswapAmount(event.target.value)}
            />
          </div>

          <button
            className="btn"
            type="button"
            onClick={async () => {
              setIsLoading(true)
              runTaker({ sendAmount: Number(coinswapAmount) })
                .then((response) => {
                  console.log('response', response)
                  setResponse(response)
                  setIsLoading(false)
                })
                .catch((error) => {
                  console.error('error', error)
                  toast.error(error.message)
                  setResponse(error)
                  setIsLoading(false)
                })
            }}
          >
            Recover From Incomplete Coinswap
          </button>
        </Section>

        <div className="container mx-auto flex flex-col">
          {isLoading && <div>In Progress...</div>}

          {response && !isLoading && (
            <pre
              style={{
                color: response.status === 'success' ? 'inherit' : 'red',
                fontSize: '13px',
                textAlign: 'left',
              }}
            >
              {JSON.stringify(response, null, 2)}
            </pre>
          )}
        </div>
      </div>

      <Outlet />
    </>
  )
}

export default Main
