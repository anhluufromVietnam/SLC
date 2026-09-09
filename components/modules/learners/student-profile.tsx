'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Profile = { code: string; name: string; documents: string; timeline: string; attachments: string; status: string }

const seed: Profile[] = [
  { code: 'MID-88001', name: 'Nguyễn Minh Anh', documents: '05/05 hồ sơ ghi danh', timeline: 'Ghi danh → Đang học', attachments: '12 file số hóa', status: 'Đầy đủ' },
  { code: 'MID-88002', name: 'Trần Nhật Nam', documents: '04/05 hồ sơ ghi danh', timeline: 'Ghi danh → Đang học', attachments: '08 file số hóa', status: 'Thiếu 1 giấy tờ' },
  { code: 'MID-88003', name: 'Lê Hoàng Yến', documents: '05/05 hồ sơ ghi danh', timeline: 'Ghi danh → Bảo lưu', attachments: '10 file số hóa', status: 'Đầy đủ' },
  { code: 'MID-88004', name: 'Phạm Đức Long', documents: '05/05 hồ sơ ghi danh', timeline: 'Ghi danh → Hoàn thành', attachments: '15 file số hóa', status: 'Đầy đủ' },
]

const columns: ModuleColumn<Profile>[] = [
  { key: 'code', header: 'Master ID', render: (row) => <code>{row.code}</code> },
  { key: 'name', header: 'Họ tên', render: (row) => <strong>{row.name}</strong> },
  { key: 'documents', header: 'Hồ sơ ghi danh', render: (row) => row.documents },
  { key: 'timeline', header: 'Vòng đời', render: (row) => row.timeline },
  { key: 'attachments', header: 'Tài liệu', render: (row) => row.attachments },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đầy đủ' ? '' : 'orange'}`}>{row.status}</span> },
]

export function StudentProfileScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.name} ${row.documents} ${row.timeline} ${row.status}`}
      createLabel="Tạo hồ sơ"
      createRow={(index) => ({ code: `MID-${88004 + index}`, name: 'Hồ sơ mới', documents: '00/05 hồ sơ ghi danh', timeline: 'Ghi danh', attachments: '0 file', status: 'Nháp' })}
    />
  )
}
