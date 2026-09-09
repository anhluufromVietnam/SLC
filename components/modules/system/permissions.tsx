'use client'

import { useMemo, useState } from 'react'
import { ShieldCheck } from 'lucide-react'
import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'
import { navigationCatalog } from '@/lib/navigation/catalog'
import { roleConfigs, roleOrder } from '@/lib/roles/permissions'
import type { Role } from '@/lib/types'

type UserRow = { code: string; user: string; role: string; menus: string; updated: string; status: string }

const seed: UserRow[] = [
  { code: 'ND-01', user: 'Nguyễn Quang Hải', role: 'admin', menus: 'Tất cả phân hệ', updated: '08/09/2026', status: 'Hoạt động' },
  { code: 'ND-02', user: 'Phạm Thu Trang', role: 'student-affairs', menus: 'Người học · KTX · Báo cáo', updated: '05/09/2026', status: 'Hoạt động' },
  { code: 'ND-03', user: 'Lê Văn Nhật', role: 'japan', menus: 'XKLĐ · Tuyển sinh · Báo cáo', updated: '05/09/2026', status: 'Hoạt động' },
  { code: 'ND-04', user: 'Trần Thị Lan', role: 'training', menus: 'Đào tạo · Khảo thí · Báo cáo', updated: '01/09/2026', status: 'Hoạt động' },
  { code: 'ND-05', user: 'Phạm Đức Anh', role: 'teacher', menus: 'Lớp học · Học liệu · Chấm điểm', updated: '02/09/2026', status: 'Hoạt động' },
  { code: 'ND-06', user: 'Vũ Minh Khoa', role: 'dormitory', menus: 'KTX · Người học · Báo cáo', updated: '04/09/2026', status: 'Hoạt động' },
  { code: 'ND-07', user: 'Hoàng Thị Nhung', role: 'accounting', menus: 'Tài chính · KTX phí · Báo cáo', updated: '28/08/2026', status: 'Bị khóa' },
  { code: 'ND-08', user: 'Tanaka Kenji', role: 'japan-partner', menus: 'Đơn hàng · Ứng viên đề cử', updated: '07/09/2026', status: 'Hoạt động' },
  { code: 'ND-09', user: 'Ngô Thanh Tùng', role: 'student', menus: 'Lịch học · Học liệu · Kỳ thi · Học phí', updated: '07/09/2026', status: 'Hoạt động' },
]

const columns: ModuleColumn<UserRow>[] = [
  { key: 'code', header: 'Mã ND', render: (row) => <code>{row.code}</code> },
  { key: 'user', header: 'Người dùng', render: (row) => <strong>{row.user}</strong> },
  { key: 'role', header: 'Vai trò', render: (row) => <span className="role-chip">{roleConfigs[row.role as Role]?.label ?? row.role}</span> },
  { key: 'menus', header: 'Phân hệ được gán', render: (row) => row.menus },
  { key: 'updated', header: 'Cập nhật', render: (row) => row.updated },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Hoạt động' ? '' : 'orange'}`}>{row.status}</span> },
]

const matrixDomains = navigationCatalog.filter((domain) => domain.key !== 'overview')

function PermissionMatrix() {
  const [granted, setGranted] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {}
    for (const domain of matrixDomains) {
      for (const role of roleOrder) {
        initial[`${role}|${domain.key}`] = domain.screens.some((screen) => screen.roles.includes(role))
      }
    }
    return initial
  })
  const [selectedRole, setSelectedRole] = useState<Role>('admin')
  const selectedScreens = useMemo(() => {
    const domain = matrixDomains.find((item) => item.key === 'learners')
    return domain ? domain.screens : []
  }, [])
  const totalGranted = roleOrder.reduce((total, role) => total + matrixDomains.filter((domain) => granted[`${role}|${domain.key}`]).length, 0)

  return (
    <div className="panel matrix-panel">
      <div className="panel-heading">
        <div>
          <div className="mini-label">MA TRẬN PHÂN QUYỀN</div>
          <h2>9 vai trò × {matrixDomains.length} phân hệ</h2>
          <p>Tick để gán phân hệ cho vai trò — trạng thái hiện tại nạp từ catalog phân quyền, lưu realtime vào system/permissions</p>
        </div>
        <div className="matrix-meta"><ShieldCheck size={18} /> {totalGranted} quyền đang bật</div>
      </div>
      <div className="matrix-scroll">
        <table className="module-table matrix-table">
          <thead>
            <tr>
              <th>Vai trò</th>
              {matrixDomains.map((domain) => <th key={domain.key}>{domain.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {roleOrder.map((role) => (
              <tr key={role} className={selectedRole === role ? 'matrix-row-active' : ''}>
                <td>
                  <button className="matrix-role" onClick={() => setSelectedRole(role)}>
                    <span className="role-chip">{roleConfigs[role].label}</span>
                    <small>{roleConfigs[role].subtitle}</small>
                  </button>
                </td>
                {matrixDomains.map((domain) => {
                  const key = `${role}|${domain.key}`
                  const screenCount = domain.screens.filter((screen) => screen.roles.includes(role)).length
                  return (
                    <td key={domain.key}>
                      <label className="matrix-check">
                        <input type="checkbox" checked={Boolean(granted[key])} onChange={(event) => setGranted((current) => ({ ...current, [key]: event.target.checked }))} aria-label={`Gán ${domain.label} cho ${roleConfigs[role].label}`} />
                        <small>{granted[key] ? `${screenCount} màn hình` : '—'}</small>
                      </label>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="matrix-detail">
        <div className="mini-label">CHI TIẾT MÀN HÌNH · {roleConfigs[selectedRole].label.toUpperCase()}</div>
        <p>Vai trò {roleConfigs[selectedRole].label} đang được mở {selectedScreens.length} màn hình trong phân hệ Người học. Bảng trên điều khiển quyền cấp phân hệ; quyền cấp màn hình được cấu hình theo từng vai trò trong catalog.</p>
      </div>
    </div>
  )
}

export function PermissionsScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.user} ${row.role} ${row.menus} ${row.status}`}
      createLabel="Thêm người dùng"
      createRow={(index) => ({ code: `ND-${String(8 + index).padStart(2, '0')}`, user: 'Người dùng mới', role: 'student-affairs', menus: 'Chưa gán phân hệ', updated: 'Vừa tạo', status: 'Nháp' })}
      extra={<PermissionMatrix />}
    />
  )
}
