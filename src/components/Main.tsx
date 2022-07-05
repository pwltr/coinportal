import { useState, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import toast from 'react-hot-toast'
import { readTextFile } from '@tauri-apps/api/fs'
import { clipboard } from '@tauri-apps/api'
import styled from 'styled-components'

import { getWalletBalance, getReceiveInvoice, getFidelityBondAddress, runTaker } from '~/utils'
import logo from '../logo.svg'

type Response<Body> = {
  status: 'success' | 'error'
  data?: Body | null
  message?: string
}

const Buttons = styled('div')`
  display: flex;
  justify-content: center;
  grid-gap: 0.5rem;
  margin: 2rem 0 1rem;
`

function Main() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)
  // TEMP: just debugging
  const [response, setResponse] = useState<Response<unknown> | null>(null)

  useEffect(() => {
    const checkForWallet = async () => {
      try {
        await readTextFile('./wallet.teleport.json')
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

        {isLoading ? <h1>Loading...</h1> : <h1>CoinPortal</h1>}

        <div className="container mx-auto flex flex-col">
          <Buttons>
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
                getReceiveInvoice()
                  .then((response) => {
                    console.log('response', response)
                    clipboard.writeText(String(response.data?.address))
                    toast.success(`Address ${t('toasts.copied')}`, {
                      id: 'clipboard',
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
                getFidelityBondAddress({
                  locktime: '2022-12',
                })
                  .then((response) => {
                    console.log('response', response)
                    clipboard.writeText(String(response.data?.address))
                    toast.success(`Address ${t('toasts.copied')}`, {
                      id: 'clipboard',
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
              Get Fidelity Bond Address
            </button>

            <button
              className="btn"
              type="button"
              onClick={async () => {
                setIsLoading(true)
                runTaker({ sendAmount: 100000000 })
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
              Do Coinswap
            </button>
          </Buttons>

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
      </header>

      <Outlet />
    </>
  )
}

export default Main
