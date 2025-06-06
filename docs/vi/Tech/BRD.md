# Tài liệu Yêu cầu Nghiệp vụ (Business Requirements Document - BRD) cho Chain Lens

## 1. Tổng quan Dự án (Project Overview)
### 1.1. Bối cảnh (Background)
DeFi đã chứng kiến sự phát triển nhanh chóng, nhưng việc tiếp cận người dùng mới vẫn còn phức tạp đối với nhiều người. Chain Lens đặt mục tiêu giải quyết vấn đề này bằng cách cung cấp một DEX (sàn giao dịch phi tập trung) thân thiện với người dùng, ưu tiên tính xã hội trên blockchain Solana.
### 1.2. Vấn đề / Cơ hội Kinh doanh (Business Problem / Opportunity)
- **Vấn đề**: Rào cản gia nhập cao đối với người dùng DeFi mới do các phức tạp kỹ thuật (cài đặt tiện ích ví, hiểu về độ trượt giá (slippage), đánh giá rủi ro).
- **Cơ hội**: Tạo ra một DEX đơn giản hóa việc giao dịch, tích hợp các yếu tố xã hội và cung cấp các công cụ mạnh mẽ như giao dịch sao chép (copy trading) mà không làm mất đi quyền tự quản lý (self-custody) của người dùng.
### 1.3. Giải pháp Đề xuất: Chain Lens (Proposed Solution: Chain Lens)
Chain Lens là một DEX ưu tiên tính xã hội trên Solana, cung cấp tính năng tạo ví tức thì trong trình duyệt, giao dịch sao chép bằng một cú nhấp chuột (CopySwap), hoán đổi tổng hợp qua Jupiter, điểm danh tiếng ví và các phòng chat trực tiếp theo token, tất cả được thiết kế cho trải nghiệm người dùng không rào cản.
### 1.4. Mục tiêu Dự án (Project Goals and Objectives)
- Giảm rào cản gia nhập vào giao dịch DeFi trên Solana.
- Cho phép người dùng dễ dàng học hỏi và sao chép các chiến lược giao dịch thành công.
- Nuôi dưỡng một cộng đồng xung quanh việc giao dịch và thảo luận về token.
- Cung cấp một môi trường giao dịch an toàn, tự quản lý.
- Trở thành một nền tảng DEX xã hội hàng đầu trên Solana.

## 2. Yêu cầu Nghiệp vụ (Business Requirements)
### 2.1. Mục tiêu Kinh doanh (Business Objectives - SMART - Ví dụ, cần tinh chỉnh)
- Thu hút X người dùng hoạt động trong vòng Y tháng sau khi ra mắt.
- Đạt tổng khối lượng giao dịch Z qua CopySwap trong Q quý đầu tiên.
- Thiết lập token $Chain Lens (Giai đoạn 2) với N chức năng tiện ích và đạt vốn hóa thị trường M.
- Tăng cường sự tham gia của cộng đồng P% trong các phòng chat và kênh xã hội.
### 2.2. Phạm vi (Scope)
    #### 2.2.1. Trong Phạm vi (In Scope - Giai đoạn 1 - Ra mắt Cốt lõi)
    - Tạo và quản lý ví Solana trong trình duyệt.
    - Chức năng CopySwap thời gian thực.
    - Hoán đổi token sử dụng bộ tổng hợp Jupiter.
    - Chấm điểm và hiển thị danh tiếng ví.
    - Radar Token Thịnh hành.
    - Chat trực tiếp theo token.
    - Ứng dụng web đáp ứng trên di động.
    #### 2.2.2. Trong Phạm vi (In Scope - Các Giai đoạn Tương lai - ví dụ từ tài liệu)
    - Ra mắt token $Chain Lens và các tiện ích (Giai đoạn 2).
    - Cơ chế thưởng Copy2Earn (Giai đoạn 2).
    - Các trình kích hoạt và cảnh báo giao dịch thông minh (Giai đoạn 2).
    - Bảng phân tích (Analytics dashboard - Giai đoạn 3).
    - API công khai (Public API - Giai đoạn 3).
    - Ứng dụng di động gốc (Native mobile app - Giai đoạn 3).
    #### 2.2.3. Ngoài Phạm vi (Out of Scope - Ví dụ, cần xác nhận)
    - Các tính năng của sàn giao dịch tập trung (ví dụ: sổ lệnh (order books) ban đầu).
    - Hỗ trợ blockchain ngoài Solana (ban đầu, mặc dù ETH/Base được đề cập cho Copy Giai đoạn 2).
    - Cổng nạp/rút tiền pháp định (Fiat on/off ramps - trừ khi được chỉ định).
