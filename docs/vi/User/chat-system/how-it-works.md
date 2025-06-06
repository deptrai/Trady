# Cách Hoạt Động

Hệ thống chat của Chain Lens được xây dựng bằng Supabase Realtime (hoặc socket.io), tích hợp trực tiếp vào trang token.

Mỗi khi người dùng nhấp vào một token để xem dữ liệu hoặc thực hiện swap, họ cũng được truy cập vào phòng chat trực tiếp của token đó. Không cần đăng nhập thêm. Chat được liên kết với ví Chain Lens trong trình duyệt của người dùng.

Đây là những gì xảy ra:
- Bạn mở một token
- Biểu đồ, giao diện swap và chat của token xuất hiện cạnh nhau
- Bạn có thể gửi và nhận tin nhắn ngay lập tức
- Tin nhắn được gắn nhãn thời gian và được gắn thẻ bởi ví (hiển thị ID một phần)
- Các cảnh báo whale, cờ rug và tin nhắn hệ thống được đưa vào luồng
- Bạn có thể phản ứng với tin nhắn bằng emoji hoặc cờ

Mọi thứ đều được tích hợp sẵn. Bạn không bao giờ cần chuyển tab hoặc mở Discord — lớp xã hội được tích hợp sẵn.
