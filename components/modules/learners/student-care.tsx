'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Ticket = { code: string; student: string; topic: string; assignee: string; sla: string; status: string }

const seed: Ticket[] = [
  { code: 'CS-201', student: 'Trần Nhật Nam', topic: 'Bổ sung giấy tờ khám sức khỏe', assignee: 'Công tác học viên', sla: 'Hôm nay', status: 'Đang xử lý' },
  { code: 'CS-202', student: 'Lê Hoàng Yến', topic: 'Yêu cầu bảo lưu học vụ', assignee: 'Phòng đào tạo', sla: '02/09 — Quá hạn', status: 'Quá hạn' },
  { code: 'CS-203', student: 'Nguyễn Minh Anh', topic: 'Cập nhật số điện thoại liên hệ', assignee: 'Công tác học viên', sla: '11/09', status: 'Đang xử lý' },
  { code: 'CS-204', student: 'Phạm Đức Long', topic: 'Xác nhận hoàn thành chương trình', assignee: 'Phòng đào tạo', sla: 'Đã xong', status: 'Hoàn tất' },
]

const columns: ModuleColumn<Ticket>[] = [
  { key: 'code', header: 'Mã ticket', render: (row) => row.code },
  { key: 'student', header: 'Người học', render: (row) => <strong>{row.student}</strong> },
  { key: 'topic', header: 'Nội dung', render: (row) => row.topic },
  { key: 'assignee', header: 'Phân công', render: (row) => row.assignee },
  { key: 'sla', header: 'SLA', render: (row) => row.sla },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Hoàn tất' ? '' : 'orange'}`}>{row.status}</span> },
]

export function StudentCareScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.student} ${row.topic} ${row.assignee} ${row.status}`}
      createLabel="Tạo ticket"
      createRow={(index) => ({ code: `CS-${204 + index}`, student: 'Chọn người học', topic: 'Yêu cầu hỗ trợ mới', assignee: 'Chưa phân công', sla: '—', status: 'Nháp' })}
    />
  )
}
