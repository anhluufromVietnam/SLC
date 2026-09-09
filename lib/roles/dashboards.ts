import type { Role, RoleDashboard } from '@/lib/types'

export const roleDashboards: Record<Role, RoleDashboard> = {
  admin: {
    headline: 'Toàn cảnh vận hành trường',
    kpis: [
      { value: '2,486', label: 'Học viên đang quản lý', delta: '+64 tháng này', tone: 'ink' },
      { value: '84', label: 'Lớp đang vận hành', delta: '26 lớp chính quy', tone: 'ink' },
      { value: '86', label: 'Đơn hàng Nhật Bản', delta: '12 đơn mới', tone: 'brand' },
      { value: '1.84 tỷ', label: 'Doanh thu tháng 09', delta: '+8.2% so với T8', tone: 'green' },
    ],
    work: [
      { title: 'Duyệt 09 phiếu chi chờ ký', context: 'Kế toán · Tài chính', due: 'Hôm nay', tone: 'amber', screenKey: 'transactions' },
      { title: '03 hồ sơ XKLĐ quá hạn SLA bổ sung giấy tờ', context: 'Nhật Bản · Hồ sơ', due: 'Quá hạn 2 ngày', tone: 'brand', screenKey: 'japan-workforce' },
      { title: 'Phê duyệt khung chương trình K48', context: 'Phòng đào tạo', due: 'Trước 15/09', tone: 'ink', screenKey: 'courses' },
      { title: 'Rà soát nhật ký truy cập bất thường', context: 'Quản trị hệ thống', due: 'Tuần này', tone: 'ink', screenKey: 'audit-logs' },
    ],
  },
  'student-affairs': {
    headline: 'Công tác học viên',
    kpis: [
      { value: '1,248', label: 'Học viên phụ trách', delta: '4 khu vực', tone: 'ink' },
      { value: '36', label: 'Hồ sơ đang xử lý', delta: '05 gấp hôm nay', tone: 'brand' },
      { value: '89%', label: 'Hồ sơ ghi danh hoàn tất', delta: '+3% tuần này', tone: 'green' },
      { value: '12', label: 'Yêu cầu hỗ trợ mở', delta: '03 mới hôm nay', tone: 'amber' },
    ],
    work: [
      { title: '03 hồ sơ thiếu giấy tờ ghi danh', context: 'SLA xử lý trong hôm nay', due: '16:00', tone: 'brand', screenKey: 'learner-profile' },
      { title: 'Xếp phòng KTX cho 12 học viên nhập học mới', context: 'KTX · Lưu trú', due: 'Trước 12/09', tone: 'amber', screenKey: 'residences' },
      { title: 'Xác nhận 05 đơn xin nghỉ phép về nước', context: 'Dịch vụ học viên', due: 'Ngày 10/09', tone: 'ink', screenKey: 'service-tickets' },
      { title: 'In và phát 18 chứng chỉ tốt nghiệp', context: 'Khảo thí · Chứng chỉ', due: 'Tuần này', tone: 'green', screenKey: 'certificates' },
    ],
  },
  japan: {
    headline: 'Xuất khẩu lao động & Hồ sơ Nhật Bản',
    kpis: [
      { value: '386', label: 'Ứng viên XKLĐ', delta: '+22 tháng này', tone: 'ink' },
      { value: '24', label: 'COE chờ duyệt', delta: '06 hồ sơ gấp', tone: 'brand' },
      { value: '18', label: 'Visa sắp nhận kết quả', delta: 'Tuần 37-38', tone: 'amber' },
      { value: '42', label: 'Xuất cảnh tháng 09', delta: '91% hồ sơ đạt chuẩn', tone: 'green' },
    ],
    work: [
      { title: 'Nộp 06 hồ sơ COE cho nghiệp đoàn Tokai', context: 'Hồ sơ xuất cảnh', due: 'Hôm nay', tone: 'brand', screenKey: 'japan-workforce' },
      { title: 'Lịch phỏng vấn xí nghiệp Suzuki 14/09', context: 'Matching · 18 ứng viên', due: 'Chuẩn bị danh sách', tone: 'amber', screenKey: 'applications' },
      { title: 'Đối chiếu yêu cầu tuyển mới với đơn hàng #86', context: 'Đơn hàng tuyển dụng', due: 'Trước 11/09', tone: 'ink', screenKey: 'orders' },
      { title: 'Cập nhật kết quả visa K46 cho 09 học viên', context: 'Hồ sơ XKLĐ', due: 'Ngày 10/09', tone: 'green', screenKey: 'japan-workforce' },
    ],
  },
  training: {
    headline: 'Phòng đào tạo',
    kpis: [
      { value: '26', label: 'Lớp đang vận hành', delta: '580 học viên', tone: 'ink' },
      { value: '14', label: 'Chương trình đào tạo', delta: '02 chờ duyệt', tone: 'brand' },
      { value: '32', label: 'Giảng viên giảng dạy', delta: '04 thỉnh giảng', tone: 'ink' },
      { value: '88%', label: 'Tiến độ khung chương trình', delta: 'Đúng kế hoạch', tone: 'green' },
    ],
    work: [
      { title: 'Duyệt 07 học liệu mới upload', context: 'Học liệu · Giảng viên', due: 'Hôm nay', tone: 'amber', screenKey: 'materials' },
      { title: 'Xếp lịch thi cuối kỳ tiếng Nhật N4', context: 'Khảo thí · 6 lớp', due: 'Trước 18/09', tone: 'brand', screenKey: 'exam-sessions' },
      { title: 'Khóa bảng điểm học phần K47A', context: 'Chấm điểm', due: 'Ngày 12/09', tone: 'ink', screenKey: 'grading' },
      { title: 'Cân đối lịch phòng học tuần 38', context: 'Lịch học · 03 phòng trống', due: 'Thứ 6', tone: 'green', screenKey: 'schedules' },
    ],
  },
  teacher: {
    headline: 'Giảng viên',
    kpis: [
      { value: '03', label: 'Lớp giảng dạy hôm nay', delta: '08:00 · 10:00 · 13:30', tone: 'brand' },
      { value: '128', label: 'Học viên phụ trách', delta: '4 lớp', tone: 'ink' },
      { value: '46', label: 'Bài tập chờ chấm', delta: 'Hạn 12/09', tone: 'amber' },
      { value: '76%', label: 'Chuyên cần tuần này', delta: '-4% so với T37', tone: 'ink' },
    ],
    work: [
      { title: 'Điểm danh lớp Tiếng Nhật N4 · K47A', context: '08:00 — Phòng A.203', due: 'Đang diễn ra', tone: 'brand', screenKey: 'schedules' },
      { title: 'Chấm 46 bài kiểm tra giữa kỳ', context: 'K47B · Học phần N4', due: 'Trước 12/09', tone: 'amber', screenKey: 'grading' },
      { title: 'Đăng học liệu buổi 12: Kanji N4', context: 'Học liệu số', due: 'Tuần này', tone: 'ink', screenKey: 'materials' },
      { title: 'Nhập đề thi cuối kỳ vào ngân hàng đề', context: 'Khảo thí · 40 câu', due: 'Trước 15/09', tone: 'green', screenKey: 'exam-bank' },
    ],
  },
  dormitory: {
    headline: 'Ký túc xá',
    kpis: [
      { value: '428', label: 'Cư dân hiện tại', delta: '2 tòa · 96 phòng', tone: 'ink' },
      { value: '96%', label: 'Công suất phòng', delta: '04 giường trống', tone: 'brand' },
      { value: '14', label: 'Yêu cầu dịch vụ mở', delta: '03 sự cố hôm nay', tone: 'amber' },
      { value: '98%', label: 'Điểm danh nề nếp tối qua', delta: '08 cư dân vắng', tone: 'green' },
    ],
    work: [
      { title: 'Sự cố mất điện phòng B.204', context: 'Ưu tiên cao · Đã báo sửa chữa', due: 'Trong 4 giờ', tone: 'brand', screenKey: 'service-tickets' },
      { title: 'Xếp phòng cho 12 học viên nhập học mới', context: 'Tòa A · Còn 04 giường', due: 'Trước 12/09', tone: 'amber', screenKey: 'rooms' },
      { title: 'Gia hạn hợp đồng cư trú 09 học viên', context: 'Hạn 15/09', due: 'Tuần này', tone: 'ink', screenKey: 'residences' },
      { title: 'Kiểm tra nề nếp tầng 3 tòa B', context: 'Định kỳ tối 21:00', due: 'Tối nay', tone: 'green', screenKey: 'service-tickets' },
    ],
  },
  accounting: {
    headline: 'Kế toán',
    kpis: [
      { value: '18.4M', label: 'Thu trong hôm nay', delta: '32 biên lai', tone: 'green' },
      { value: '248M', label: 'Công nợ học viên', delta: '18 quá hạn', tone: 'brand' },
      { value: '09', label: 'Phiếu chi chờ duyệt', delta: 'Tổng 42.6M', tone: 'amber' },
      { value: '97%', label: 'Đối soát tháng 08 hoàn tất', delta: '03 sai lệch nhỏ', tone: 'ink' },
    ],
    work: [
      { title: 'Duyệt 09 phiếu chi vận hành tháng 09', context: 'Chờ ký giám đốc', due: 'Hôm nay', tone: 'amber', screenKey: 'transactions' },
      { title: 'Nhắc công nợ 18 học viên quá hạn', context: 'Tổng 64.2M · Quá hạn 30+ ngày', due: 'Hôm nay', tone: 'brand', screenKey: 'debts' },
      { title: 'Ghi nhận học phí K48 đợt 2', context: '86 học viên · 258M', due: 'Trước 15/09', tone: 'ink', screenKey: 'tuition' },
      { title: 'Đối soát biên lai KTX tháng 09', context: 'KTX · 428 cư dân', due: 'Ngày 10/09', tone: 'green', screenKey: 'residences' },
    ],
  },
  'japan-partner': {
    headline: 'Đối tác Nhật Bản',
    kpis: [
      { value: '42', label: 'Ứng viên được giới thiệu', delta: 'Đợt tháng 09', tone: 'ink' },
      { value: '18', label: 'Vị trí tuyển dụng mở', delta: '06 xí nghiệp', tone: 'brand' },
      { value: '83%', label: 'Hồ sơ phù hợp yêu cầu', delta: '+5% so với đợt trước', tone: 'green' },
      { value: '06', label: 'Phỏng vấn trong tuần', delta: '14/09 · Trực tuyến', tone: 'amber' },
    ],
    work: [
      { title: 'Xem danh sách đề cử đợt tháng 09', context: '42 ứng viên · 18 vị trí', due: 'Cập nhật 08:45', tone: 'ink', screenKey: 'applications' },
      { title: 'Phản hồi yêu cầu tuyển xí nghiệp Suzuki', context: '12 vị trí · Cơ khí', due: 'Trước 11/09', tone: 'brand', screenKey: 'orders' },
      { title: 'Xác nhận lịch phỏng vấn trực tuyến 14/09', context: '06 ứng viên cuối', due: 'Xác nhận hôm nay', tone: 'amber', screenKey: 'japan-workforce' },
      { title: 'Cập nhật tiến độ hồ sơ COE đợt 3', context: '24 hồ sơ đang xử lý', due: 'Tuần này', tone: 'green', screenKey: 'japan-workforce' },
    ],
  },
  student: {
    headline: 'Hành trình học tập của tôi',
    kpis: [
      { value: 'N4', label: 'Trình độ hiện tại', delta: 'Mục tiêu N3 · 12/2026', tone: 'brand' },
      { value: '86%', label: 'Tiến độ khóa học', delta: 'Đúng kế hoạch', tone: 'green' },
      { value: '94%', label: 'Chuyên cần tháng 09', delta: 'Vắng 01 buổi', tone: 'ink' },
      { value: '2.4tr', label: 'Học phí còn nợ', delta: 'Hạn 15/09', tone: 'amber' },
    ],
    work: [
      { title: 'Kiểm tra cuối kỳ tiếng Nhật N4', context: 'Khảo thí · Phòng A.101', due: '18/09 · 08:00', tone: 'brand', screenKey: 'exam-sessions' },
      { title: 'Nộp học phí đợt 2', context: 'Tài chính · 2.4 triệu đồng', due: 'Trước 15/09', tone: 'amber', screenKey: 'tuition' },
      { title: 'Tải học liệu buổi 12: Kanji N4', context: 'Học liệu số · Giảng viên Phạm Đức Anh', due: 'Tuần này', tone: 'ink', screenKey: 'materials' },
      { title: 'Gửi yêu cầu sửa điện phòng B.204', context: 'KTX · Sự cố dịch vụ', due: 'Cập nhật 07:30', tone: 'green', screenKey: 'service-tickets' },
    ],
  },
}
