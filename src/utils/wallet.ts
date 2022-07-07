import { dataDir } from '@tauri-apps/api/path'
import { readTextFile, removeFile, Dir } from '@tauri-apps/api/fs'

const appName = 'coinportal'
const dataDirectory = `${await dataDir()}${appName}`
const walletName = 'wallet.teleport.json'
const walletPath = `${dataDirectory}/${walletName}`

export const readWalletFile = () => {
  return readTextFile(walletPath)
}

export const removeWalletFile = () => {
  return removeFile(`${appName}/${walletName}`, { dir: Dir.Data })
}
