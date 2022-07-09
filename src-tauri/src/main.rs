#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;

#[cfg(target_os = "macos")]
mod menu;

fn main() {
    let context = tauri::generate_context!();
    let builder = tauri::Builder::default().invoke_handler(tauri::generate_handler![
        commands::generate_wallet,
        commands::recover_wallet,
        commands::get_wallet_balance,
        commands::get_wallet_addresses,
        commands::get_receive_invoice,
        commands::get_fidelity_bond_address,
        commands::get_offers,
        commands::run_taker,
        commands::recover_from_incomplete_coinswap,
        commands::direct_send,
    ]);

    // Needed on macOS to enable basic operations, like copy & paste and select-all via keyboard shortcuts.
    #[cfg(target_os = "macos")]
    let builder = builder.menu(menu::menu());

    builder
        .run(context)
        .expect("error while running application");
}
