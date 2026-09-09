'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Certificate = { code: string; holder: string; type: string; issued: string; lookup: string; status: string }

const seed: Certificate[] = [
  { code: 'CC-2026-011', holder: 'Phạm Đức Long', type: 'Chứng chỉ hoàn thành N3', issued: '01/09/2026', lookup: 'Tra cứu 12 lần', status: 'Còn hiệu lực' },
  { code: 'CC-2026-012', holder: 'Nguyễn Minh Anh', type: 'Chứng chỉ hoàn thành N4', issued: '28/08/2026', lookup: 'Tra cứu 05 lần', status: 'Còn hiệu lực' },
  { code: 'CC-2026-008', holder: 'Trần Văn Khang', type: 'Chứng chỉ tay nghề hàn', issued: '15/06/2026', lookup: 'Tra cứu 02 lần', status: 'Đã thu hồi' },
  { code: 'CC-2026-013', holder: 'Lê Hoàng Yến', type: 'Chứng chỉ hoàn thành N4', issued: 'Chờ phát hành', lookup: '—', status: 'Chờ duyệt' },
]

const columns: ModuleColumn<Certificate>[] = [
  { key: 'code', header: 'Số chứng chỉ', render: (row) => row.code },
  { key: 'holder', header: 'Người nhận', render: (row) => <strong>{row.holder}</strong> },
  { key: 'type', header: 'Loại chứng chỉ', render: (row) => row.type },
  { key: 'issued', header: 'Ngày cấp', render: (row) => row.issued },
  { key: 'lookup', header: 'Tra cứu', render: (row) => row.lookup },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Còn hiệu lực' ? '' : 'orange'}`}>{row.status}</span> },
]

export function CertificatesScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.holder} ${row.type} ${row.status}`}
      createLabel="Cấp chứng chỉ"
      createRow={(index) => ({ code: `CC-2026-${String(13 + index).padStart(3, '0')}`, holder: 'Chọn người học', type: 'Chọn loại', issued: '—', lookup: '—', status: 'Nháp' })}
    />
  )
}
