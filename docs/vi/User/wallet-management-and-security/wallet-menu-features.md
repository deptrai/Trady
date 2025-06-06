# Tính Năng Menu Ví

Menu ví của bạn có sẵn ở góc trên cùng bên phải của ứng dụng. Từ đây, bạn có thể:
- View Wallet Address (Xem Địa Chỉ Ví): Xem public key (khóa công khai) của bạn
- Export Wallet (Xuất Ví): Tải xuống tệp JSON hoặc sao chép private key (khóa riêng tư) của bạn theo cách thủ công
- Lock Wallet (Khóa Ví): Kết thúc phiên và ẩn ví khỏi chế độ xem cho đến khi được xác thực lại
- Reset Wallet (Đặt Lại Ví): Xóa ví hiện tại của bạn khỏi bộ nhớ và cho phép bạn tạo một ví mới
- Session Timeout (Hết Hạn Phiên): Bật hoặc tắt tự động khóa sau 15 phút không hoạt động

Điều này cung cấp cho người dùng toàn quyền kiểm soát mà không bao giờ cần phải "kết nối" hoặc ủy quyền bất cứ điều gì.

### Xuất & Nhập Ví
Ví Chain Lens hoàn toàn tương thích với Phantom và các ví Solana khác.

#### Để Xuất:
1. Nhấp vào "Export Wallet" (Xuất Ví)
2. Chọn:
   - Copy Private Key (Sao chép Khóa Riêng tư)
   - Download JSON File (Tải xuống Tệp JSON - tương thích với việc nhập vào Phantom)
3. Lưu trữ an toàn (ưu tiên lưu trữ ngoại tuyến)

#### Để Nhập (vào Phantom):
1. Mở Phantom
2. Chọn "Import Wallet" (Nhập Ví)
3. Dán private key Chain Lens của bạn
4. Bây giờ bạn có quyền truy cập vào cùng một ví thông qua Phantom hoặc bất kỳ giao diện Solana nào khác

Điều này lý tưởng cho những người dùng muốn sử dụng ví của họ bên ngoài Chain Lens hoặc khôi phục ví sau này trên một thiết bị khác.

### Đặt Lại Ví Của Bạn
Nếu bạn muốn xóa sạch phiên của mình hoặc bắt đầu lại từ đầu:
1. Nhấp vào "Reset Wallet" (Đặt Lại Ví)
2. Bạn sẽ được nhắc xác nhận hành động
3. Dữ liệu ví cục bộ của bạn sẽ bị xóa
4. Bạn sẽ quay lại màn hình "Create Wallet" (Tạo Ví)

Điều này đặc biệt hữu ích cho:
- Các thiết bị dùng chung
- Việc thử nghiệm
- Xoay vòng ví để có danh tính mới

⚠️ Nhắc nhở: Nếu bạn chưa xuất private key của mình trước khi đặt lại, bạn sẽ mất quyền truy cập vào tiền của mình.

### Tự Động Khóa & Bảo Mật Phiên
Theo mặc định, Chain Lens sẽ khóa phiên ví của bạn sau 15 phút không hoạt động.

Khi điều này xảy ra:
- Giao diện người dùng (UI) bị làm mờ
- Ví của bạn tạm thời bị ẩn
- Bạn phải xác thực lại (hoặc mở khóa bằng mã PIN, sắp có)

Bạn có thể tùy chỉnh khoảng thời gian chờ (5 phút, 15 phút, 30 phút, Không bao giờ), tùy thuộc vào sở thích của bạn.

Tính năng này giúp ngăn chặn truy cập không mong muốn trên các thiết bị dùng chung hoặc không được giám sát.
