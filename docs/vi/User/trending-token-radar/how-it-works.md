# Cách Hoạt Động

Radar của Chain Lens quét mạng liên tục bằng thuật toán tính điểm, cân nhắc và xếp hạng mỗi token dựa trên các điểm dữ liệu thời gian thực sau:

#### 1. Đột Biến Khối Lượng Giao Dịch (Swap Volume Spikes)
Các token trải qua sự gia tăng đột ngột về khối lượng trong một khung thời gian ngắn sẽ được gắn cờ. Chain Lens so sánh trung bình 1h, 6h và 24h để phát hiện các đợt tăng bất thường.

#### 2. Gia Tăng Hoạt Động Ví
Có bao nhiêu ví duy nhất tương tác với một token theo thời gian? Hệ thống xem xét tốc độ tăng trưởng, không chỉ tổng số. Một token tăng từ 12 lên 300 ví trong 30 phút sẽ xếp hạng cao hơn một token tăng từ 1.000 lên 1.200 ví trong 24h.

#### 3. Sự Kiện Bể Thanh Khoản (Liquidity Pool Events)
Các token có cặp thanh khoản mới được thêm vào, LP được làm mới hoặc dòng vốn LP vào nhanh chóng sẽ được ghi nhận. Điều này giúp phát hiện các đợt ra mắt ẩn (stealth launches) và các memecoin giai đoạn đầu.

#### 4. Phát Hiện "Cá Voi" (Whale Detection)
Nếu một ví có uy tín hoặc lịch sử cao (trên Chain Lens hoặc chuỗi Solana nói chung) bắt đầu mua một token, điểm radar của token đó sẽ tăng đáng kể. Nhiều "cá voi" tham gia trong một khoảng thời gian ngắn gây ra sự đột biến.

#### 5. Hoạt Động Trò Chuyện & Xã Hội
Các token được thảo luận nhiều trong các phòng chat của Chain Lens — hoặc được liên kết với các lệnh gọi swap — sẽ nhận được một sự thúc đẩy tín hiệu xã hội. Việc tích hợp với quét dữ liệu Telegram và khả năng quét Twitter (trong tương lai) cũng tăng cường lớp này.

Mỗi token nhận được một điểm số trực tiếp (0–100), được cập nhật mỗi phút. Những token đạt điểm 80+ được đánh dấu là “Hot,” trong khi những token đạt điểm 90+ có thể được gắn nhãn “Volatile” (Biến động mạnh) hoặc “Breakout” (Đột phá).
