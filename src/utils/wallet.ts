import { dataDir } from '@tauri-apps/api/path'
import { readTextFile, removeFile, Dir } from '@tauri-apps/api/fs'

const appName = 'coinportal'
const walletName = 'wallet.teleport.json'

export const readWalletFile = async () => {
  const dataDirectory = `${await dataDir()}${appName}`
  const walletPath = `${dataDirectory}/${walletName}`

  return readTextFile(walletPath)
}

export const removeWalletFile = () => {
  return removeFile(`${appName}/${walletName}`, { dir: Dir.Data })
}
