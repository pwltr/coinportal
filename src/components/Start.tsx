import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

import { generateWallet, recoverWallet } from '~/utils'
import logo from '../logo.svg'

type Response<Body> = {
  status: 'success' | 'error'
  data?: Body | null
  message?: string
}

function Start() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [seedPhrase, setSeedPhrase] = useState('')
  const [extension, setExtension] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  // TEMP: just debugging
  const [response, setResponse] = useState<Response<unknown> | null>(null)

  return (
    <>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        {isLoading ? <h1>Generating wallet...</h1> : <h1>CoinPortal</h1>}

        <div className="container mx-auto flex flex-col">
          <div className="flex my-4 justify-center">
            <div className="">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  setIsLoading(true)
                  generateWallet({ extension })
                    .then((response) => {
                      console.log('response', response)
                      setResponse(response)
                      setIsLoading(false)
                      navigate('/')
                    })
                    .catch((error) => {
                      console.error('error', error)
                      toast.error(error.message)
                      setResponse(error)
                      setIsLoading(false)
                    })
                }}
              >
                {t('start.generateWallet')}
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
                  recoverWallet({
                    seedPhrase,
                    extension,
                  })
                    .then((response) => {
                      console.log('response', response)
                      setResponse(response)
                      setIsLoading(false)
                      navigate('/')
                    })
                    .catch((error) => {
                      console.error('error', error)
                      toast.error(error.message)
                      setResponse(error)
                      setIsLoading(false)
                    })
                }}
              >
                Recover Wallet
              </button>
            </div>
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
    </>
  )
}

export default Start
