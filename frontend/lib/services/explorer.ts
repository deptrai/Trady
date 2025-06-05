/**
 * Service để kết nối với Backend Explorer và lấy dữ liệu blockchain thật
 */

const BACKEND_EXPLORER_URL = process.env.NEXT_PUBLIC_BACKEND_EXPLORER_URL || 'http://localhost:3004';

/**
 * Lấy thông tin về giá SOL hiện tại
 */
export async function getSolPrice(): Promise<number> {
  try {
    const response = await fetch(`${BACKEND_EXPLORER_URL}/api/sol-price`);
    if (!response.ok) {
      throw new Error('Không thể lấy giá SOL');
    }
    const data = await response.json();
    return data.price;
  } catch (error) {
    console.error('Lỗi khi lấy giá SOL:', error);
    return 0; // Giá trị mặc định khi có lỗi
  }
}

/**
 * Lấy thông tin về epoch hiện tại của Solana
 */
export async function getEpochInfo(): Promise<{
  epoch: number;
  slotIndex: number;
  slotsInEpoch: number;
  isRealData: boolean;
}> {
  try {
    const response = await fetch(`${BACKEND_EXPLORER_URL}/api/epoch-info`);
    if (!response.ok) {
      throw new Error('Không thể lấy thông tin epoch');
    }
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi lấy thông tin epoch:', error);
    return { epoch: 0, slotIndex: 0, slotsInEpoch: 0, isRealData: false };
  }
}

/**
 * Lấy thông tin về supply của SOL
 */
export async function getSupplyInfo(): Promise<{
  total: number;
  circulating: number;
  isRealData: boolean;
}> {
  try {
    const response = await fetch(`${BACKEND_EXPLORER_URL}/api/supply-info`);
    if (!response.ok) {
      throw new Error('Không thể lấy thông tin supply');
    }
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi lấy thông tin supply:', error);
    return { total: 0, circulating: 0, isRealData: false };
  }
}

/**
 * Lấy danh sách các giao dịch gần đây
 */
export async function getRecentTransactions(limit: number = 10): Promise<any[]> {
  try {
    const response = await fetch(`${BACKEND_EXPLORER_URL}/api/recent-transactions?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Không thể lấy các giao dịch gần đây');
    }
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi lấy các giao dịch gần đây:', error);
    return [];
  }
}

/**
 * Lấy thông tin chi tiết về một giao dịch
 */
export async function getTransactionDetails(signature: string): Promise<any> {
  try {
    const response = await fetch(`${BACKEND_EXPLORER_URL}/api/transaction/${signature}`);
    if (!response.ok) {
      throw new Error(`Không thể lấy thông tin giao dịch ${signature}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin giao dịch ${signature}:`, error);
    return null;
  }
}

/**
 * Lấy thông tin về các token đang trending
 */
export async function getTrendingTokens(timeframe: '1h' | '24h' | '7d' = '24h', limit: number = 10): Promise<any[]> {
  try {
    const response = await fetch(`${BACKEND_EXPLORER_URL}/api/trending-tokens?timeframe=${timeframe}&limit=${limit}`);
    if (!response.ok) {
      throw new Error('Không thể lấy thông tin token trending');
    }
    return await response.json();
  } catch (error) {
    console.error('Lỗi khi lấy thông tin token trending:', error);
    return [];
  }
}

/**
 * Tìm kiếm dựa trên query (address, transaction signature, v.v.)
 */
export async function search(query: string): Promise<any> {
  try {
    const response = await fetch(`${BACKEND_EXPLORER_URL}/api/search?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error(`Không thể tìm kiếm với query ${query}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Lỗi khi tìm kiếm với query ${query}:`, error);
    return { type: 'unknown', data: null };
  }
}
