# Đối tác Tích hợp Cốt lõi

Chain Lens hiện kết nối với nhiều thành phần chính trong hệ tầng Solana:

#### ⚙️ Jupiter Aggregator (Swaps)
Jupiter là bộ tổng hợp swap đáng tin cậy và tiên tiến nhất của Solana. Nó định tuyến các swap qua hàng chục DEX để đảm bảo giá tối ưu, slippage thấp và giảm thiểu tác động MEV.

Chain Lens sử dụng Jupiter để:
- Tìm kiếm các tuyến đường
- Thực hiện các swap
- Giám sát độ sâu thanh khoản
- Cung cấp báo giá xem trước theo thời gian thực

Điều này cho phép người dùng Chain Lens truy cập vào mọi token và pool có thể giao dịch trên Solana — mà không cần biết nó đang nằm trên DEX nào.

#### 🔄 Raydium, Meteora, Orca, Phoenix (DEXs)
Thông qua Jupiter, Chain Lens tương tác với:
- Raydium cho các swap nhanh và các cặp ổn định
- Meteora cho thanh khoản dựa trên LP động
- Orca cho trải nghiệm UX di động mượt mà và thanh khoản tập trung
- Phoenix cho giao dịch phi tập trung kiểu sổ lệnh

Các tích hợp này diễn ra ở phía sau. Đối với người dùng, đó là một giao diện swap duy nhất — với tất cả các nguồn thanh khoản được tổng hợp tự động.

#### 💳 @solana/web3.js (Cơ chế Ví)
Chain Lens tạo ví và ký các giao dịch bằng cách sử dụng SDK JavaScript gốc của Solana. Không có bên thứ ba nào giám sát hoặc kết nối ví được sử dụng.

Điều này làm cho việc tạo ví và ký:
- Cực kỳ nhanh
- Tương thích với di động
- Không cần giám sát
- Hoàn toàn ở phía máy khách

#### 💬 Supabase Realtime (Chat & Nhắn tin)
Chain Lens sử dụng cơ sở dữ liệu realtime của Supabase cho các phòng chat. Điều này cho phép:
- Gửi tin nhắn tức thời
- Chèn tin nhắn hệ thống (cảnh báo cá voi, cờ rug pull)
- Kiểm duyệt spam
- Tạo kênh động (theo từng token)

Kết quả? Mỗi token trên Solana có được lớp xã hội riêng — trực tiếp, liên quan và nhanh chóng.
