'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Session = { code: string; exam: string; date: string; room: string; proctor: string; status: string }

const seed: Session[] = [
  { code: 'KT-61', exam: 'Thi cuối module N4 · K47A', date: '12/09/2026 · 08:00', room: 'Phòng A.203', proctor: 'Nguyễn Thu Hà', status: 'Sắp diễn ra' },
  { code: 'KT-62', exam: 'Thi tay nghề hàn · Đợt 3', date: '15/09/2026 · 13:30', room: 'Xưởng thực hành', proctor: 'Trần Quốc Bảo', status: 'Sắp diễn ra' },
  { code: 'KT-60', exam: 'Thi giữa module N3 · K46C', date: '05/09/2026 · 08:00', room: 'Phòng B.105', proctor: 'Lê Thị Kim Anh', status: 'Đã chấm xong' },
  { code: 'KT-63', exam: 'Mock test JLPT N4', date: '22/09/2026 · 08:00', room: 'Hội trường', proctor: 'Chưa phân công', status: 'Chuẩn bị' },
]

const columns: ModuleColumn<Session>[] = [
  { key: 'code', header: 'Mã kỳ thi', render: (row) => row.code },
  { key: 'exam', header: 'Kỳ thi', render: (row) => <strong>{row.exam}</strong> },
  { key: 'date', header: 'Thời gian', render: (row) => row.date },
  { key: 'room', header: 'Phòng thi', render: (row) => row.room },
  { key: 'proctor', header: 'Giám thị', render: (row) => row.proctor },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đã chấm xong' ? '' : 'orange'}`}>{row.status}</span> },
]

export function ExamSessionsScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.exam} ${row.date} ${row.room} ${row.proctor} ${row.status}`}
      createLabel="Tạo kỳ thi"
      createRow={(index) => ({ code: `KT-${63 + index}`, exam: 'Kỳ thi mới', date: '—', room: 'Chưa xếp phòng', proctor: 'Chưa phân công', status: 'Nháp' })}
    />
  )
}
