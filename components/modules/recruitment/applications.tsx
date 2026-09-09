'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Application = { code: string; candidate: string; source: string; stage: string; contact: string; status: string }

const seed: Application[] = [
  { code: 'TS-3301', candidate: 'Vũ Thị Hoa', source: 'Giới thiệu', stage: 'Phỏng vấn đối tác', contact: 'Gọi điện 07/09', status: 'Đang xử lý' },
  { code: 'TS-3302', candidate: 'Hoàng Văn Tuấn', source: 'Facebook', stage: 'Nộp hồ sơ', contact: 'Zalo 06/09', status: 'Mới' },
  { code: 'TS-3303', candidate: 'Đặng Thị Mai', source: 'Trường liên kết', stage: 'Ký đơn', contact: 'Trực tiếp 05/09', status: 'Đang xử lý' },
  { code: 'TS-3304', candidate: 'Ngô Quang Huy', source: 'Giới thiệu', stage: 'Xuất cảnh', contact: 'Email 01/09', status: 'Hoàn tất' },
]

const columns: ModuleColumn<Application>[] = [
  { key: 'code', header: 'Mã hồ sơ', render: (row) => row.code },
  { key: 'candidate', header: 'Ứng viên', render: (row) => <strong>{row.candidate}</strong> },
  { key: 'source', header: 'Nguồn tuyển', render: (row) => row.source },
  { key: 'stage', header: 'Giai đoạn', render: (row) => row.stage },
  { key: 'contact', header: 'Lịch sử liên hệ', render: (row) => row.contact },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Hoàn tất' ? '' : 'orange'}`}>{row.status}</span> },
]

export function ApplicationsScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.candidate} ${row.source} ${row.stage} ${row.status}`}
      createLabel="Thêm hồ sơ"
      createRow={(index) => ({ code: `TS-${3304 + index}`, candidate: 'Ứng viên mới', source: 'Chưa rõ', stage: 'Nộp hồ sơ', contact: '—', status: 'Nháp' })}
    />
  )
}
