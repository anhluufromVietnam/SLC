'use client'

import { ModuleFrame, type ModuleColumn, type ModuleScreenProps } from '@/components/modules/shared/data-table'
import { useState } from 'react'

type Student = { code: string; name: string; masterId: string; course: string; lifecycle: string; updated: string }

type EditableStudent = Student & { id: string }

const seed: Student[] = [
  { code: 'SV-1042', name: 'Nguyễn Minh Anh', masterId: 'MID-88001', course: 'Tiếng Nhật N4 · K47A', lifecycle: 'Đang học', updated: '08/09/2026' },
  { code: 'SV-1043', name: 'Trần Nhật Nam', masterId: 'MID-88002', course: 'Tiếng Nhật N4 · K47A', lifecycle: 'Đang học', updated: '08/09/2026' },
  { code: 'SV-1044', name: 'Lê Hoàng Yến', masterId: 'MID-88003', course: 'Định hướng XKLĐ · K47B', lifecycle: 'Bảo lưu', updated: '05/09/2026' },
  { code: 'SV-1045', name: 'Phạm Đức Long', masterId: 'MID-88004', course: 'Tiếng Nhật N3 · K46C', lifecycle: 'Hoàn thành', updated: '01/09/2026' },
]

const columns: ModuleColumn<Student>[] = [
  { key: 'code', header: 'Mã SV', render: (row) => row.code },
  { key: 'name', header: 'Họ tên', render: (row) => <strong>{row.name}</strong> },
  { key: 'masterId', header: 'Master ID', render: (row) => <code>{row.masterId}</code> },
  { key: 'course', header: 'Lớp / chương trình', render: (row) => row.course },
  { key: 'lifecycle', header: 'Vòng đời', render: (row) => <span className={`status-chip ${row.lifecycle === 'Đang học' ? '' : 'orange'}`}>{row.lifecycle}</span> },
  { key: 'updated', header: 'Cập nhật', render: (row) => row.updated },
]

export function StudentListScreen({ module, mode }: ModuleScreenProps) {
  const [editModal, setEditModal] = useState<{ show: boolean; student: Student | null }>({ show: false, student: null })

  const handleEdit = (student: Student) => {
    setEditModal({ show: true, student })
  }

  const handleSave = (updatedStudent: Student) => {
    // In real implementation, this would update the database
    setEditModal({ show: false, student: null })
  }

  const handleCancel = () => {
    setEditModal({ show: false, student: null })
  }

  // Add edit button column
  const columnsWithEdit = [...columns, {
    key: 'actions',
    header: 'Hành động',
    render: (row) => (
      <button 
        className="icon-button" 
        onClick={() => handleEdit(row)}
        aria-label="Chỉnh sửa hồ sơ"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
          <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5l.5.5.5-.5z"/>
        </svg>
      </button>
    )
  }]

  return (
    <>
      <ModuleFrame
        module={module}
        mode={mode}
        rows={seed}
        columns={columnsWithEdit}
        searchText={(row) => `${row.code} ${row.name} ${row.masterId} ${row.course} ${row.lifecycle}`}
        createLabel="Thêm người học"
        createRow={(index) => ({ code: `SV-${1045 + index}`, name: 'Người học mới', masterId: `MID-${88004 + index}`, course: 'Chưa xếp lớp', lifecycle: 'Nháp', updated: 'Vừa tạo' })}
      />
      
      {editModal.show && editModal.student && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '2rem',
            borderRadius: '8px',
            width: '90%',
            maxWidth: '500px',
            maxHeight: '80vh',
            overflowY: 'auto'
          }}>
            <h3>Chỉnh sửa hồ sơ người học</h3>
            <div style={{ marginBottom: '1rem' }}>
              <label>Mã SV:</label>
              <input 
                type="text" 
                value={editModal.student.code} 
                readOnly
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '1rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Họ tên:</label>
              <input 
                type="text" 
                value={editModal.student.name} 
                onChange={(e) => {
                  if (editModal.student) {
                    editModal.student.name = e.target.value
                  }
                }}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '1rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Master ID:</label>
              <input 
                type="text" 
                value={editModal.student.masterId} 
                onChange={(e) => {
                  if (editModal.student) {
                    editModal.student.masterId = e.target.value
                  }
                }}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '1rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Lớp / chương trình:</label>
              <input 
                type="text" 
                value={editModal.student.course} 
                onChange={(e) => {
                  if (editModal.student) {
                    editModal.student.course = e.target.value
                  }
                }}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '1rem' }}
              />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Vòng đời:</label>
              <select 
                value={editModal.student.lifecycle} 
                onChange={(e) => {
                  if (editModal.student) {
                    editModal.student.lifecycle = e.target.value
                  }
                }}
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '1rem' }}
              >
                <option value="Đang học">Đang học</option>
                <option value="Bảo lưu">Bảo lưu</option>
                <option value="Hoàn thành">Hoàn thành</option>
                <option value="Nháp">Nháp</option>
              </select>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <label>Cập nhật:</label>
              <input 
                type="text" 
                value={editModal.student.updated} 
                readOnly
                style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', marginBottom: '1rem' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button 
                onClick={handleCancel}
                style={{ padding: '0.5rem 1rem', border: '1px solid #ccc', borderRadius: '4px', background: 'white', cursor: 'pointer' }}
              >
                Hủy
              </button>
              <button 
                onClick={() => handleSave(editModal.student)}
                style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', background: '#007bff', color: 'white', cursor: 'pointer' }}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
