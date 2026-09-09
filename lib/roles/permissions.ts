import type { Role, RoleConfig } from '@/lib/types'

export const roleConfigs: Record<Role, RoleConfig> = {
  admin: { label: 'Ban điều hành', subtitle: 'Admin · Toàn quyền hệ thống', description: 'Quản trị toàn bộ phân hệ, duyệt phê duyệt và giám sát vận hành trường.' },
  'student-affairs': { label: 'Công tác học viên', subtitle: 'CTHV · Hồ sơ & Chăm sóc', description: 'Quản lý hồ sơ 360°, ghi danh, biến động học viên và dịch vụ học viên.' },
  japan: { label: 'Nhật Bản', subtitle: 'XKLĐ & Hồ sơ xuất cảnh', description: 'Theo dõi ứng viên XKLĐ, COE/Visa, matching và tiến độ xuất cảnh.' },
  training: { label: 'Phòng đào tạo', subtitle: 'Đào tạo · Khảo thí', description: 'Chương trình, lớp học, lịch giảng, học liệu, khảo thí và kết quả học tập.' },
  teacher: { label: 'Giảng viên', subtitle: 'Giảng dạy · Chấm điểm', description: 'Lớp giảng dạy, điểm danh, học liệu, ngân hàng đề và chấm điểm.' },
  dormitory: { label: 'Ký túc xá', subtitle: 'KTX · Lưu trú & Dịch vụ', description: 'Quản lý phòng, lưu trú, nề nếp và xử lý sự cố dịch vụ học viên.' },
  accounting: { label: 'Kế toán', subtitle: 'Tài chính · Thu chi & Công nợ', description: 'Phiếu thu chi, học phí, công nợ và đối soát tài chính.' },
  'japan-partner': { label: 'Đối tác Nhật Bản', subtitle: 'Nghiệp đoàn · Xí nghiệp', description: 'Theo dõi ứng viên đề cử, vị trí tuyển dụng và tiến độ hồ sơ.' },
  student: { label: 'Học viên', subtitle: 'Người học · Lớp K47A', description: 'Xem lịch học, học liệu, điểm thi, chứng chỉ, học phí và gửi yêu cầu dịch vụ.' },
}

export const roleOrder: Role[] = ['admin', 'student-affairs', 'japan', 'training', 'teacher', 'dormitory', 'accounting', 'japan-partner', 'student']
