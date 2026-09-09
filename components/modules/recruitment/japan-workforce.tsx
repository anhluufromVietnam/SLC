'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Workforce = { code: string; worker: string; checklist: string; visa: string; interview: string; status: string }

const seed: Workforce[] = [
  { code: 'XK-701', worker: 'Vũ Thị Hoa', checklist: '08/10 hồ sơ', visa: 'Chờ COE', interview: '20/09 · Online', status: 'Đang xử lý' },
  { code: 'XK-702', worker: 'Hoàng Văn Tuấn', checklist: '05/10 hồ sơ', visa: 'Chưa nộp', interview: '25/09 · Online', status: 'Chuẩn bị' },
  { code: 'XK-703', worker: 'Đặng Thị Mai', checklist: '10/10 hồ sơ', visa: 'Đã có COE', interview: 'Đã phỏng vấn', status: 'Chờ xuất cảnh' },
  { code: 'XK-704', worker: 'Ngô Quang Huy', checklist: '10/10 hồ sơ', visa: 'Đã đậu visa', interview: 'Đã phỏng vấn', status: 'Hoàn tất' },
]

const columns: ModuleColumn<Workforce>[] = [
  { key: 'code', header: 'Mã hồ sơ', render: (row) => row.code },
  { key: 'worker', header: 'Người lao động', render: (row) => <strong>{row.worker}</strong> },
  { key: 'checklist', header: 'Checklist hồ sơ', render: (row) => row.checklist },
  { key: 'visa', header: 'Tiến độ visa', render: (row) => row.visa },
  { key: 'interview', header: 'Lịch phỏng vấn', render: (row) => row.interview },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Hoàn tất' ? '' : 'orange'}`}>{row.status}</span> },
]

export function JapanWorkforceScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.worker} ${row.checklist} ${row.visa} ${row.status}`}
      createLabel="Thêm hồ sơ XKLĐ"
      createRow={(index) => ({ code: `XK-${704 + index}`, worker: 'Người lao động mới', checklist: '00/10 hồ sơ', visa: 'Chưa nộp', interview: '—', status: 'Nháp' })}
    />
  )
}
