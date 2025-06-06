# Tạo Ví & Tự Quản Lý (Self-Custody)

Một trong những đổi mới quan trọng nhất của Chain Lens là hệ thống tạo ví tức thì. Người dùng có thể tạo ví Solana trực tiếp từ trình duyệt của họ, trong vài giây — mà không cần tiện ích mở rộng hay cài đặt.

**Quy trình:**
1. Người dùng truy cập Chain Lens và nhấp vào “Tạo Ví”
2. Một `Keypair` được tạo phía máy khách (client-side) bằng cách sử dụng `@solana/web3.js`
3. `secretKey` được lưu trữ trong `localStorage` (tùy chọn mã hóa)
4. Khóa công khai (public key) được sử dụng cho tất cả các hoạt động swap & sao chép
5. Người dùng có thể xuất hoặc xóa/đặt lại ví của họ bất cứ lúc nào

**Những Điểm Chính:**
- Hoàn toàn tự quản lý (self-custodial) — người dùng sở hữu khóa riêng tư (private key)
- Khóa riêng tư không bao giờ được truyền đến bất kỳ máy chủ backend nào
- Ví có thể được xuất ở định dạng tương thích với Phantom
- Thời gian chờ phiên (Session timeout) và khóa thủ công có sẵn trong cài đặt
- Lộ trình tương lai bao gồm khóa PIN tùy chọn & mã hóa phiên
