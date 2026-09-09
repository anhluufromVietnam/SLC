'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Partner = { code: string; company: string; contact: string; orders: string; history: string; status: string }

const seed: Partner[] = [
  { code: 'PT-11', company: 'Toshiba Kyushu', contact: 'Sato Kenji · sato@toshiba.co.jp', orders: '03 đơn hàng', history: 'Hợp tác từ 2019', status: 'Đang hợp tác' },
  { code: 'PT-12', company: 'Marudai Food', contact: 'Tanaka Aoi · tanaka@marudai.jp', orders: '02 đơn hàng', history: 'Hợp tác từ 2021', status: 'Đang hợp tác' },
  { code: 'PT-13', company: 'Denso Hiroshima', contact: 'Yamada Riku · yamada@denso.jp', orders: '01 đơn hàng', history: 'Ký kết 2024', status: 'Đang hợp tác' },
  { code: 'PT-14', company: 'SOMPO Care', contact: 'Suzuki Hana · suzuki@sompo.jp', orders: '01 đơn hàng', history: 'Đàm phán lại 08/2026', status: 'Tạm dừng' },
]

const columns: ModuleColumn<Partner>[] = [
  { key: 'code', header: 'Mã đối tác', render: (row) => row.code },
  { key: 'company', header: 'Doanh nghiệp', render: (row) => <strong>{row.company}</strong> },
  { key: 'contact', header: 'Đầu mối liên hệ', render: (row) => row.contact },
  { key: 'orders', header: 'Đơn hàng', render: (row) => row.orders },
  { key: 'history', header: 'Lịch sử hợp tác', render: (row) => row.history },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đang hợp tác' ? '' : 'orange'}`}>{row.status}</span> },
]

export function PartnersScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.company} ${row.contact} ${row.history} ${row.status}`}
      createLabel="Thêm đối tác"
      createRow={(index) => ({ code: `PT-${14 + index}`, company: 'Doanh nghiệp mới', contact: '—', orders: '0 đơn hàng', history: 'Mới ký kết', status: 'Nháp' })}
    />
  )
}
