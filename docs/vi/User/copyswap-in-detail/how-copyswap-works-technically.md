# Cách CopySwap Hoạt Động (Về Mặt Kỹ Thuật)

Ở cấp độ backend, CopySwap sử dụng các trình theo dõi sự kiện (event watchers) để giám sát các địa chỉ ví cụ thể trên chuỗi.

Đây là phân tích chi tiết về quy trình:
1. Bạn chọn một ví và nhấp vào “Bắt đầu Sao chép”.
2. Backend của Chain Lens bắt đầu giám sát hoạt động swap của ví đó.
3. Khi ví ký và gửi một giao dịch swap (thông qua Jupiter), backend sẽ phát hiện giao dịch đó.
4. Chain Lens ngay lập tức kích hoạt một yêu cầu swap được sao chép trong ví trình duyệt của riêng bạn, được ký và thực hiện bằng tiền của bạn.
5. Toàn bộ quá trình thường diễn ra trong vòng 1–2 giây (tùy thuộc vào cài đặt độ trễ bạn chọn).

Tất cả các giao dịch đều được định tuyến thông qua Jupiter, có nghĩa là giao dịch của bạn sẽ luôn đi theo con đường tốt nhất hiện có — ngay cả khi ví gốc đã sử dụng một DEX khác.

Chain Lens không gộp quỹ hoặc hoạt động như một người giám sát. Mỗi giao dịch được sao chép đều được thực hiện bằng ví của bạn, gas của bạn và định tuyến của bạn.
