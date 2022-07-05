use serde::Serialize;
use std::path::PathBuf;
use std::str::FromStr;
use std::thread;
use teleport::fidelity_bonds::YearAndMonth;
use teleport::json;
use teleport::wallet_sync::{DisplayAddressType, WalletSyncAddressAmount};

const DEFAULT_WALLET_NAME: &str = "wallet";

#[derive(Serialize, Debug)]
#[serde(rename_all = "snake_case")]
pub enum ResponseType {
    Success,
    Error,
}

#[derive(Serialize, Debug)]
pub struct Response<Body> {
    status: ResponseType,
    #[serde(skip_serializing_if = "Option::is_none")]
    data: Option<Body>,
    #[serde(skip_serializing_if = "Option::is_none")]
    message: Option<String>,
}

#[tauri::command]
pub async fn generate_wallet(
    name: Option<String>,
    extension: Option<String>,
) -> Response<json::GenerateWalletResult> {
    let file_name = format!(
        "{}.teleport.json",
        name.unwrap_or(DEFAULT_WALLET_NAME.to_string())
    );
    let path = PathBuf::from_str(&file_name).unwrap();
    let extension = extension.unwrap_or(String::from(""));

    match teleport::generate_wallet(&path, Some(extension)) {
        Ok(wallet_info) => Response {
            status: ResponseType::Success,
            data: Some(wallet_info),
            message: None,
        },
        Err(error) => Response {
            status: ResponseType::Error,
            data: None,
            message: Some(error.to_string()),
        },
    }
}

#[tauri::command]
pub async fn recover_wallet(
    name: Option<String>,
    seed_phrase: String,
    extension: Option<String>,
) -> Response<json::RecoverWalletResult> {
    let file_name = format!(
        "{}.teleport.json",
        name.unwrap_or(DEFAULT_WALLET_NAME.to_string())
    );
    let path = PathBuf::from_str(&file_name).unwrap();

    match teleport::recover_wallet(&path, &seed_phrase, extension) {
        Ok(result) => Response {
            status: ResponseType::Success,
            data: Some(result),
            message: None,
        },
        Err(error) => Response {
            status: ResponseType::Error,
            data: None,
            message: Some(error.to_string()),
        },
    }
}

#[tauri::command]
pub async fn get_wallet_balance(name: Option<String>) -> Response<json::GetWalletBalanceResult> {
    let file_name = format!(
        "{}.teleport.json",
        name.unwrap_or(DEFAULT_WALLET_NAME.to_string())
    );
    let path = PathBuf::from_str(&file_name).unwrap();

    match teleport::get_wallet_balance(&path) {
        Ok(result) => Response {
            status: ResponseType::Success,
            data: Some(result),
            message: None,
        },
        Err(error) => Response {
            status: ResponseType::Error,
            data: None,
            message: Some(error.to_string()),
        },
    }
}

#[tauri::command]
pub async fn get_wallet_addresses(
    name: Option<String>,
    types: DisplayAddressType,
    network: Option<String>,
) -> Response<json::GetWalletAdressesResult> {
    let file_name = format!(
        "{}.teleport.json",
        name.unwrap_or(DEFAULT_WALLET_NAME.to_string())
    );
    let path = PathBuf::from_str(&file_name).unwrap();

    match teleport::get_wallet_addresses(&path, types, network) {
        Ok(result) => Response {
            status: ResponseType::Success,
            // TODO:
            // data: Some(result),
            data: None,
            message: None,
        },
        Err(error) => Response {
            status: ResponseType::Error,
            data: None,
            message: Some(error.to_string()),
        },
    }
}

#[tauri::command]
pub async fn get_receive_invoice(name: Option<String>) -> Response<json::GetReceiveInvoiceResult> {
    let file_name = format!(
        "{}.teleport.json",
        name.unwrap_or(DEFAULT_WALLET_NAME.to_string())
    );
    let path = PathBuf::from_str(&file_name).unwrap();

    match teleport::get_receive_invoice(&path) {
        Ok(result) => Response {
            status: ResponseType::Success,
            data: Some(result),
            message: None,
        },
        Err(error) => Response {
            status: ResponseType::Error,
            data: None,
            message: Some(error.to_string()),
        },
    }
}

#[tauri::command]
pub async fn get_fidelity_bond_address(
    name: Option<String>,
    locktime: String,
) -> Response<json::GetFidelityBondAddressResult> {
    let file_name = format!(
        "{}.teleport.json",
        name.unwrap_or(DEFAULT_WALLET_NAME.to_string())
    );
    let path = PathBuf::from_str(&file_name).unwrap();

    // TODO:
    let locktime = YearAndMonth::new(2030, 1);

    match teleport::get_fidelity_bond_address(&path, &locktime) {
        Ok(result) => Response {
            status: ResponseType::Success,
            data: Some(result),
            message: None,
        },
        Err(error) => Response {
            status: ResponseType::Error,
            data: None,
            message: Some(error.to_string()),
        },
    }
}

#[tauri::command]
pub async fn run_taker(
    name: Option<String>,
    send_amount: u64,
    fee_rate: Option<u64>,
    maker_count: Option<u16>,
    tx_count: Option<u32>,
) -> Response<()> {
    thread::spawn(move || {
        let file_name = format!(
            "{}.teleport.json",
            name.unwrap_or(DEFAULT_WALLET_NAME.to_string())
        );
        let path = PathBuf::from_str(&file_name).unwrap();

        match teleport::run_taker(
            &path,
            WalletSyncAddressAmount::Testing,
            fee_rate.unwrap_or(1000),
            send_amount,
            maker_count.unwrap_or(2),
            tx_count.unwrap_or(3),
        ) {
            Ok(result) => Response {
                status: ResponseType::Success,
                // TODO:
                // data: Some(result),
                data: None,
                message: None,
            },
            Err(error) => Response {
                status: ResponseType::Error,
                data: None,
                message: Some(error.to_string()),
            },
        }
    })
    .join()
    .expect("Thread panicked")
}

#[tauri::command]
pub async fn recover_from_incomplete_coinswap(arg1: String) {
    // teleport::recover_from_incomplete_coinswap()
    unimplemented!()
}

#[tauri::command]
pub async fn direct_send(arg1: String) {
    // teleport::direct_send()
    unimplemented!()
}