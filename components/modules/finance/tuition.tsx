'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Tuition = { code: string; student: string; plan: string; due: string; receipt: string; status: string }

const seed: Tuition[] = [
  { code: 'HP-9001', student: 'Nguyễn Minh Anh', plan: 'Gói 6 tháng · N4', due: '05/09/2026', receipt: 'PT-2201', status: 'Đã thanh toán' },
  { code: 'HP-9002', student: 'Trần Nhật Nam', plan: 'Gói 6 tháng · N4', due: '10/09/2026', receipt: '—', status: 'Chưa thanh toán' },
  { code: 'HP-9003', student: 'Lê Hoàng Yến', plan: 'Gói 3 tháng · Định hướng', due: '01/09/2026', receipt: '—', status: 'Quá hạn' },
  { code: 'HP-9004', student: 'Phạm Đức Long', plan: 'Gói 6 tháng · N3', due: '05/09/2026', receipt: 'PT-2198', status: 'Đã thanh toán' },
]

const columns: ModuleColumn<Tuition>[] = [
  { key: 'code', header: 'Mã khoản', render: (row) => row.code },
  { key: 'student', header: 'Người học', render: (row) => <strong>{row.student}</strong> },
  { key: 'plan', header: 'Biểu phí', render: (row) => row.plan },
  { key: 'due', header: 'Hạn thu', render: (row) => row.due },
  { key: 'receipt', header: 'Biên lai', render: (row) => row.receipt },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đã thanh toán' ? '' : 'orange'}`}>{row.status}</span> },
]

export function TuitionScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.student} ${row.plan} ${row.status}`}
      createLabel="Tạo khoản thu"
      createRow={(index) => ({ code: `HP-${9004 + index}`, student: 'Chọn người học', plan: 'Chọn biểu phí', due: '—', receipt: '—', status: 'Nháp' })}
    />
  )
}
