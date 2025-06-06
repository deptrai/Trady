# Wallet Menu Features

Your wallet menu is available in the top-right corner of the app. From here, you can:
- View Wallet Address: See your public key
- Export Wallet: Download a JSON file or copy your private key manually
- Lock Wallet: Ends session and hides wallet from view until re-authenticated
- Reset Wallet: Deletes your current wallet from storage and allows you to create a new one
- Session Timeout: Enable or disable auto-lock after 15 minutes of inactivity

This gives users full control without ever needing to "connect" or authorize anything.

### Exporting & Importing Wallets
Chain Lens wallets are fully compatible with Phantom and other Solana wallets.

#### To Export:
1. Click "Export Wallet"
2. Choose:
   - Copy Private Key
   - Download JSON File (compatible with Phantom import)
3. Save securely (preferably offline)

#### To Import (into Phantom):
1. Open Phantom
2. Select "Import Wallet"
3. Paste your Chain Lens private key
4. You now have access to the same wallet via Phantom or any other Solana interface

This is ideal for users who want to use their wallet outside of Chain Lens or restore it later on another device.

### Resetting Your Wallet
If you want to wipe your session or start fresh:
1. Click "Reset Wallet"
2. You'll be prompted to confirm the action
3. Your local wallet data will be deleted
4. You'll return to the "Create Wallet" screen

This is especially useful for:
- Shared devices
- Testing
- Rotating wallets for fresh identity

⚠️ Reminder: If you haven't exported your private key before resetting, you will lose access to your funds.

### Auto-Lock & Session Security
By default, Chain Lens locks your wallet session after 15 minutes of inactivity.

When this happens:
- The UI is blurred
- Your wallet is temporarily hidden
- You must re-authenticate (or unlock with a PIN, coming soon)

You can customize the timeout interval (5m, 15m, 30m, Never), depending on your preference.

This feature helps prevent unwanted access on shared or unattended devices.
