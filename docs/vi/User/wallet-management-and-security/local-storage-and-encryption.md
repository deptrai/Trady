# Lưu Trữ Cục Bộ và Mã Hóa

Ví của bạn được lưu trữ trong trình duyệt bằng mã hóa an toàn.

Chain Lens sử dụng:
- Mã hóa AES-256 (phía máy khách - client-side)
- Mã PIN tùy chọn (sắp có) để bảo vệ việc giải mã ví
- localStorage hoặc IndexedDB để lưu dữ liệu ví

Vì không có gì được truyền đến backend, private key (khóa riêng tư) của bạn không bao giờ rời khỏi thiết bị của bạn.

Đóng trình duyệt hoặc xóa bộ nhớ cache sẽ xóa ví — trừ khi được xuất ra.
