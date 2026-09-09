'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Task = { code: string; task: string; assignee: string; stage: string; sla: string; status: string }

const seed: Task[] = [
  { code: 'VH-701', task: 'Duyệt 03 hồ sơ bổ sung giấy tờ', assignee: 'Công tác học viên', stage: 'To do', sla: 'Hôm nay', status: 'Quá hạn SLA' },
  { code: 'VH-702', task: 'Chuẩn bị lịch thi cuối module N4', assignee: 'Phòng đào tạo', stage: 'In progress', sla: '11/09', status: 'Đang làm' },
  { code: 'VH-703', task: 'Đối soát phí ở KTX tháng 08', assignee: 'Kế toán', stage: 'In progress', sla: '12/09', status: 'Đang làm' },
  { code: 'VH-700', task: 'Gửi danh sách ứng viên cho Toshiba', assignee: 'Nhật Bản', stage: 'Done', sla: 'Đã xong', status: 'Hoàn tất' },
]

const columns: ModuleColumn<Task>[] = [
  { key: 'code', header: 'Mã việc', render: (row) => row.code },
  { key: 'task', header: 'Công việc', render: (row) => <strong>{row.task}</strong> },
  { key: 'assignee', header: 'Phân công', render: (row) => row.assignee },
  { key: 'stage', header: 'Kanban', render: (row) => row.stage },
  { key: 'sla', header: 'SLA', render: (row) => row.sla },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Hoàn tất' ? '' : 'orange'}`}>{row.status}</span> },
]

export function OperationsScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.task} ${row.assignee} ${row.stage} ${row.status}`}
      createLabel="Tạo công việc"
      createRow={(index) => ({ code: `VH-${703 + index}`, task: 'Công việc mới', assignee: 'Chưa phân công', stage: 'To do', sla: '—', status: 'Nháp' })}
    />
  )
}
