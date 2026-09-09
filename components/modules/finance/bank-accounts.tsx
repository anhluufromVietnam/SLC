'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type BankAccount = { code: string; bank: string; accountNumber: string; accountName: string; branch: string; type: string; status: string }

const seed: BankAccount[] = [
  { code: 'TK-001', bank: 'Vietcombank', accountNumber: '1234567890', accountName: 'CÔNG TY SULECO', branch: 'Chi nhánh Hà Nội', type: 'Thanh toán', status: 'Đang sử dụng' },
  { code: 'TK-002', bank: 'BIDV', accountNumber: '9876543210', accountName: 'CÔNG TY SULECO', branch: 'Chi nhánh Cầu Giấy', type: 'Tiết kiệm', status: 'Đang sử dụng' },
  { code: 'TK-003', bank: 'Techcombank', accountNumber: '1122334455', accountName: 'CÔNG TY SULECO', branch: 'Chi nhánh Đống Đa', type: 'Thanh toán', status: 'Đợi kích hoạt' },
  { code: 'TK-004', bank: 'MB Bank', accountNumber: '5566778899', accountName: 'TRUNG TÂM ĐÀO TẠO SULECO', branch: 'Chi nhánh Thanh Xuân', type: 'Tiết kiệm', status: 'Ngừng hoạt động' },
]

const columns: ModuleColumn<BankAccount>[] = [
  { key: 'code', header: 'Mã TK', render: (row) => row.code },
  { key: 'bank', header: 'Ngân hàng', render: (row) => <strong>{row.bank}</strong> },
  { key: 'accountNumber', header: 'Số tài khoản', render: (row) => <code>{row.accountNumber}</code> },
  { key: 'accountName', header: 'Chủ tài khoản', render: (row) => row.accountName },
  { key: 'branch', header: 'Chi nhánh', render: (row) => row.branch },
  { key: 'type', header: 'Loại TK', render: (row) => row.type },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đang sử dụng' ? '' : 'orange'}`}>{row.status}</span> },
]

export function BankAccountsScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.bank} ${row.accountNumber} ${row.accountName} ${row.branch} ${row.status}`}
      createLabel="Thêm tài khoản"
      createRow={(index) => ({ code: `TK-${String(seed.length + index).padStart(3, '0')}`, bank: 'Chọn ngân hàng', accountNumber: '—', accountName: 'CÔNG TY SULECO', branch: '—', type: 'Thanh toán', status: 'Nháp' })}
    />
  )
}
