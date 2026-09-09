'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type ServiceTicket = { code: string; request: string; room: string; assignee: string; sla: string; status: string }

const seed: ServiceTicket[] = [
  { code: 'SC-401', request: 'Điều hòa phòng B.105 không lạnh', room: 'B.105', assignee: 'Bảo trì KTX', sla: '10/09', status: 'Đang xử lý' },
  { code: 'SC-402', request: 'Vòi nước phòng A.201 bị rò', room: 'A.201', assignee: 'Bảo trì KTX', sla: '08/09 — Quá hạn', status: 'Quá hạn' },
  { code: 'SC-403', request: 'Xin chuyển giường sang tòa A', room: 'B.105', assignee: 'Bộ phận KTX', sla: '12/09', status: 'Chờ duyệt' },
  { code: 'SC-400', request: 'Thay bóng đèn hành lang tòa A', room: 'Tòa A', assignee: 'Bảo trì KTX', sla: 'Đã xong', status: 'Hoàn tất' },
]

const columns: ModuleColumn<ServiceTicket>[] = [
  { key: 'code', header: 'Mã yêu cầu', render: (row) => row.code },
  { key: 'request', header: 'Nội dung', render: (row) => <strong>{row.request}</strong> },
  { key: 'room', header: 'Phòng', render: (row) => row.room },
  { key: 'assignee', header: 'Phân công', render: (row) => row.assignee },
  { key: 'sla', header: 'SLA', render: (row) => row.sla },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Hoàn tất' ? '' : 'orange'}`}>{row.status}</span> },
]

export function ServiceTicketsScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.request} ${row.room} ${row.assignee} ${row.status}`}
      createLabel="Tạo yêu cầu"
      createRow={(index) => ({ code: `SC-${403 + index}`, request: 'Yêu cầu mới', room: '—', assignee: 'Chưa phân công', sla: '—', status: 'Nháp' })}
    />
  )
}
