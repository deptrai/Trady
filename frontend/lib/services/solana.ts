/**
 * Service để kết nối trực tiếp với Solana RPC
 */

const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com';

/**
 * Hàm helper để gọi Solana RPC
 */
async function callRPC(method: string, params: any[] = []): Promise<any> {
  try {
    const response = await fetch(SOLANA_RPC_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'dapp-' + Math.random().toString(36).substring(2, 15),
        method,
        params,
      }),
    });

    if (!response.ok) {
      throw new Error(`Lỗi kết nối Solana RPC: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.error) {
      throw new Error(`Solana RPC trả về lỗi: ${JSON.stringify(data.error)}`);
    }

    return data.result;
  } catch (error) {
    console.error(`Lỗi khi gọi Solana RPC method ${method}:`, error);
    throw error;
  }
}

/**
 * Lấy balance của địa chỉ ví
 */
export async function getBalance(address: string): Promise<number> {
  try {
    const result = await callRPC('getBalance', [address]);
    return result.value / 1e9; // Convert lamports to SOL
  } catch (error) {
    console.error(`Lỗi khi lấy số dư của địa chỉ ${address}:`, error);
    return 0;
  }
}

/**
 * Lấy thông tin của một tài khoản
 */
export async function getAccountInfo(address: string): Promise<any> {
  try {
    return await callRPC('getAccountInfo', [address, {encoding: 'jsonParsed'}]);
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin tài khoản ${address}:`, error);
    return null;
  }
}

/**
 * Lấy giá trị token của một tài khoản
 */
export async function getTokenAccountsByOwner(address: string): Promise<any[]> {
  try {
    const result = await callRPC('getTokenAccountsByOwner', [
      address,
      { programId: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA' },
      { encoding: 'jsonParsed' }
    ]);
    return result.value || [];
  } catch (error) {
    console.error(`Lỗi khi lấy token accounts của địa chỉ ${address}:`, error);
    return [];
  }
}

/**
 * Lấy thông tin giao dịch
 */
export async function getTransaction(signature: string): Promise<any> {
  try {
    return await callRPC('getTransaction', [signature, 'json']);
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin giao dịch ${signature}:`, error);
    return null;
  }
}

/**
 * Lấy các giao dịch gần đây của một địa chỉ
 */
export async function getSignaturesForAddress(address: string, limit: number = 10): Promise<any[]> {
  try {
    return await callRPC('getSignaturesForAddress', [address, { limit }]);
  } catch (error) {
    console.error(`Lỗi khi lấy các giao dịch gần đây của địa chỉ ${address}:`, error);
    return [];
  }
}
