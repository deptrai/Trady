# Các Câu Hỏi Thường Gặp

**Tôi có cần Phantom hoặc một tiện ích ví khác để sử dụng Chain Lens không?**
Không. Chain Lens cho phép bạn tạo ví tự quản lý (self-custodial wallet) trực tiếp trong trình duyệt của mình mà không cần bất kỳ tiện ích mở rộng nào. Chỉ cần một cú nhấp chuột để thiết lập — không cần cài đặt hay cụm từ khôi phục (seed phrase) ban đầu. Bạn có thể xuất ví và sử dụng nó trong Phantom sau nếu muốn.

**Chain Lens có bị giới hạn ở blockchain Solana không?**
Có, hiện tại là vậy. Chain Lens được xây dựng hoàn toàn trên Solana, sử dụng các công cụ gốc của Solana cho việc swap, tạo ví và dữ liệu thời gian thực. Việc mở rộng sang các chuỗi khác (cross-chain) đang được xem xét cho các bản phát hành trong tương lai.

**Chain Lens chính xác là gì? Một ví? Một DEX? Một công cụ giao dịch?**
Chain Lens là tất cả những điều đó. Đây là một nền tảng giao dịch phi tập trung bao gồm ví trong trình duyệt, giao diện swap nâng cao (được cung cấp bởi Jupiter), giao dịch sao chép thời gian thực (CopySwap), hệ thống uy tín thông minh và chat token trực tiếp. Hãy coi nó như sự kết hợp của Telegram, Phantom và Jupiter — với một lớp xã hội được thêm vào.

**Ví của tôi được lưu trữ như thế nào? Có an toàn không?**
Khi bạn tạo ví, nó được tạo bằng hệ thống cặp khóa (keypair) gốc của Solana và được lưu trữ mã hóa trong bộ nhớ cục bộ (local storage) của trình duyệt. Nó không bao giờ chạm đến máy chủ backend. Chỉ bạn mới có quyền truy cập vào khóa riêng tư (private key). Bạn có thể xuất và sao lưu nó bất cứ lúc nào.

**Điều gì xảy ra nếu tôi đóng trình duyệt hoặc xóa dữ liệu?**
Nếu bạn chưa xuất ví của mình, việc xóa bộ nhớ cache hoặc đóng các cửa sổ ẩn danh có thể dẫn đến mất quyền truy cập vĩnh viễn. Luôn xuất khóa của bạn và lưu trữ nó an toàn ngoại tuyến. Chain Lens cung cấp cả định dạng xuất văn bản thuần túy và JSON tương thích với Phantom.

**Tôi có thể sử dụng ví Chain Lens của mình trong Phantom hoặc ngược lại không?**
Có. Bạn có thể nhập ví Chain Lens của mình vào Phantom bằng khóa riêng tư đã xuất. Ngược lại, việc nhập các ví được tạo bởi Phantom vào Chain Lens sẽ được hỗ trợ trong các bản cập nhật trong tương lai.

**CopySwap hoạt động như thế nào một cách đơn giản?**
Bạn chọn một ví đang hoạt động tốt, nhấp vào “Bắt đầu Sao chép” (Start Copying), và mỗi khi ví đó thực hiện giao dịch, ví của bạn sẽ sao chép theo. Các giao dịch được thực hiện bằng tiền của bạn, với cài đặt của bạn (SOL tối đa, độ trễ, v.v.). Bạn có thể ngừng sao chép bất cứ lúc nào.

**Sao chép ví có rủi ro không?**
Sao chép luôn có rủi ro — giống như bất kỳ chiến lược giao dịch nào. Tuy nhiên, Chain Lens giúp giảm thiểu rủi ro này bằng cách hiển thị cho bạn điểm uy tín của mỗi ví, lịch sử giao dịch, ROI, mức độ liên quan đến rug pull, và nhiều hơn nữa. Tránh các ví được đánh dấu Rủi ro Cao (High-Risk) trừ khi bạn cảm thấy thoải mái với sự biến động mạnh.

**Tôi có thể sao chép nhiều ví cùng một lúc không?**
Hoàn toàn có thể. Chain Lens hỗ trợ sao chép nhiều ví. Mỗi ví được sao chép có thể có cài đặt riêng và các giao dịch sẽ chạy độc lập. Bạn có thể ngừng sao chép một ví mà không ảnh hưởng đến các ví khác.

**Người khác có thể sao chép tôi không? Tôi có kiếm được tiền từ đó không?**
Có. Nếu bạn hoạt động tốt một cách nhất quán, những người khác có thể bắt đầu sao chép ví của bạn. Với hệ thống Copy2Earn (sẽ ra mắt trong các phiên bản tương lai), bạn sẽ kiếm được một phần nhỏ phí sao chép, biến chiến lược giao dịch của bạn thành một nguồn thu nhập thụ động và uy tín trên chuỗi (on-chain reputation).

