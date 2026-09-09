'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Debt = { code: string; debtor: string; origin: string; amount: string; reminder: string; status: string }

const seed: Debt[] = [
  { code: 'CN-501', debtor: 'Lê Hoàng Yến', origin: 'Học phí kỳ 3 tháng', amount: '9.000.000đ', reminder: 'Nhắc lần 2 · 07/09', status: 'Quá hạn' },
  { code: 'CN-502', debtor: 'Trần Nhật Nam', origin: 'Học phí tháng 09', amount: '6.000.000đ', reminder: 'Chưa nhắc', status: 'Đến hạn' },
  { code: 'CN-503', debtor: 'Trần Văn Khang', origin: 'Phí ở KTX tháng 07-08', amount: '2.000.000đ', reminder: 'Nhắc lần 3 · 01/09', status: 'Quá hạn' },
  { code: 'CN-500', debtor: 'Phạm Đức Long', origin: 'Học phí kỳ cuối', amount: '6.000.000đ', reminder: 'Đã thanh toán', status: 'Đã tất toán' },
]

const columns: ModuleColumn<Debt>[] = [
  { key: 'code', header: 'Mã công nợ', render: (row) => row.code },
  { key: 'debtor', header: 'Đối tượng', render: (row) => <strong>{row.debtor}</strong> },
  { key: 'origin', header: 'Nguồn phát sinh', render: (row) => row.origin },
  { key: 'amount', header: 'Số tiền', render: (row) => row.amount },
  { key: 'reminder', header: 'Nhắc hạn', render: (row) => row.reminder },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đã tất toán' ? '' : 'orange'}`}>{row.status}</span> },
]

export function DebtsScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.debtor} ${row.origin} ${row.amount} ${row.status}`}
      createLabel="Ghi nhận công nợ"
      createRow={(index) => ({ code: `CN-${503 + index}`, debtor: 'Chọn đối tượng', origin: '—', amount: '—', reminder: 'Chưa nhắc', status: 'Nháp' })}
    />
  )
}
