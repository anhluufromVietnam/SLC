'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type ExamQuestion = { code: string; question: string; subject: string; matrix: string; version: string; status: string }

const seed: ExamQuestion[] = [
  { code: 'CH-1001', question: 'Đọc hiểu · Thư xin nghỉ phép', subject: 'Tiếng Nhật N4', matrix: 'Đọc hiểu · 10 điểm', version: 'v1.2', status: 'Đã duyệt' },
  { code: 'CH-1002', question: 'Nghe · Hội thoại tại xưởng', subject: 'Tiếng Nhật N4', matrix: 'Nghe hiểu · 20 điểm', version: 'v1.2', status: 'Đã duyệt' },
  { code: 'CH-1003', question: 'Từ vựng · An toàn lao động', subject: 'Tay nghề', matrix: 'Từ vựng · 15 điểm', version: 'v2.0', status: 'Chờ duyệt' },
  { code: 'CH-1004', question: 'Ngữ pháp · Thể ~なければならない', subject: 'Tiếng Nhật N3', matrix: 'Ngữ pháp · 10 điểm', version: 'v1.0', status: 'Đã duyệt' },
]

const columns: ModuleColumn<ExamQuestion>[] = [
  { key: 'code', header: 'Mã câu hỏi', render: (row) => row.code },
  { key: 'question', header: 'Nội dung', render: (row) => <strong>{row.question}</strong> },
  { key: 'subject', header: 'Môn', render: (row) => row.subject },
  { key: 'matrix', header: 'Ma trận đề', render: (row) => row.matrix },
  { key: 'version', header: 'Phiên bản', render: (row) => <code>{row.version}</code> },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đã duyệt' ? '' : 'orange'}`}>{row.status}</span> },
]

export function ExamBankScreen({ module, mode }: ModuleScreenProps) {
  return (
    <ModuleFrame
      module={module}
      mode={mode}
      rows={seed}
      columns={columns}
      searchText={(row) => `${row.code} ${row.question} ${row.subject} ${row.matrix} ${row.status}`}
      createLabel="Thêm câu hỏi"
      createRow={(index) => ({ code: `CH-${1004 + index}`, question: 'Câu hỏi mới', subject: 'Chọn môn', matrix: 'Chưa gán ma trận', version: 'v0.1', status: 'Nháp' })}
    />
  )
}
