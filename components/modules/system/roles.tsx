'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type RoleRow = { code: string; role: string; label: string; scope: string; modules: string; status: string }

const seed: RoleRow[] = [
  { code: 'R-01', role: 'admin', label: 'Quản trị viên', scope: 'Toàn hệ thống', modules: 'Tất cả module', status: 'Đang dùng' },
  { code: 'R-02', role: 'student-affairs', label: 'Công tác học viên', scope: 'Hồ sơ người học', modules: 'Người học · Tuyển sinh · Báo cáo', status: 'Đang dùng' },
  { code: 'R-03', role: 'training', label: 'Phòng đào tạo', scope: 'Đào tạo & khảo thí', modules: 'Đào tạo · Khảo thí · Báo cáo', status: 'Đang dùng' },
  { code: 'R-04', role: 'japan-partner', label: 'Đối tác Nhật Bản', scope: 'Dữ liệu được chia sẻ', modules: 'Đơn hàng · Hồ sơ XKLĐ', status: 'Tạm dừng' },
]

const columns: ModuleColumn<RoleRow>[] = [
  { key: 'code', header: 'Mã role', render: (row) => row.code },
  { key: 'role', header: 'Khóa role', render: (row) => <code>{row.role}</code> },
  { key: 'label', header: 'Tên hiển thị', render: (row) => <strong>{row.label}</strong> },
  { key: 'scope', header: 'Phạm vi dữ liệu', render: (row) => row.scope },
  { key: 'modules', header: 'Module', render: (row) => row.modules },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đang dùng' ? '' : 'orange'}`}>{row.status}</span> },
]

export function RolesScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.role} ${row.label} ${row.scope} ${row.status}`}
      createLabel="Tạo vai trò"
      createRow={(index) => ({ code: `R-${String(4 + index).padStart(2, '0')}`, role: `role-${index}`, label: 'Vai trò mới', scope: '—', modules: 'Chưa gán module', status: 'Nháp' })}
    />
  )
}
