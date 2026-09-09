'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type ClassRow = { code: string; name: string; teacher: string; size: string; attendance: string; status: string }

const seed: ClassRow[] = [
  { code: 'L-K47A', name: 'Tiếng Nhật N4 · K47A', teacher: 'Nguyễn Thu Hà', size: '28 học viên', attendance: '96%', status: 'Đang học' },
  { code: 'L-K47B', name: 'Định hướng XKLĐ · K47B', teacher: 'Trần Quốc Bảo', size: '24 học viên', attendance: '91%', status: 'Đang học' },
  { code: 'L-K46C', name: 'Tiếng Nhật N3 · K46C', teacher: 'Lê Thị Kim Anh', size: '22 học viên', attendance: '98%', status: 'Sắp kết thúc' },
  { code: 'L-K48A', name: 'Tiếng Nhật N5 · K48A', teacher: 'Chưa phân công', size: '00 học viên', attendance: '—', status: 'Chờ mở' },
]

const columns: ModuleColumn<ClassRow>[] = [
  { key: 'code', header: 'Mã lớp', render: (row) => row.code },
  { key: 'name', header: 'Lớp học', render: (row) => <strong>{row.name}</strong> },
  { key: 'teacher', header: 'Giảng viên', render: (row) => row.teacher },
  { key: 'size', header: 'Sĩ số', render: (row) => row.size },
  { key: 'attendance', header: 'Điểm danh', render: (row) => row.attendance },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đang học' ? '' : 'orange'}`}>{row.status}</span> },
]

export function ClassesScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.name} ${row.teacher} ${row.status}`}
      createLabel="Tạo lớp học"
      createRow={(index) => ({ code: `L-K${48 + index}Z`, name: 'Lớp học mới', teacher: 'Chưa phân công', size: '00 học viên', attendance: '—', status: 'Nháp' })}
    />
  )
}
