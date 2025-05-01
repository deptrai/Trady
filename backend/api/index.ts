/**
 * Trady Public API
 * Base URL: https://api.trady.so
 * Version: v1
 *
 * This API powers various public and partner integrations including:
 * - Copy trading statistics
 * - Wallet trust metrics
 * - Token radar signals
 * - Explorer metadata
 */

import express from 'express';
const app = express();

app.use(express.json());

// Health check
app.get('/v1/health', (req, res) => {
  res.json({ status: 'ok', timestamp: Date.now() });
});

// Wallet trust score
app.get('/v1/wallet/:address/trust-score', (req, res) => {
  const { address } = req.params;
  res.json({
    wallet: address,
    trustScore: 82,
    badges: ['High Win Rate', 'Alpha Source'],
    lastUpdated: new Date().toISOString()
  });
});

// Token radar score
app.get('/v1/token/:mint/radar', (req, res) => {
  const { mint } = req.params;
  res.json({
    token: mint,
    radarScore: 76,
    tags: ['Momentum', 'Whale Entry'],
    lastSpike: '2024-04-28T14:02:00Z'
  });
});

// Copy volume for a wallet
app.get('/v1/wallet/:address/copy-volume', (req, res) => {
  const { address } = req.params;
  res.json({
    wallet: address,
    copiedBy: 47,
    last24hVolume: 13120,
    lastCopied: '2024-04-29T08:12:00Z'
  });
});

// Token chat metadata
app.get('/v1/token/:mint/chat-stats', (req, res) => {
  const { mint } = req.params;
  res.json({
    token: mint,
    activeUsers: 12,
    mentionCount: 93,
    topWords: ['pump', 'early', 'copy'],
    updated: new Date().toISOString()
  });
});

// Default route
app.get('/', (req, res) => {
  res.send('Welcome to Trady API. See /v1/ endpoints.');
});

export default app;
