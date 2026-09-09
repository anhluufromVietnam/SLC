'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Room = { code: string; building: string; capacity: string; occupancy: string; condition: string; status: string }

const seed: Room[] = [
  { code: 'A.201', building: 'Tòa A', capacity: '08 giường', occupancy: '07/08', condition: 'Đầy đủ tiện nghi', status: 'Đang ở' },
  { code: 'A.203', building: 'Tòa A', capacity: '08 giường', occupancy: '08/08', condition: 'Đầy đủ tiện nghi', status: 'Đầy phòng' },
  { code: 'B.105', building: 'Tòa B', capacity: '06 giường', occupancy: '03/06', condition: 'Cần sửa điều hòa', status: 'Còn trống' },
  { code: 'B.108', building: 'Tòa B', capacity: '06 giường', occupancy: '00/06', condition: 'Đang dọn dẹp', status: 'Bảo trì' },
]

const columns: ModuleColumn<Room>[] = [
  { key: 'code', header: 'Phòng', render: (row) => row.code },
  { key: 'building', header: 'Tòa nhà', render: (row) => <strong>{row.building}</strong> },
  { key: 'capacity', header: 'Sức chứa', render: (row) => row.capacity },
  { key: 'occupancy', header: 'Công suất', render: (row) => row.occupancy },
  { key: 'condition', header: 'Tình trạng', render: (row) => row.condition },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đang ở' || row.status === 'Còn trống' ? '' : 'orange'}`}>{row.status}</span> },
]

export function RoomsScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.building} ${row.condition} ${row.status}`}
      createLabel="Thêm phòng"
      createRow={(index) => ({ code: `C.${101 + index}`, building: 'Tòa C', capacity: '06 giường', occupancy: '00/06', condition: '—', status: 'Nháp' })}
    />
  )
}
