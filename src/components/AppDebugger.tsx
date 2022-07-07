import { useContext } from 'react'
import toast from 'react-hot-toast'
import styled from 'styled-components'

import { ThemeContext } from '~/context'
import { removeWalletFile } from '~/utils'

const Container = styled('div')`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
`

const Row = styled('div')`
  display: flex;
  grid-gap: 0.5rem;
`

const Button = styled('button')``

const AppDebugger = () => {
  const { setTheme } = useContext(ThemeContext)

  const handleDebug = async () => {
    setTheme('light')
  }

  const handleReset = async () => {
    try {
      await removeWalletFile()
      localStorage.clear()
      location.reload()
      toast.success('Wallet reset.')
    } catch (error) {
      toast.error(error as string)
    }
  }

  return (
    <Container>
      <Row>
        <Button
          className="btn btn-sm btn-outline btn-info"
          color="warning"
          // size="small"
          // variant="contained"
          onClick={handleDebug}
        >
          Debug
        </Button>
        <Button
          className="btn btn-sm btn-outline btn-error"
          color="error"
          // size="small"
          // variant="contained"
          onClick={handleReset}
        >
          Reset
        </Button>
      </Row>
    </Container>
  )
}

export default AppDebugger
