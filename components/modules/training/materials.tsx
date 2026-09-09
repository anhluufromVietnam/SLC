'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Material = { code: string; name: string; type: string; version: string; access: string; status: string }

const seed: Material[] = [
  { code: 'HL-41', name: 'Giáo trình Minna N4 · PDF', type: 'PDF · 24MB', version: 'v2.1', access: 'Giảng viên + Học viên', status: 'Đã phát hành' },
  { code: 'HL-42', name: 'Bộ slide định hướng XKLĐ', type: 'PPTX · 12MB', version: 'v1.4', access: 'Giảng viên', status: 'Đã phát hành' },
  { code: 'HL-43', name: 'Ngân audio luyện nghe N3', type: 'MP3 · 180MB', version: 'v1.0', access: 'Học viên K46C', status: 'Bản nháp' },
  { code: 'HL-44', name: 'Video tay nghề hàn cơ bản', type: 'MP4 · 420MB', version: 'v1.2', access: 'Giảng viên tay nghề', status: 'Đã phát hành' },
]

const columns: ModuleColumn<Material>[] = [
  { key: 'code', header: 'Mã học liệu', render: (row) => row.code },
  { key: 'name', header: 'Tài liệu', render: (row) => <strong>{row.name}</strong> },
  { key: 'type', header: 'Định dạng', render: (row) => row.type },
  { key: 'version', header: 'Phiên bản', render: (row) => <code>{row.version}</code> },
  { key: 'access', header: 'Phân quyền', render: (row) => row.access },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đã phát hành' ? '' : 'orange'}`}>{row.status}</span> },
]

export function MaterialsScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.name} ${row.type} ${row.access} ${row.status}`}
      createLabel="Upload học liệu"
      createRow={(index) => ({ code: `HL-${44 + index}`, name: 'Học liệu mới', type: '—', version: 'v0.1', access: 'Giảng viên', status: 'Nháp' })}
    />
  )
}
