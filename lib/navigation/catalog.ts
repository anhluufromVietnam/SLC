import type { Role } from '@/lib/types'

export type NavigationScreen = {
  key: string
  label: string
  moduleKey: string
  dataPath: string
  roles: Role[]
  description: string
}

export type NavigationDomain = {
  key: string
  label: string
  description: string
  screens: NavigationScreen[]
}

const allRoles: Role[] = ['admin', 'student-affairs', 'japan', 'training', 'teacher', 'dormitory', 'accounting', 'japan-partner', 'student']
const staffRoles: Role[] = ['admin', 'student-affairs', 'japan', 'training', 'teacher', 'dormitory', 'accounting', 'japan-partner']

export const navigationCatalog: NavigationDomain[] = [
  { key: 'overview', label: 'Tổng quan', description: 'Bảng điều hành theo vai trò', screens: [{ key: 'overview', label: 'Tổng quan', moduleKey: 'overview', dataPath: 'dashboardSnapshots', roles: allRoles, description: 'KPI và việc cần xử lý theo vai trò' }] },
  { key: 'learners', label: 'Người học', description: 'Hồ sơ, chăm sóc và tiến trình học viên', screens: [
    { key: 'learner-list', label: 'Danh sách người học', moduleKey: 'student-list', dataPath: 'students', roles: staffRoles, description: 'Tìm kiếm, lọc và quản lý hồ sơ' },
    { key: 'learner-profile', label: 'Hồ sơ người học', moduleKey: 'student-profile', dataPath: 'studentProfiles', roles: ['admin', 'student-affairs', 'japan', 'accounting'], description: 'Thông tin cá nhân và lịch sử' },
    { key: 'learner-care', label: 'Chăm sóc người học', moduleKey: 'student-care', dataPath: 'studentCareTickets', roles: ['admin', 'student-affairs'], description: 'Yêu cầu hỗ trợ và nhắc việc' },
  ] },
  { key: 'recruitment', label: 'Tuyển sinh & Đơn hàng', description: 'Nguồn tuyển, ứng viên và nhu cầu Nhật Bản', screens: [
    { key: 'applications', label: 'Hồ sơ tuyển sinh', moduleKey: 'applications', dataPath: 'applications', roles: ['admin', 'student-affairs', 'japan', 'japan-partner'], description: 'Pipeline ứng viên và trạng thái hồ sơ' },
    { key: 'orders', label: 'Đơn hàng tuyển dụng', moduleKey: 'orders', dataPath: 'recruitmentOrders', roles: ['admin', 'japan', 'japan-partner'], description: 'Vị trí, điều kiện và chỉ tiêu' },
    { key: 'japan-partners', label: 'Đối tác Nhật Bản', moduleKey: 'partners', dataPath: 'japanPartners', roles: ['admin', 'japan', 'japan-partner'], description: 'Doanh nghiệp và lịch sử hợp tác' },
    { key: 'japan-workforce', label: 'Hồ sơ XKLĐ', moduleKey: 'japan-workforce', dataPath: 'japanApplications', roles: ['admin', 'japan', 'japan-partner'], description: 'Tiến độ hồ sơ xuất khẩu lao động' },
  ] },
  { key: 'training', label: 'Đào tạo', description: 'Chương trình, lớp, lịch và học liệu', screens: [
    { key: 'courses', label: 'Chương trình đào tạo', moduleKey: 'courses', dataPath: 'courses', roles: ['admin', 'training'], description: 'Khung chương trình và học phần' },
    { key: 'classes', label: 'Lớp học', moduleKey: 'classes', dataPath: 'classes', roles: ['admin', 'training', 'teacher'], description: 'Danh sách lớp và giảng viên' },
    { key: 'schedules', label: 'Lịch học', moduleKey: 'schedules', dataPath: 'classSchedules', roles: ['admin', 'training', 'teacher', 'student-affairs', 'student'], description: 'Lịch phòng, lịch giảng và điểm danh' },
    { key: 'materials', label: 'Học liệu', moduleKey: 'materials', dataPath: 'learningMaterials', roles: ['admin', 'training', 'teacher', 'student'], description: 'Tài liệu và phiên bản phát hành' },
  ] },
  { key: 'assessment', label: 'Khảo thí & Chứng chỉ', description: 'Đề thi, kết quả và chứng nhận', screens: [
    { key: 'exam-bank', label: 'Ngân hàng đề thi', moduleKey: 'exams', dataPath: 'examBank', roles: ['admin', 'training', 'teacher'], description: 'Câu hỏi, ma trận và phiên bản đề' },
    { key: 'exam-sessions', label: 'Kỳ thi', moduleKey: 'exam-sessions', dataPath: 'examSessions', roles: ['admin', 'training', 'teacher', 'student'], description: 'Lịch thi và phòng thi' },
    { key: 'grading', label: 'Chấm điểm', moduleKey: 'grading', dataPath: 'grades', roles: ['admin', 'training', 'teacher', 'student'], description: 'Nhập, duyệt và khóa điểm' },
    { key: 'certificates', label: 'Chứng chỉ', moduleKey: 'certificates', dataPath: 'certificates', roles: ['admin', 'training', 'student-affairs', 'student'], description: 'Phát hành và tra cứu chứng chỉ' },
  ] },
  { key: 'dormitory', label: 'KTX & Dịch vụ', description: 'Phòng ở, cư trú và yêu cầu dịch vụ', screens: [
    { key: 'rooms', label: 'Phòng ở', moduleKey: 'dormitory', dataPath: 'dormitories/rooms', roles: ['admin', 'dormitory'], description: 'Sơ đồ phòng và công suất' },
    { key: 'residences', label: 'Hợp đồng cư trú', moduleKey: 'residences', dataPath: 'dormitories/contracts', roles: ['admin', 'dormitory', 'accounting'], description: 'Hợp đồng, kỳ hạn và phí' },
    { key: 'service-tickets', label: 'Sự cố & yêu cầu', moduleKey: 'service-tickets', dataPath: 'serviceTickets', roles: ['admin', 'dormitory', 'student-affairs', 'student'], description: 'Tiếp nhận và phân công xử lý' },
  ] },
  { key: 'finance', label: 'Tài chính', description: 'Thu chi, học phí và công nợ', screens: [
    { key: 'transactions', label: 'Thu chi', moduleKey: 'accounting', dataPath: 'accounting/transactions', roles: ['admin', 'accounting'], description: 'Phiếu thu, phiếu chi và đối soát' },
    { key: 'tuition', label: 'Học phí', moduleKey: 'tuition', dataPath: 'accounting/tuition', roles: ['admin', 'accounting', 'student-affairs', 'student'], description: 'Biểu phí và các khoản phải thu' },
    { key: 'debts', label: 'Công nợ', moduleKey: 'debts', dataPath: 'accounting/debts', roles: ['admin', 'accounting'], description: 'Theo dõi và nhắc công nợ' },
    { key: 'bank-accounts', label: 'Tài khoản ngân hàng', moduleKey: 'bank-accounts', dataPath: 'accounting/bankAccounts', roles: ['admin', 'accounting'], description: 'Thông tin tài khoản ngân hàng ban quản trị' },
  ] },
  { key: 'reports', label: 'Báo cáo & Điều hành', description: 'Báo cáo vận hành và chỉ số quản trị', screens: [
    { key: 'reports', label: 'Báo cáo tổng hợp', moduleKey: 'reports', dataPath: 'reports', roles: staffRoles, description: 'Báo cáo theo phòng ban' },
    { key: 'operations', label: 'Điều hành công việc', moduleKey: 'operations', dataPath: 'operations', roles: ['admin', 'student-affairs', 'training', 'japan', 'dormitory', 'accounting'], description: 'Danh sách việc và SLA' },
  ] },
  { key: 'system', label: 'Quản trị hệ thống', description: 'Người dùng, quyền và cấu hình nền tảng', screens: [
    { key: 'permissions', label: 'Người dùng & Phân quyền', moduleKey: 'permissions', dataPath: 'system/permissions', roles: ['admin'], description: 'Gán role và menu bằng checkbox' },
    { key: 'roles', label: 'Vai trò', moduleKey: 'roles', dataPath: 'system/roles', roles: ['admin'], description: 'Định nghĩa role nghiệp vụ' },
    { key: 'audit-logs', label: 'Nhật ký hệ thống', moduleKey: 'audit-logs', dataPath: 'system/auditLogs', roles: ['admin'], description: 'Theo dõi thay đổi và truy cập' },
    { key: 'settings', label: 'Cấu hình', moduleKey: 'settings', dataPath: 'system/settings', roles: ['admin'], description: 'Cấu hình chung và tích hợp' },
  ] },
]

export const navigationScreens = navigationCatalog.flatMap((domain) => domain.screens)
export const getScreen = (key: string) => navigationScreens.find((screen) => screen.key === key) ?? navigationScreens[0]
export const visibleDomains = (role: Role) => navigationCatalog.map((domain) => ({ ...domain, screens: domain.screens.filter((screen) => screen.roles.includes(role)) })).filter((domain) => domain.screens.length > 0)
