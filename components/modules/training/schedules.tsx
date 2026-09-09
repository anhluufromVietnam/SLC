'use client'

import { useMemo, useState } from 'react'
import { CalendarDays, ChevronLeft, ChevronRight, List } from 'lucide-react'
import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'

type Slot = { code: string; session: string; room: string; attendance: string; status: string }

const seed: Slot[] = [
  { code: 'LT-901', session: 'Tiếng Nhật N4 · K47A · 08:00-10:00', room: 'Phòng A.203', attendance: '27/28', status: 'Đang diễn ra' },
  { code: 'LT-902', session: 'Định hướng xuất cảnh · K47B · 13:30-15:30', room: 'Hội trường', attendance: 'Chưa điểm danh', status: 'Sắp diễn ra' },
  { code: 'LT-903', session: 'Tiếng Nhật N3 · K46C · 16:00-18:00', room: 'Phòng B.105', attendance: '22/22', status: 'Chưa diễn ra' },
]

const columns: ModuleColumn<Slot>[] = [
  { key: 'code', header: 'Mã lịch', render: (row) => row.code },
  { key: 'session', header: 'Buổi học', render: (row) => <strong>{row.session}</strong> },
  { key: 'room', header: 'Phòng', render: (row) => row.room },
  { key: 'attendance', header: 'Điểm danh', render: (row) => row.attendance },
  { key: 'status', header: 'Trạng thái', render: (row) => <span className={`status-chip ${row.status === 'Đang diễn ra' ? '' : 'orange'}`}>{row.status}</span> },
]

/* ---- Tuần lịch kiểu Google Calendar ---- */

type Lesson = {
  code: string
  subject: string
  subjectCode: string
  classCode: string
  room: string
  teacher: string
  day: number // 1 = Thứ 2 ... 7 = Chủ nhật
  start: number // giờ bắt đầu (số thập phân, vd 8.5 = 08:30)
  end: number
  tone: 'brand' | 'blue' | 'green' | 'amber'
}

const lessons: Lesson[] = [
  { code: 'MH-JN4-01', subject: 'Tiếng Nhật N4', subjectCode: 'JN4', classCode: 'K47A', room: 'A.203', teacher: 'Phạm Đức Anh', day: 1, start: 8, end: 10, tone: 'brand' },
  { code: 'MH-JN4-02', subject: 'Tiếng Nhật N4', subjectCode: 'JN4', classCode: 'K47A', room: 'A.203', teacher: 'Phạm Đức Anh', day: 3, start: 8, end: 10, tone: 'brand' },
  { code: 'MH-JN4-03', subject: 'Tiếng Nhật N4', subjectCode: 'JN4', classCode: 'K47A', room: 'A.203', teacher: 'Phạm Đức Anh', day: 5, start: 8, end: 10, tone: 'brand' },
  { code: 'MH-JN3-01', subject: 'Tiếng Nhật N3', subjectCode: 'JN3', classCode: 'K46C', room: 'B.105', teacher: 'Nguyễn Thu Hà', day: 1, start: 13.5, end: 15.5, tone: 'blue' },
  { code: 'MH-JN3-02', subject: 'Tiếng Nhật N3', subjectCode: 'JN3', classCode: 'K46C', room: 'B.105', teacher: 'Nguyễn Thu Hà', day: 4, start: 13.5, end: 15.5, tone: 'blue' },
  { code: 'MH-CD-01', subject: 'Định hướng xuất cảnh', subjectCode: 'CDXC', classCode: 'K47B', room: 'Hội trường', teacher: 'Trần Văn Hùng', day: 2, start: 8, end: 10, tone: 'green' },
  { code: 'MH-CD-02', subject: 'Định hướng xuất cảnh', subjectCode: 'CDXC', classCode: 'K47B', room: 'Hội trường', teacher: 'Trần Văn Hùng', day: 4, start: 8, end: 10, tone: 'green' },
  { code: 'MH-AT-01', subject: 'An toàn lao động', subjectCode: 'ATLD', classCode: 'K47B', room: 'Xưởng thực hành', teacher: 'Lê Quang Minh', day: 2, start: 13.5, end: 16, tone: 'amber' },
  { code: 'MH-AT-02', subject: 'An toàn lao động', subjectCode: 'ATLD', classCode: 'K47B', room: 'Xưởng thực hành', teacher: 'Lê Quang Minh', day: 5, start: 13.5, end: 16, tone: 'amber' },
  { code: 'MH-CN-01', subject: 'Cơ khí chế tạo', subjectCode: 'CKCT', classCode: 'K46A', room: 'Xưởng cơ khí', teacher: 'Đỗ Nhật Quang', day: 3, start: 13.5, end: 16.5, tone: 'blue' },
  { code: 'MH-KT-01', subject: 'Kiểm tra định kỳ N4', subjectCode: 'KT-CK', classCode: 'K47A', room: 'A.101', teacher: 'Phạm Đức Anh', day: 6, start: 8, end: 9.5, tone: 'amber' },
]

const dayNames = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN']
const dayDates = ['08/09', '09/09', '10/09', '11/09', '12/09', '13/09', '14/09']
const startHour = 7
const endHour = 19
const hourHeight = 52

const toneLabel: Record<Lesson['tone'], string> = { brand: 'Tiếng Nhật', blue: 'Chuyên ngành', green: 'Định hướng', amber: 'Kiểm tra' }

