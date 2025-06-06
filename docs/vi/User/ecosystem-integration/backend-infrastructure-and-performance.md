# Cơ Sở Hạ Tầng Backend & Hiệu Suất

Chain Lens được tối ưu hóa cho tốc độ và khả năng mở rộng, sử dụng:
- Frontend không trạng thái (stateless) với khả năng hiển thị động (dynamic rendering)
- Các điểm cuối RPC công khai (Public RPC endpoints) với dự phòng chuyển đổi dự phòng (fallback redundancy)
- Bộ nhớ đệm phía máy khách (Client-side caching) cho ví và giao dịch swap
- Các trình lắng nghe sự kiện (Event listeners) kết nối vào hoạt động giao dịch ví cho CopySwap

Tất cả các hành động nhạy cảm — tạo ví, ký, xuất ví — đều diễn ra hoàn toàn trong trình duyệt, đảm bảo quyền riêng tư và bảo mật theo thiết kế.

Các bài kiểm tra tải (Load tests) cho thấy Chain Lens dễ dàng mở rộng quy mô cho hàng nghìn người dùng đồng thời, với thời gian thực hiện swap trung bình vẫn dưới 2.2 giây trong sử dụng thực tế.
