'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Order = { code: string; position: string; partner: string; quota: string; requirement: string; status: string }

const seed: Order[] = [
  { code: 'DH-501', position: 'Thợ hàn', partner: 'Toshiba Kyushu', quota: '12 / 15', requirement: 'N4, kinh nghiệm 1 năm', status: 'Đang tuyển' },
  { code: 'DH-502', position: 'Công nhân thực phẩm', partner: 'Marudai Food', quota: '08 / 08', requirement: 'N4, sức khỏe tốt', status: 'Đủ chỉ tiêu' },
  { code: 'DH-503', position: 'Vận hành máy CNC', partner: 'Denso Hiroshima', quota: '05 / 10', requirement: 'N3, tay nghề cao', status: 'Đang tuyển' },
  { code: 'DH-504', position: 'Chăm sóc người cao tuổi', partner: 'SOMPO Care', quota: '10 / 12', requirement: 'N4, chứng chỉ chăm sóc', status: 'Đang tuyển' },
]

const columns: ModuleColumn<Order>[] = [
  { key: 'code', header: 'Mã đơn hàng', render: (row) => row.code },
  { key: 'position', header: 'Vị trí tuyển', render: (row) => <strong>{row.position}</strong> },
  { key: 'partner', header: 'Đối tác', render: (row) => row.partner },
  { key: 'quota', header: 'Chỉ tiêu', render: (row) => row.quota },
  { key: 'requirement', header: 'Điều kiện', render: (row) => row.requirement },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đủ chỉ tiêu' ? '' : 'orange'}`}>{row.status}</span> },
]

export function OrdersScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.position} ${row.partner} ${row.requirement} ${row.status}`}
      createLabel="Tạo đơn hàng"
      createRow={(index) => ({ code: `DH-${504 + index}`, position: 'Vị trí mới', partner: 'Chọn đối tác', quota: '00 / 00', requirement: '—', status: 'Nháp' })}
    />
  )
}
