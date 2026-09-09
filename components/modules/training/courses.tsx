'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Course = { code: string; name: string; modules: string; version: string; approval: string; status: string }

const seed: Course[] = [
  { code: 'CT-N4', name: 'Tiếng Nhật N4 cơ bản', modules: '06 học phần', version: 'v2.1', approval: 'Đã phê duyệt', status: 'Đang giảng dạy' },
  { code: 'CT-N3', name: 'Tiếng Nhật N3 nâng cao', modules: '08 học phần', version: 'v1.3', approval: 'Đã phê duyệt', status: 'Đang giảng dạy' },
  { code: 'CT-DH', name: 'Định hướng xuất cảnh & văn hóa', modules: '04 học phần', version: 'v1.0', approval: 'Chờ duyệt', status: 'Nháp' },
  { code: 'CT-TC', name: 'Tay nghề theo đơn hàng', modules: '10 học phần', version: 'v3.0', approval: 'Đã phê duyệt', status: 'Đang giảng dạy' },
]

const columns: ModuleColumn<Course>[] = [
  { key: 'code', header: 'Mã CT', render: (row) => row.code },
  { key: 'name', header: 'Chương trình', render: (row) => <strong>{row.name}</strong> },
  { key: 'modules', header: 'Học phần', render: (row) => row.modules },
  { key: 'version', header: 'Phiên bản', render: (row) => <code>{row.version}</code> },
  { key: 'approval', header: 'Phê duyệt', render: (row) => row.approval },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đang giảng dạy' ? '' : 'orange'}`}>{row.status}</span> },
]

export function CoursesScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.name} ${row.version} ${row.approval} ${row.status}`}
      createLabel="Tạo chương trình"
      createRow={(index) => ({ code: `CT-${index}`, name: 'Chương trình mới', modules: '00 học phần', version: 'v0.1', approval: 'Chờ duyệt', status: 'Nháp' })}
    />
  )
}
