'use client'

import { LayoutDashboard, ListChecks, Users } from 'lucide-react'
import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type KpiRow = { code: string; metric: string; value: string; owner: string; status: string }

const seed: KpiRow[] = [
  { code: 'KPI-01', metric: 'Người học đang hoạt động', value: '1.248', owner: 'Công tác học viên', status: 'Đạt' },
  { code: 'KPI-02', metric: 'Hồ sơ XKLĐ chờ phỏng vấn', value: '36', owner: 'Nhật Bản', status: 'Cần xử lý' },
  { code: 'KPI-03', metric: 'Công suất KTX', value: '87%', owner: 'KTX', status: 'Đạt' },
  { code: 'KPI-04', metric: 'Công nợ quá hạn', value: '42 triệu', owner: 'Kế toán', status: 'Cần xử lý' },
]

const columns: ModuleColumn<KpiRow>[] = [
  { key: 'code', header: 'Mã', render: (row) => row.code },
  { key: 'metric', header: 'Chỉ số', render: (row) => <strong>{row.metric}</strong> },
  { key: 'value', header: 'Giá trị', render: (row) => row.value },
  { key: 'owner', header: 'Phòng phụ trách', render: (row) => row.owner },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đạt' ? '' : 'orange'}`}>{row.status}</span> },
]

export function OverviewScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.metric} ${row.owner} ${row.status}`}
      createLabel="Thêm chỉ số"
      createRow={(index) => ({ code: `KPI-${String(index + 4).padStart(2, '0')}`, metric: 'Chỉ số mới', value: '—', owner: 'Chưa phân công', status: 'Nháp' })}
      extra={(
        <div className="module-grid" style={{ marginTop: 14 }}>
          <article><Users size={20} /><strong>Người học</strong><span>1.248 đang theo học</span></article>
          <article><ListChecks size={20} /><strong>Việc cần xử lý</strong><span>09 việc trong hôm nay</span></article>
          <article><LayoutDashboard size={20} /><strong>Dashboard theo role</strong><span>Cập nhật realtime</span></article>
        </div>
      )}
    />
  )
}
