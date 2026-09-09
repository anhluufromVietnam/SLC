'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Setting = { code: string; group: string; key: string; value: string; updated: string; status: string }

const seed: Setting[] = [
  { code: 'CF-01', group: 'Thông tin đơn vị', key: 'org.name', value: 'Công ty SULECO', updated: '01/09/2026', status: 'Đang áp dụng' },
  { code: 'CF-02', group: 'Firebase', key: 'firebase.projectId', value: 'suleco-demo', updated: '01/09/2026', status: 'Đang áp dụng' },
  { code: 'CF-03', group: 'Thông báo', key: 'notify.slaHours', value: '24 giờ trước hạn', updated: '20/08/2026', status: 'Đang áp dụng' },
  { code: 'CF-04', group: 'Sao lưu', key: 'backup.schedule', value: 'Hằng ngày · 02:00', updated: '15/08/2026', status: 'Chờ xác nhận' },
]

const columns: ModuleColumn<Setting>[] = [
  { key: 'code', header: 'Mã', render: (row) => row.code },
  { key: 'group', header: 'Nhóm cấu hình', render: (row) => <strong>{row.group}</strong> },
  { key: 'key', header: 'Khóa', render: (row) => <code>{row.key}</code> },
  { key: 'value', header: 'Giá trị', render: (row) => row.value },
  { key: 'updated', header: 'Cập nhật', render: (row) => row.updated },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đang áp dụng' ? '' : 'orange'}`}>{row.status}</span> },
]

export function SettingsScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.group} ${row.key} ${row.value} ${row.status}`}
      createLabel="Thêm cấu hình"
      createRow={(index) => ({ code: `CF-${String(4 + index).padStart(2, '0')}`, group: 'Nhóm mới', key: `config.key.${index}`, value: '—', updated: 'Vừa tạo', status: 'Nháp' })}
    />
  )
}
