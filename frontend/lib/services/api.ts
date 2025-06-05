/**
 * Service để kết nối với Backend API và lấy dữ liệu từ business logic
 */

const BACKEND_API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'http://localhost:3003';

/**
 * Lấy danh sách các ví đáng tin cậy để copy trade
 */
export async function getTrustedWallets(limit: number = 10): Promise<any[]> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/wallets/trusted?limit=${limit}`);
    if (!response.ok) {
      throw new Error('Không thể lấy danh sách ví đáng tin cậy');
    }
    const data = await response.json();
    
    // Check if data has an isRealData field
    const isRealData = data.isRealData !== undefined ? data.isRealData : false;
    
    // Format the result
    const result = Array.isArray(data.wallets) ? data.wallets : (Array.isArray(data) ? data : []);
    
    // Add isRealData flag if not present
    return result.map((wallet: any) => ({
      ...wallet,
      isRealData: wallet.isRealData !== undefined ? wallet.isRealData : isRealData
    }));
  } catch (error) {
    console.error('Lỗi khi lấy danh sách ví đáng tin cậy:', error);
    return [];
  }
}

/**
 * Lấy danh sách các ví đang theo dõi
 */
export async function getFollowedWallets(): Promise<any[]> {
  try {
    // Đọc danh sách từ localStorage
    if (typeof window !== 'undefined') {
      const followedWallets = localStorage.getItem('followedWallets');
      if (followedWallets) {
        return JSON.parse(followedWallets);
      }
    }
    return [];
  } catch (error) {
    console.error('Lỗi khi lấy danh sách ví đang theo dõi:', error);
    return [];
  }
}

/**
 * Thêm một ví vào danh sách theo dõi
 */
export async function followWallet(wallet: any): Promise<boolean> {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    
    // Lấy danh sách đang theo dõi hiện tại
    const followedWallets = JSON.parse(localStorage.getItem('followedWallets') || '[]');
    
    // Kiểm tra xem ví đã được theo dõi chưa
    if (followedWallets.find((w: any) => w.address === wallet.address)) {
      return true; // Đã theo dõi rồi
    }
    
    // Thêm ví vào danh sách
    followedWallets.push(wallet);
    localStorage.setItem('followedWallets', JSON.stringify(followedWallets));
    
    return true;
  } catch (error) {
    console.error('Lỗi khi thêm ví vào danh sách theo dõi:', error);
    return false;
  }
}

/**
 * Xóa một ví khỏi danh sách theo dõi
 */
export async function unfollowWallet(address: string): Promise<boolean> {
  try {
    if (typeof window === 'undefined') {
      return false;
    }
    
    // Lấy danh sách đang theo dõi hiện tại
    const followedWallets = JSON.parse(localStorage.getItem('followedWallets') || '[]');
    
    // Lọc ra các ví không cùng địa chỉ
    const newFollowedWallets = followedWallets.filter((w: any) => w.address !== address);
    
    // Lưu lại danh sách mới
    localStorage.setItem('followedWallets', JSON.stringify(newFollowedWallets));
    
    return true;
  } catch (error) {
    console.error('Lỗi khi xóa ví khỏi danh sách theo dõi:', error);
    return false;
  }
}

/**
 * Lấy thông tin chi tiết của một ví
 */
export async function getWalletDetails(address: string): Promise<any> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/wallets/${address}`);
    if (!response.ok) {
      throw new Error(`Không thể lấy chi tiết ví ${address}`);
    }
    const data = await response.json();
    
    return {
      ...data,
      isRealData: data.isRealData !== undefined ? data.isRealData : false
    };
  } catch (error) {
    console.error(`Lỗi khi lấy chi tiết ví ${address}:`, error);
    return null;
  }
}

/**
 * Lấy điểm số trust của một ví
 */
export async function getWalletTrustScore(address: string): Promise<number> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/wallets/${address}/trust-score`);
    if (!response.ok) {
      throw new Error(`Không thể lấy điểm tin cậy của ví ${address}`);
    }
    const data = await response.json();
    
    return data.score || 0;
  } catch (error) {
    console.error(`Lỗi khi lấy điểm tin cậy của ví ${address}:`, error);
    return 0;
  }
}

/**
 * Lấy thông tin hoạt động gần đây của một ví
 */
export async function getWalletActivity(address: string): Promise<any[]> {
  try {
    const response = await fetch(`${BACKEND_API_URL}/api/wallets/${address}/activity`);
    if (!response.ok) {
      throw new Error(`Không thể lấy thông tin hoạt động của ví ${address}`);
    }
    const data = await response.json();
    
    return Array.isArray(data) ? data : (Array.isArray(data.activity) ? data.activity : []);
  } catch (error) {
    console.error(`Lỗi khi lấy thông tin hoạt động của ví ${address}:`, error);
    return [];
  }
}