**Chain Lens có tính phí nào hiện tại không?**
Không. Hiện tại, tất cả các tính năng — swap, tạo ví, sao chép và chat — đều miễn phí sử dụng. Chỉ áp dụng phí gas của Solana. Chain Lens có kế hoạch giới thiệu phí nền tảng trong các giai đoạn sau, nhưng những người nắm giữ token $Chain Lens sẽ được giảm giá hoặc miễn phí.

**Mục đích của token $Chain Lens là gì?**
$Chain Lens là token tiện ích gốc của nền tảng. Nó sẽ mở khóa các công cụ cao cấp (như bộ lọc sao chép nâng cao, radar cá voi, cảnh báo nhanh hơn), giảm phí, tăng khả năng hiển thị cho các ví có điểm số cao và cấp quyền truy cập sớm vào các mô-đun mới. Nó cũng gắn liền với cơ chế chia sẻ doanh thu và đốt token của nền tảng.

**$Chain Lens đã hoạt động chưa? Tôi có thể mua nó ở đâu?**
Chưa. Token sẽ chỉ ra mắt sau khi nền tảng đạt được các mốc sử dụng và có nền tảng giá trị rõ ràng. Việc ra mắt sẽ không diễn ra một cách lén lút hay thông qua pump.fun. Theo dõi Chain Lens trên X và Telegram để biết thông báo.

**Tôi có thể sử dụng Chain Lens trên di động không?**
Có. Chain Lens được tối ưu hóa hoàn toàn cho các trình duyệt di động. Tất cả các tính năng — từ tạo ví đến chat — hoạt động trơn tru trên Chrome, Safari và các trình duyệt di động khác. Một ứng dụng di động gốc đang được xem xét cho tương lai.

**Có cách nào để báo cáo lỗi hoặc đề xuất cải tiến không?**
Có. Người dùng có thể cung cấp phản hồi trực tiếp qua:
- Twitter/X: @Chain LensProtocol
- Email: support@chainlens.net 
- Telegram: [t.me/Chain LensProtocol](https://t.me/Chain LensProtocol)

Đội ngũ tích cực theo dõi tất cả các kênh và khuyến khích người dùng ban đầu định hình lộ trình.

**Chain Lens có mở rộng sang Ethereum hoặc các chuỗi khác không?**
Trọng tâm hiện tại là Solana, nơi tốc độ và phí thấp cho phép tương tác thời gian thực. Tuy nhiên, giao dịch sao chép đa chuỗi (multi-chain copy trading) nằm trong lộ trình, bao gồm ETH và Base trong các phiên bản sau.

**Tôi có thể mất tiền khi sử dụng Chain Lens không?**
Như với bất kỳ nền tảng DeFi nào, có — nếu bạn sao chép một ví xấu, giao dịch các token dễ biến động hoặc để lộ khóa riêng tư của mình. Nhưng Chain Lens giảm thiểu rủi ro với:
- Điểm uy tín ví
- Phương pháp phỏng đoán phát hiện rug pull
- Lưu trữ khóa chỉ ở cục bộ
- Toàn quyền kiểm soát ví của bạn

Nếu bạn tuân theo các phương pháp tốt nhất và sử dụng dữ liệu uy tín một cách khôn ngoan, bạn sẽ giảm đáng kể mức độ rủi ro của mình.

**Có cộng đồng nào tôi có thể tham gia không?**
Có. Chain Lens có các cộng đồng hoạt động trên:
- Twitter/X: @Chain LensProtocol
- Discord (sắp ra mắt)
- Telegram: [t.me/Chain LensProtocol](https://t.me/Chain LensProtocol)

Đây là những nơi tuyệt vời để chia sẻ các lệnh gọi (calls), học hỏi từ những người khác và giúp định hình nền tảng.

**Chain Lens kiếm tiền như thế nào trong tương lai?**
Chain Lens sẽ tạo doanh thu thông qua:
- Phí siêu nhỏ từ CopySwap
- Quyền truy cập công cụ cao cấp
- Tăng cường khả năng hiển thị trên bảng xếp hạng
- Quan hệ đối tác chiến lược
- Giảm phát dựa trên token (mua lại & đốt token)

Quan trọng là, các khoản phí sẽ không bao giờ mang tính bóc lột. Chúng sẽ tài trợ cho việc phát triển, thưởng cho những người nắm giữ token và cải thiện hệ sinh thái.

**Lời kết?**
Chain Lens được xây dựng để làm cho DeFi đơn giản hơn, nhanh hơn và thông minh hơn. Cho dù bạn mới tham gia vào crypto hay đã tìm hiểu sâu về Solana, Chain Lens cho phép bạn giao dịch, sao chép và khám phá mà không gặp trở ngại.
Không cần ví. Không cần tài khoản. Chỉ có bạn, mạng lưới — và những nhà giao dịch thông minh nhất, chỉ cách một cú nhấp chuột.
