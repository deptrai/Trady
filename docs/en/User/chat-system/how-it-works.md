# How It Works

The Chain Lens chat system is built using Supabase Realtime (or socket.io), integrated directly into the token page.

Whenever a user clicks on a token to view its data or perform a swap, they also gain access to that token's live chatroom. No additional login is required. The chat is tied to the user's in-browser Chain Lens wallet.

Here's what happens:
- You open a token
- The token's chart, swap interface, and chat appear side-by-side
- You can send and receive messages instantly
- Messages are timestamped and tagged by wallet (partial ID shown)
- Whale alerts, rug flags, and system messages are injected into the feed
- You can react to messages using emojis or flags

Everything is self-contained. You never need to switch tabs or open Discord — the social layer is native.