### 2.3. Đối tượng Mục tiêu / Chân dung Người dùng (Target Audience / User Personas)
    #### 2.3.1. Người mới Giao dịch Crypto ("Crypto Curious")
        - Mục tiêu: Dễ dàng tham gia hoán đổi token, học hỏi bằng cách sao chép.
        - Nhu cầu: Giao diện người dùng đơn giản, hướng dẫn rõ ràng, các tùy chọn rủi ro thấp.
    #### 2.3.2. Degen có Kinh nghiệm ("Alpha Seekers")
        - Mục tiêu: Tìm và sao chép các ví hoạt động hiệu quả cao, theo dõi xu hướng.
        - Nhu cầu: Giao dịch sao chép đáng tin cậy, phân tích nâng cao (tương lai), thực thi nhanh.
    #### 2.3.3. Chủ sở hữu Ví / Người có ảnh hưởng (cho Copy2Earn - Giai đoạn 2)
        - Mục tiêu: Kiếm tiền từ hoạt động giao dịch và hiểu biết của họ.
        - Nhu cầu: Hệ thống thưởng công bằng, công cụ để xây dựng danh tiếng.
    #### 2.3.4. Người giao dịch Tập trung vào Cộng đồng ("Social Swappers")
        - Mục tiêu: Thảo luận về giao dịch, chia sẻ hiểu biết, tương tác với người khác.
        - Nhu cầu: Tính năng chat mạnh mẽ, công cụ xây dựng cộng đồng.
### 2.4. Tính năng và Chức năng Chính (Cấp cao & Giá trị Kinh doanh) (Key Features and Functionality (High-Level & Business Value))
    - **Tạo Ví Tức thì (Instant Wallet Creation)**: Giảm rào cản tiếp cận, tăng tỷ lệ thu hút người dùng.
    - **Công cụ CopySwap (CopySwap Engine)**: Thu hút người dùng muốn tận dụng chiến lược của chuyên gia, thúc đẩy khối lượng giao dịch.
    - **Hoán đổi Tổng hợp (Aggregated Swaps)**: Đảm bảo giá cả cạnh tranh, xây dựng niềm tin người dùng.
    - **Hệ thống Danh tiếng Ví (Wallet Reputation System)**: Giúp người dùng đưa ra quyết định sáng suốt, thúc đẩy tính minh bạch.
    - **Chat Token Trực tiếp (Live Token Chat)**: Tăng cường sự tham gia và giữ chân người dùng, cung cấp cái nhìn sâu sắc về tâm lý thị trường theo thời gian thực.
    - **Radar Token Thịnh hành (Trending Token Radar)**: Hỗ trợ khám phá token, nâng cao cơ hội giao dịch.
    - **Token $Chain Lens & Tiện ích (Giai đoạn 2)**: Tạo ra nền kinh tế riêng cho nền tảng, khuyến khích sự tham gia.
    - **Copy2Earn (Giai đoạn 2)**: Khuyến khích các nhà giao dịch có kỹ năng, tạo ra một hệ sinh thái nội dung.
### 2.5. Chỉ số Thành công / KPIs (Success Metrics / KPIs - Ví dụ)
- Người dùng Hoạt động Hàng ngày/Hàng tháng (DAU/MAU).
- Tổng Khối lượng Giao dịch.
- Khối lượng CopySwap chiếm % trên Tổng Khối lượng.
- Số lượng ví được tạo.
- Tỷ lệ giữ chân người dùng.
- Tin nhắn chat mỗi ngày/người dùng.
- Số lượng người nắm giữ token $Chain Lens và khối lượng giao dịch (sau khi ra mắt).
- Số lượng ví tham gia Copy2Earn.
### 2.6. Giả định (Assumptions)
- Sự tăng trưởng liên tục và sự quan tâm của người dùng đối với hệ sinh thái Solana.
- Tính khả dụng và độ tin cậy của các dịch vụ bên thứ ba (Jupiter API, Firebase/Supabase).
- Người dùng cảm thấy thoải mái với việc tự quản lý nếu được hướng dẫn đúng cách.
- Môi trường pháp lý vẫn thuận lợi cho các DEX và giao dịch sao chép.
### 2.7. Ràng buộc (Constraints)
- Nguồn lực và thời gian phát triển.
- Ngân sách cho marketing và phát triển.
- Khả năng mở rộng của mạng Solana.
- Rủi ro bảo mật cố hữu trong DeFi.
- Cạnh tranh từ các DEX và nền tảng giao dịch sao chép khác.
### 2.8. Rủi ro và Biện pháp Giảm thiểu (Risks and Mitigation - Ví dụ)
    - **Vi phạm Bảo mật (Security Breach)**: Biện pháp giảm thiểu: Kiểm toán nghiêm ngặt, thực hành mã hóa an toàn, giáo dục người dùng.
    - **Tỷ lệ Chấp nhận Người dùng Thấp (Low User Adoption)**: Biện pháp giảm thiểu: Marketing mạnh mẽ, đề xuất giá trị độc đáo, xây dựng cộng đồng.
    - **Thay đổi Quy định (Regulatory Changes)**: Biện pháp giảm thiểu: Tư vấn pháp lý, thiết kế nền tảng linh hoạt.
    - **Thời gian Ngừng hoạt động API Bên thứ ba (Third-Party API Downtime)**: Biện pháp giảm thiểu: Cơ chế dự phòng (nếu có thể), giao tiếp rõ ràng với người dùng.

## 3. Các Bên Liên quan (Stakeholders)
(Cần điền: Ví dụ: Đội ngũ Dự án, Nhà đầu tư, Người dùng, Cộng đồng.)

## 4. Bảng Chú giải Thuật ngữ (Glossary)
(Cần điền các thuật ngữ kinh doanh và crypto quan trọng liên quan đến Chain Lens.)

## Phụ lục (Appendix)
(Bất kỳ tài liệu hoặc thông tin hỗ trợ nào.)
