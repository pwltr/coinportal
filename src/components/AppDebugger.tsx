import { removeFile } from '@tauri-apps/api/fs'
import styled from 'styled-components'

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
  // const handleGetStatus = async () => {
  //   try {
  //     const status = await vault.getStatus()
  //     console.log('status', status)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  // const handleGetVault = async () => {
  //   try {
  //     const currentVault = await vault.getVault()
  //     console.log('currentVault', currentVault)
  //   } catch (err) {
  //     console.error(err)
  //   }
  // }

  const handleReset = async () => {
    await removeFile('./wallet.teleport')
    localStorage.clear()
  }

  const handleDebug = async () => {
    try {
      // await checkUpdate()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Container>
      <Row>
        {/* <Button size="small" variant="contained" onClick={handleGetStatus}>
          Status
        </Button>
        <Button size="small" variant="contained" onClick={handleGetVault}>
          Value
        </Button> */}
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
