'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Contract = { code: string; tenant: string; room: string; term: string; fee: string; status: string }

const seed: Contract[] = [
  { code: 'HD-CT-101', tenant: 'Nguyễn Minh Anh', room: 'A.201 · Giường 03', term: '01/2026 — 12/2026', fee: '1.200.000đ/tháng', status: 'Còn hiệu lực' },
  { code: 'HD-CT-102', tenant: 'Trần Nhật Nam', room: 'A.203 · Giường 05', term: '02/2026 — 01/2027', fee: '1.200.000đ/tháng', status: 'Còn hiệu lực' },
  { code: 'HD-CT-098', tenant: 'Trần Văn Khang', room: 'B.105 · Giường 02', term: '03/2025 — 02/2026', fee: '1.000.000đ/tháng', status: 'Hết hạn' },
  { code: 'HD-CT-103', tenant: 'Vũ Thị Hoa', room: 'Chưa xếp phòng', term: 'Chờ ký', fee: '—', status: 'Chờ ký' },
]

const columns: ModuleColumn<Contract>[] = [
  { key: 'code', header: 'Mã hợp đồng', render: (row) => row.code },
  { key: 'tenant', header: 'Người ở', render: (row) => <strong>{row.tenant}</strong> },
  { key: 'room', header: 'Phòng', render: (row) => row.room },
  { key: 'term', header: 'Kỳ hạn', render: (row) => row.term },
  { key: 'fee', header: 'Phí ở', render: (row) => row.fee },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Còn hiệu lực' ? '' : 'orange'}`}>{row.status}</span> },
]

export function ResidencesScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.tenant} ${row.room} ${row.term} ${row.status}`}
      createLabel="Tạo hợp đồng"
      createRow={(index) => ({ code: `HD-CT-${103 + index}`, tenant: 'Chọn người học', room: 'Chưa xếp phòng', term: '—', fee: '—', status: 'Nháp' })}
    />
  )
}
