'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Grade = { code: string; student: string; exam: string; score: string; review: string; status: string }

const seed: Grade[] = [
  { code: 'DI-8101', student: 'Nguyễn Minh Anh', exam: 'Thi giữa module N3', score: '82/100', review: 'Đã duyệt · Lê Thị Kim Anh', status: 'Đã khóa' },
  { code: 'DI-8102', student: 'Trần Nhật Nam', exam: 'Thi giữa module N3', score: '74/100', review: 'Chờ duyệt', status: 'Chờ duyệt' },
  { code: 'DI-8103', student: 'Lê Hoàng Yến', exam: 'Thi cuối module N4', score: '—', review: 'Chưa nhập', status: 'Chưa nhập' },
  { code: 'DI-8104', student: 'Phạm Đức Long', exam: 'Thi cuối module N4', score: '91/100', review: 'Đã duyệt · Nguyễn Thu Hà', status: 'Đã khóa' },
]

const columns: ModuleColumn<Grade>[] = [
  { key: 'code', header: 'Mã điểm', render: (row) => row.code },
  { key: 'student', header: 'Người học', render: (row) => <strong>{row.student}</strong> },
  { key: 'exam', header: 'Bài thi', render: (row) => row.exam },
  { key: 'score', header: 'Điểm', render: (row) => row.score },
  { key: 'review', header: 'Duyệt điểm', render: (row) => row.review },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đã khóa' ? '' : 'orange'}`}>{row.status}</span> },
]

export function GradingScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.student} ${row.exam} ${row.score} ${row.status}`}
      createLabel="Nhập điểm"
      createRow={(index) => ({ code: `DI-${8104 + index}`, student: 'Chọn người học', exam: 'Chọn bài thi', score: '—', review: 'Chưa nhập', status: 'Nháp' })}
    />
  )
}
