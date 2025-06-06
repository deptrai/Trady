# Hướng dẫn Cài đặt và Khởi chạy Dự án Chain Lens (Local Development)

Tài liệu này hướng dẫn cách cài đặt môi trường và khởi chạy các thành phần của dự án Chain Lens trên máy local để phát triển.

## 1. Yêu cầu Chung (Prerequisites)

*   **Node.js**: Phiên bản LTS mới nhất (ví dụ: v18.x hoặc v20.x). Bạn có thể tải từ [nodejs.org](https://nodejs.org/).
*   **pnpm**: Trình quản lý gói. Cài đặt sau khi có Node.js bằng lệnh:
    ```bash
    npm install -g pnpm
    ```
*   **Git**: Hệ thống quản lý phiên bản. Tải từ [git-scm.com](https://git-scm.com/).

## 2. Clone Dự án (Clone Project)

Mở terminal hoặc command prompt và chạy lệnh sau:

```bash
git clone <URL_REPOSITORY_CUA_BAN> Chain Lens
cd Chain Lens
```

Thay thế `<URL_REPOSITORY_CUA_BAN>` bằng URL Git repository của dự án Chain Lens.

## 3. Cấu hình Biến Môi trường (Environment Variables)

Dự án sử dụng một tệp `.env.example` ở thư mục gốc, chủ yếu cho các API key của các mô hình AI. Nếu bạn cần sử dụng các tính năng liên quan đến AI, hãy sao chép tệp này thành `.env` và điền các API key tương ứng:

```bash
cp .env.example .env
```

Sau đó, mở tệp `.env` và cập nhật các giá trị.

**Lưu ý quan trọng**:
*   Hiện tại, không có tệp `.env.example` riêng cho `frontend` hoặc `backend/explorer`.
*   Các cấu hình quan trọng như Supabase URL/Key, Jupiter API endpoint có thể được hardcode, truyền vào lúc build/deploy (ví dụ qua Vercel environment variables), hoặc có giá trị mặc định cho môi trường development. Kiểm tra mã nguồn hoặc cấu hình Vercel (nếu có quyền truy cập) để biết thêm chi tiết nếu gặp lỗi kết nối.

## 4. Cài đặt và Chạy Frontend

Frontend của Chain Lens là một ứng dụng Next.js.

1.  **Đi đến thư mục frontend:**
    ```bash
    cd frontend
    ```

2.  **Cài đặt dependencies:**
    ```bash
    pnpm install
    ```

3.  **Chạy ứng dụng frontend ở chế độ development:**
    Lệnh `dev` trong `frontend/package.json` là `"madridy"`. Đây có thể là một script tùy chỉnh.
    ```bash
    pnpm run dev
    ```
    Nếu lệnh `madridy` không hoạt động hoặc gây lỗi, hãy thử lệnh Next.js tiêu chuẩn (dựa trên `README.md` gốc trước khi có `pnpm-lock.yaml` và script `madridy`):
    ```bash
    # pnpm next dev # Thử lệnh này nếu "pnpm run dev" (với madridy) không hoạt động
    ```
    Ứng dụng frontend thường sẽ chạy tại `http://localhost:3000`.

## 5. Cài đặt và Chạy Backend Explorer

Backend Explorer cũng là một ứng dụng Next.js.

1.  **Đi đến thư mục backend/explorer (từ thư mục gốc của dự án):**
    ```bash
    cd backend/explorer
    ```
    Nếu bạn đang ở thư mục `frontend`, bạn có thể dùng: `cd ../backend/explorer`

2.  **Cài đặt dependencies:**
    ```bash
    pnpm install
    ```

3.  **Chạy ứng dụng backend explorer ở chế độ development:**
    ```bash
    pnpm run dev
    ```
    Ứng dụng này có thể sẽ chạy trên một port khác, ví dụ `http://localhost:3001` (kiểm tra output của terminal để biết port chính xác).

## 6. Backend API (`backend/api`)

Thư mục `backend/api` chứa một tệp `index.ts` sử dụng Express.js.
*   Hiện tại, không có `package.json` riêng cho `backend/api`. Điều này có nghĩa là nó có thể:
    *   Không cần chạy độc lập cho các tính năng cơ bản của Chain Lens local.
    *   Được import và sử dụng bởi một phần khác của dự án (ví dụ: `backend/explorer`).
    *   Được thiết kế để deploy dưới dạng serverless function.
*   Nếu bạn cần chạy API này độc lập (ví dụ, để test các endpoint của nó), bạn có thể cần cài đặt `express` và `typescript` global hoặc trong một project Node.js tạm thời, sau đó chạy bằng `ts-node backend/api/index.ts`. Tuy nhiên, điều này nằm ngoài quy trình cài đặt cơ bản.

## 7. Các Lệnh Hữu ích Khác

Trong các thư mục `frontend` và `backend/explorer`, bạn có thể sử dụng các lệnh sau (qua `pnpm`):

*   **Build dự án cho production:**
    ```bash
    pnpm run build
    ```
*   **Chạy dự án đã build ở chế độ production:**
    ```bash
    pnpm run start
    ```
*   **Kiểm tra linting:**
    ```bash
    pnpm run lint
    ```

## 8. Gỡ lỗi (Troubleshooting)

*   **Lỗi port đã sử dụng (Port already in use):** Nếu frontend và backend explorer cố gắng chạy trên cùng một port, bạn cần cấu hình một trong hai để sử dụng port khác. Điều này thường được thực hiện bằng cách sửa đổi script `dev` trong `package.json` (ví dụ: `next dev -p 3001`) hoặc qua tệp cấu hình Next.js.
*   **Lỗi thiếu biến môi trường:** Nếu ứng dụng báo lỗi liên quan đến việc không tìm thấy API key hoặc URL dịch vụ, hãy kiểm tra kỹ xem các biến đó có được mong đợi trong code không và chúng được cung cấp như thế nào (qua tệp `.env` ở thư mục con, hoặc Vercel envs cho bản deployed).

Chúc bạn cài đặt thành công!
