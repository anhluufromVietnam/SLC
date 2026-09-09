import type { Notice } from '@/lib/types'

export const notices: Notice[] = [
  { title: '03 hồ sơ cần bổ sung giấy tờ', detail: 'SLA xử lý trong hôm nay', tone: 'orange' },
  { title: 'Lịch đào tạo tháng 09 đã cập nhật', detail: 'Phòng Đào tạo vừa đăng thông báo', tone: 'blue' },
  { title: '12 học viên hoàn thành hồ sơ', detail: 'Dữ liệu đồng bộ lúc 08:45', tone: 'green' },
]

export const schedule = [
  { time: '08:00 — 10:00', title: 'Tiếng Nhật N4 · Lớp K47A', room: 'Phòng A.203', status: 'Đang diễn ra' },
  { time: '13:30 — 15:30', title: 'Định hướng xuất cảnh · K47B', room: 'Phòng hội trường', status: 'Sắp diễn ra' },
]