function formatHour(value: number) {
  const hour = Math.floor(value)
  const minute = Math.round((value - hour) * 60)
  return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
}

function WeekCalendar() {
  const [weekOffset, setWeekOffset] = useState(0)
  const weekLabel = weekOffset === 0 ? '08 – 14/09/2026' : weekOffset > 0 ? `Tuần +${weekOffset} (sau 14/09)` : `Tuần ${weekOffset} (trước 08/09)`
  const visibleLessons = weekOffset === 0 ? lessons : []
  const todayColumn = 2 // Thứ 4, 10/09/2026

  const hours = useMemo(() => Array.from({ length: endHour - startHour }, (_, index) => startHour + index), [])

  return (
    <div className="panel cal-panel">
      <div className="panel-heading">
        <div>
          <h2>Lịch giảng dạy theo tuần</h2>
          <p>Kéo ngang để xem đầy đủ trên màn hình nhỏ · Bấm vào buổi học để mở điểm danh</p>
        </div>
        <div className="cal-nav">
          <button className="icon-button" onClick={() => setWeekOffset((current) => current - 1)} aria-label="Tuần trước"><ChevronLeft size={16} /></button>
          <button className="cal-today" onClick={() => setWeekOffset(0)}>Hôm nay</button>
          <button className="icon-button" onClick={() => setWeekOffset((current) => current + 1)} aria-label="Tuần sau"><ChevronRight size={16} /></button>
          <span className="cal-week">{weekLabel}</span>
        </div>
      </div>
      <div className="cal-legend">
        {(Object.keys(toneLabel) as Lesson['tone'][]).map((tone) => <span key={tone}><i className={`cal-dot tone-${tone}`} />{toneLabel[tone]}</span>)}
      </div>
      <div className="cal-scroll">
        <div className="cal-grid" style={{ height: (endHour - startHour) * hourHeight + 44 }}>
          <div className="cal-corner" style={{ gridColumn: 1, gridRow: 1 }} />
          {dayNames.map((name, index) => (
            <div key={name} className={`cal-head ${weekOffset === 0 && index === todayColumn ? 'cal-head-today' : ''}`} style={{ gridColumn: index + 2, gridRow: 1 }}>
              <span>{name}</span>
              <strong>{dayDates[index]}</strong>
            </div>
          ))}
          {hours.map((hour) => (
            <div key={`label-${hour}`} className="cal-time" style={{ top: 44 + (hour - startHour) * hourHeight }}>{formatHour(hour)}</div>
          ))}
          {dayNames.map((name, index) => (
            <div key={`col-${name}`} className={`cal-day ${weekOffset === 0 && index === todayColumn ? 'cal-day-today' : ''}`} style={{ gridColumn: index + 2, gridRow: 2 }}>
              {hours.map((hour) => <div key={`line-${name}-${hour}`} className="cal-line" style={{ top: (hour - startHour) * hourHeight }} />)}
              {visibleLessons.filter((lesson) => lesson.day === index + 1).map((lesson) => (
                <button
                  key={lesson.code}
                  className={`cal-event tone-${lesson.tone}`}
                  style={{ top: 44 + (lesson.start - startHour) * hourHeight, height: (lesson.end - lesson.start) * hourHeight - 4 }}
                  title={`${lesson.subject} · ${lesson.classCode} · ${lesson.room} · ${lesson.teacher}`}
                >
                  <strong>{lesson.subject}</strong>
                  <span>{formatHour(lesson.start)}–{formatHour(lesson.end)} · {lesson.classCode} · P.{lesson.room}</span>
                  <small>{lesson.teacher}</small>
                </button>
              ))}
            </div>
          ))}
        </div>
        {visibleLessons.length === 0 && <div className="cal-empty">Chưa có lịch giảng dạy cho tuần này. Lịch mới được phòng Đào tạo công bố trước 1 tuần.</div>}
      </div>
    </div>
  )
}

export function SchedulesScreen({ module, mode }: ModuleScreenProps) {
  const [view, setView] = useState<'calendar' | 'list'>('calendar')

  return (
    <section className="module-screen">
      <div className="module-hero">
        <div>
          <div className="mini-label">SUB MODULE / {module.group.toUpperCase()}</div>
          <h2>{module.title}</h2>
          <p>{module.description}</p>
        </div>
        <div className="module-status">
          <span className={mode === 'realtime' ? 'live-dot' : 'mock-dot'} />
          {mode === 'realtime' ? 'Realtime DB' : 'Mock data'}
        </div>
      </div>
      <div className="module-toolbar">
        <div className="view-switch" role="tablist" aria-label="Kiểu hiển thị lịch">
          <button className={view === 'calendar' ? 'active' : ''} onClick={() => setView('calendar')} role="tab" aria-selected={view === 'calendar'}><CalendarDays size={15} /> Lịch tuần</button>
          <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} role="tab" aria-selected={view === 'list'}><List size={15} /> Danh sách</button>
        </div>
      </div>
      {view === 'calendar'
        ? <WeekCalendar />
        : (
          <ModuleFrame
            module={module}
            mode={mode}
            rows={seed}
            columns={columns}
            searchText={(row) => `${row.code} ${row.session} ${row.room} ${row.status}`}
            createLabel="Thêm buổi học"
            createRow={(index) => ({ code: `LT-${903 + index}`, session: 'Buổi học mới', room: 'Chưa xếp phòng', attendance: '—', status: 'Nháp' })}
          />
        )}
    </section>
  )
}
