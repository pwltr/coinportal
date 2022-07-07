use serde::Serialize;
use std::fs;
use std::path::PathBuf;
use std::str::FromStr;
use std::thread;
use tauri::api::path::data_dir;
use teleport::fidelity_bonds::YearAndMonth;
use teleport::json;
use teleport::wallet_sync::{DisplayAddressType, WalletSyncAddressAmount};

const APP_NAME: &str = "coinportal";
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

fn create_wallet_path(name: Option<String>) -> PathBuf {
    let default_file_name = DEFAULT_WALLET_NAME.to_string();
    let file_name = format!("{}.teleport.json", name.unwrap_or(default_file_name));
    let data_dir = data_dir().unwrap();
    let app_data_path = format!("{}/{}", data_dir.to_string_lossy(), APP_NAME);
    let wallet_path = PathBuf::from_str(&format!("{}/{}", app_data_path, file_name)).unwrap();

    // Create App Data directory if it doesn't exist
    fs::create_dir_all(app_data_path).unwrap();

    wallet_path
}

#[tauri::command]
pub async fn generate_wallet(
    name: Option<String>,
    extension: Option<String>,
) -> Response<json::GenerateWalletResult> {
    let wallet_path = create_wallet_path(name);
    let extension = extension.unwrap_or(String::from(""));

    match teleport::generate_wallet(&wallet_path, Some(extension)) {
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
    let wallet_path = create_wallet_path(name);

    match teleport::recover_wallet(&wallet_path, &seed_phrase, extension) {
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
    let wallet_path = create_wallet_path(name);

    match teleport::get_wallet_balance(&wallet_path) {
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
    network: Option<String>,
) -> Response<json::GetWalletAdressesResult> {
    let wallet_path = create_wallet_path(name);

    match teleport::get_wallet_addresses(&wallet_path, DisplayAddressType::All, network) {
        Ok(()) => Response {
            status: ResponseType::Success,
            // TODO: do we have something to return here?
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
    let wallet_path = create_wallet_path(name);

    match teleport::get_receive_invoice(&wallet_path) {
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
    let wallet_path = create_wallet_path(name);
    // TODO:
    let locktime = YearAndMonth::new(2030, 1);

    match teleport::get_fidelity_bond_address(&wallet_path, &locktime) {
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
        let wallet_path = create_wallet_path(name);

        match teleport::run_taker(
            &wallet_path,
            WalletSyncAddressAmount::Testing,
            fee_rate.unwrap_or(1000),
            send_amount,
            maker_count.unwrap_or(2),
            tx_count.unwrap_or(3),
        ) {
            Ok(()) => Response {
                status: ResponseType::Success,
                // TODO: return something here?
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
pub async fn recover_from_incomplete_coinswap(name: Option<String>) {
    let wallet_path = create_wallet_path(name);

    // teleport::recover_from_incomplete_coinswap()
    unimplemented!()
}

#[tauri::command]
pub async fn direct_send(name: Option<String>) {
    let wallet_path = create_wallet_path(name);

    // teleport::direct_send()
    unimplemented!()
}
