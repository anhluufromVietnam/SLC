'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Transaction = { code: string; type: string; description: string; amount: string; reconcile: string; status: string }

const seed: Transaction[] = [
  { code: 'PT-2201', type: 'Phiếu thu', description: 'Học phí tháng 09 · Nguyễn Minh Anh', amount: '+6.000.000đ', reconcile: 'Đã đối soát', status: 'Hoàn tất' },
  { code: 'PC-3301', type: 'Phiếu chi', description: 'Mua thiết bị phòng học A.203', amount: '-12.500.000đ', reconcile: 'Đã đối soát', status: 'Hoàn tất' },
  { code: 'PT-2202', type: 'Phiếu thu', description: 'Phí ở KTX tháng 09 · K47A', amount: '+33.600.000đ', reconcile: 'Chờ đối soát', status: 'Chờ duyệt' },
  { code: 'PC-3302', type: 'Phiếu chi', description: 'Sửa điều hòa phòng B.105', amount: '-2.400.000đ', reconcile: 'Chờ hóa đơn', status: 'Chờ duyệt' },
]

const columns: ModuleColumn<Transaction>[] = [
  { key: 'code', header: 'Số phiếu', render: (row) => row.code },
  { key: 'type', header: 'Loại', render: (row) => <strong>{row.type}</strong> },
  { key: 'description', header: 'Nội dung', render: (row) => row.description },
  { key: 'amount', header: 'Số tiền', render: (row) => row.amount },
  { key: 'reconcile', header: 'Đối soát', render: (row) => row.reconcile },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Hoàn tất' ? '' : 'orange'}`}>{row.status}</span> },
]

export function TransactionsScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.type} ${row.description} ${row.amount} ${row.status}`}
      createLabel="Tạo phiếu"
      createRow={(index) => ({ code: `PT-${2202 + index}`, type: 'Phiếu thu', description: 'Nội dung mới', amount: '—', reconcile: 'Chờ đối soát', status: 'Nháp' })}
    />
  )
}
