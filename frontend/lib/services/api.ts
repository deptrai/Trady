"use client";

/**
 * Service để kết nối với Backend API và lấy dữ liệu từ business logic
 */

// API Base URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Generic fetch function
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

// Block API
export async function getBlocks(page = 1, limit = 10) {
  return fetchApi<{
    blocks: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
    };
  }>(`/blocks?page=${page}&limit=${limit}`);
}

export async function getBlock(blockNumberOrHash: string) {
  return fetchApi<any>(`/block/${blockNumberOrHash}`);
}

// Transaction API
export async function getTransactions(page = 1, limit = 10, filters?: Record<string, string>) {
  let queryParams = `page=${page}&limit=${limit}`;
  
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        queryParams += `&${key}=${value}`;
      }
    });
  }
  
  return fetchApi<{
    transactions: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
    };
  }>(`/transactions?${queryParams}`);
}

export async function getTransaction(hash: string) {
  return fetchApi<any>(`/tx/${hash}`);
}

// Address API
export async function getAddress(address: string) {
  return fetchApi<any>(`/address/${address}`);
}

export async function getAddressTransactions(address: string, page = 1, limit = 10) {
  return fetchApi<{
    transactions: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
    };
  }>(`/address/${address}/transactions?page=${page}&limit=${limit}`);
}

// Token API
export async function getTokens(page = 1, limit = 10) {
  return fetchApi<{
    tokens: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
    };
  }>(`/tokens?page=${page}&limit=${limit}`);
}

export async function getToken(address: string) {
  return fetchApi<any>(`/token/${address}`);
}

export async function getTokenTransfers(address: string, page = 1, limit = 10) {
  return fetchApi<{
    transfers: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
    };
  }>(`/token/${address}/transfers?page=${page}&limit=${limit}`);
}

// NFT API
export async function getNfts(page = 1, limit = 10) {
  return fetchApi<{
    nfts: any[];
    pagination: {
      total: number;
      page: number;
      limit: number;
    };
  }>(`/nfts?page=${page}&limit=${limit}`);
}

export async function getNft(address: string, tokenId: string) {
  return fetchApi<any>(`/nft/${address}/${tokenId}`);
}

// Search API
export async function search(query: string) {
  return fetchApi<{
    type: string;
    result: any;
  }>(`/search?q=${encodeURIComponent(query)}`);
}

// Stats API
export async function getStats() {
  return fetchApi<{
    latestBlock: number;
    totalTransactions: string;
    averageBlockTime: string;
    averageGasPrice: string;
  }>('/stats');
}

// Wallet API
export async function getTrustedWallets() {
  try {
    // Trong môi trường thực tế, đây sẽ là một API call
    // return fetchApi<any[]>('/wallets/trusted');
    
    // Dữ liệu mẫu
    return [
      { address: "0xAb3...c7F", performance: 142.5, followerCount: 1243, tradeCount: 87, winRate: 78, riskLevel: "Low", isRealData: false },
      { address: "0xDe7...f9B", performance: 87.3, followerCount: 876, tradeCount: 124, winRate: 72, riskLevel: "Medium", isRealData: false },
      { address: "0x58F...e2A", performance: 65.8, followerCount: 512, tradeCount: 56, winRate: 82, riskLevel: "Low", isRealData: false },
      { address: "0x91C...j7Y", performance: 52.1, followerCount: 378, tradeCount: 68, winRate: 75, riskLevel: "Low", isRealData: false },
      { address: "0xF3P...s9W", performance: 48.7, followerCount: 256, tradeCount: 92, winRate: 70, riskLevel: "Medium", isRealData: false },
      { address: "0xK7L...r2P", performance: 43.2, followerCount: 187, tradeCount: 45, winRate: 80, riskLevel: "Low", isRealData: false },
    ];
  } catch (error) {
    console.error('Error fetching trusted wallets:', error);
    return [];
  }
}

export async function getFollowedWallets() {
  try {
    // Trong môi trường thực tế, đây sẽ là một API call
    // return fetchApi<any[]>('/wallets/followed');
    
    // Lấy từ localStorage trong môi trường client
    if (typeof window !== 'undefined') {
      const followed = localStorage.getItem('followedWallets');
      return followed ? JSON.parse(followed) : [];
    }
    return [];
  } catch (error) {
    console.error('Error fetching followed wallets:', error);
    return [];
  }
}

export async function followWallet(wallet: any) {
  try {
    // Trong môi trường thực tế, đây sẽ là một API call
    // return fetchApi<boolean>('/wallets/follow', {
    //   method: 'POST',
    //   body: JSON.stringify({ address: wallet.address }),
    // });
    
    // Lưu vào localStorage trong môi trường client
    if (typeof window !== 'undefined') {
      const followed = localStorage.getItem('followedWallets');
      const wallets = followed ? JSON.parse(followed) : [];
      if (!wallets.some((w: any) => w.address === wallet.address)) {
        wallets.push(wallet);
        localStorage.setItem('followedWallets', JSON.stringify(wallets));
      }
    }
    return true;
  } catch (error) {
    console.error('Error following wallet:', error);
    return false;
  }
}

export async function unfollowWallet(address: string) {
  try {
    // Trong môi trường thực tế, đây sẽ là một API call
    // return fetchApi<boolean>('/wallets/unfollow', {
    //   method: 'POST',
    //   body: JSON.stringify({ address }),
    // });
    
    // Xóa khỏi localStorage trong môi trường client
    if (typeof window !== 'undefined') {
      const followed = localStorage.getItem('followedWallets');
      if (followed) {
        const wallets = JSON.parse(followed);
        const updatedWallets = wallets.filter((w: any) => w.address !== address);
        localStorage.setItem('followedWallets', JSON.stringify(updatedWallets));
      }
    }
    return true;
  } catch (error) {
    console.error('Error unfollowing wallet:', error);
    return false;
  }
}

export default {
  getBlocks,
  getBlock,
  getTransactions,
  getTransaction,
  getAddress,
  getAddressTransactions,
  getTokens,
  getToken,
  getTokenTransfers,
  getNfts,
  getNft,
  search,
  getStats,
  getTrustedWallets,
  getFollowedWallets,
  followWallet,
  unfollowWallet,
};
