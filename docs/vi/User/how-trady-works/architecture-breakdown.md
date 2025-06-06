# Phân Tích Kiến Trúc

Chain Lens được xây dựng bằng kiến trúc module với các lớp cốt lõi sau:

**Frontend**
Ứng dụng React + Next.js với TailwindCSS, hoàn toàn đáp ứng (fully responsive)

**Wallet Engine (Bộ máy Ví)**
Tạo cặp khóa (keypair) trong trình duyệt thông qua `@solana/web3.js`, được lưu trữ cục bộ

```
@solana/web3.js
```

**Swap Layer (Lớp Swap)**
API tổng hợp của Jupiter để thực thi tuyến đường tốt nhất

**Copy Engine (Bộ máy Sao chép)**
Trình lắng nghe thời gian thực cho hoạt động của ví, các giao dịch swap được nhân bản

**Reputation System (Hệ thống Uy tín)**
Chấm điểm động các ví dựa trên hành vi

**Chat System (Hệ thống Chat)**
Các phòng chat dành riêng cho token được cung cấp bởi websockets

**Data Store (Kho Dữ liệu)**
Firebase / Supabase + bộ đệm cục bộ (local cache) để tăng hiệu suất
