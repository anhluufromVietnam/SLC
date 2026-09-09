'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Report = { code: string; name: string; department: string; period: string; export: string; status: string }

const seed: Report[] = [
  { code: 'BC-09-01', name: 'Báo cáo tuyển sinh tháng 08', department: 'Tuyển sinh', period: '01/08 — 31/08', export: 'Excel · 240KB', status: 'Đã phát hành' },
  { code: 'BC-09-02', name: 'Báo cáo đào tạo K47', department: 'Phòng đào tạo', period: 'Quý III', export: 'Excel · 180KB', status: 'Đã phát hành' },
  { code: 'BC-09-03', name: 'Báo cáo công nợ tháng 08', department: 'Kế toán', period: '01/08 — 31/08', export: 'Excel · 96KB', status: 'Chờ duyệt' },
  { code: 'BC-09-04', name: 'Báo cáo công suất KTX', department: 'KTX', period: 'Quý III', export: '—', status: 'Đang soạn' },
]

const columns: ModuleColumn<Report>[] = [
  { key: 'code', header: 'Mã báo cáo', render: (row) => row.code },
  { key: 'name', header: 'Báo cáo', render: (row) => <strong>{row.name}</strong> },
  { key: 'department', header: 'Phòng ban', render: (row) => row.department },
  { key: 'period', header: 'Kỳ báo cáo', render: (row) => row.period },
  { key: 'export', header: 'File xuất', render: (row) => row.export },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đã phát hành' ? '' : 'orange'}`}>{row.status}</span> },
]

export function ReportsScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.name} ${row.department} ${row.period} ${row.status}`}
      createLabel="Tạo báo cáo"
      createRow={(index) => ({ code: `BC-09-${String(4 + index).padStart(2, '0')}`, name: 'Báo cáo mới', department: 'Chọn phòng ban', period: '—', export: '—', status: 'Nháp' })}
    />
  )
}
