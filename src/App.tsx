import { useState } from 'react'
import { invoke } from '@tauri-apps/api'

import AppDebugger from '~/components/AppDebugger'
import logo from './logo.svg'
import './App.css'

type Response<Body> = {
  status: 'success' | 'error'
  data?: Body
  message?: string
}

function App() {
  const [name, setName] = useState(null)
  const [seedPhrase, setSeedPhrase] = useState('')
  const [extension, setExtension] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // TEMP: just debugging
  const [response, setResponse] = useState<Response<any> | null>(null)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {isLoading ? <h1>Loading...</h1> : <h1>CoinPortal</h1>}

        <div className="container mx-auto flex flex-col">
          <div className="flex my-4 justify-center">
            {/* <div className="">
              <input
                className="input"
                type="text"
                placeholder="Wallet name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div> */}
            <div className="">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setIsLoading(true)
                  invoke<Response<any>>('generate_wallet', {
                    name,
                    extension,
                  }).then((response) => {
                    console.log(response)
                    setResponse(response)
                    setIsLoading(false)
                  })
                }}
              >
                Generate Wallet
              </button>
            </div>
          </div>

          <div className="divider">OR</div>

          <div className="flex flex-col align-center my-4">
            <div className="">
              <textarea
                className="textarea h-24 resize-none"
                placeholder="Mnenomic seed phrase"
                cols={40}
                rows={10}
                value={seedPhrase}
                onChange={(event) => setSeedPhrase(event.target.value)}
              />
            </div>
            <div className="">
              <input
                className="input w-72"
                type="text"
                placeholder="Seed phrase extension (optional)"
                value={extension}
                onChange={(event) => setExtension(event.target.value)}
              />
            </div>
            <div className="my-4">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setIsLoading(true)
                  invoke<Response<any>>('recover_wallet', {
                    name,
                    seedPhrase,
                    extension,
                  }).then((response) => {
                    console.log(response)
                    setResponse(response)
                    setIsLoading(false)
                  })
                }}
              >
                Recover Wallet
              </button>
            </div>
          </div>

          <div className="flex my-4 justify-center">
            <button
              className="btn"
              type="button"
              onClick={async () => {
                setIsLoading(true)
                invoke<Response<any>>('get_wallet_balance', { name }).then((response) => {
                  console.log(response)
                  setResponse(response)
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
                invoke<Response<any>>('get_receive_invoice', { name }).then((response) => {
                  console.log(response)
                  setResponse(response)
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
                invoke<Response<any>>('get_fidelity_bond_address', {
                  name,
                  locktime: '2022-12',
                }).then((response) => {
                  console.log(response)
                  setResponse(response)
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
                invoke<Response<any>>('run_taker', { name, sendAmount: 100000000 }).then(
                  (response) => {
                    console.log(response)
                    setResponse(response)
                    setIsLoading(false)
                  },
                )
              }}
            >
              Do Coinswap
            </button>
          </div>

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

      {import.meta.env.DEV && <AppDebugger />}
    </div>
  )
}

export default App
