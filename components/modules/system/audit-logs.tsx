'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type AuditLog = { code: string; event: string; actor: string; target: string; time: string; status: string }

const seed: AuditLog[] = [
  { code: 'LOG-9001', event: 'Cập nhật quyền menu', actor: 'Nguyễn Quang Admin', target: 'system/permissions', time: '09/09/2026 08:12', status: 'Thành công' },
  { code: 'LOG-9002', event: 'Tạo phiếu thu', actor: 'Trần Thị Kế toán', target: 'accounting/transactions', time: '09/09/2026 07:45', status: 'Thành công' },
  { code: 'LOG-9003', event: 'Đăng nhập thất bại', actor: 'unknown@demo.vn', target: 'auth/session', time: '08/09/2026 23:10', status: 'Bị từ chối' },
  { code: 'LOG-9004', event: 'Xuất báo cáo công nợ', actor: 'Trần Thị Kế toán', target: 'accounting/debts', time: '08/09/2026 16:30', status: 'Thành công' },
]

const columns: ModuleColumn<AuditLog>[] = [
  { key: 'code', header: 'Mã log', render: (row) => row.code },
  { key: 'event', header: 'Sự kiện', render: (row) => <strong>{row.event}</strong> },
  { key: 'actor', header: 'Người thao tác', render: (row) => row.actor },
  { key: 'target', header: 'Đối tượng', render: (row) => <code>{row.target}</code> },
  { key: 'time', header: 'Thời gian', render: (row) => row.time },
  { key: 'status', header: 'Kết quả', render: (row) => <span className={`status-chip ${row.status === 'Thành công' ? '' : 'orange'}`}>{row.status}</span> },
]

export function AuditLogsScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.event} ${row.actor} ${row.target} ${row.status}`}
      createLabel="Ghi nhận sự kiện"
      createRow={(index) => ({ code: `LOG-${9004 + index}`, event: 'Sự kiện mới', actor: 'system', target: '—', time: 'Vừa ghi', status: 'Thành công' })}
    />
  )
}
