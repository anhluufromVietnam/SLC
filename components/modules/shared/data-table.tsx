'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { Database, FileText, Plus, Radio, Search, TriangleAlert } from 'lucide-react'
import type { ModuleDefinition } from '@/lib/modules/registry'
import type { DataMode } from '@/lib/types'
import { hasFirebaseConfig } from '@/lib/firebase/client'
import { subscribeToPath, writeRealtime } from '@/lib/firebase/realtime'

export type ModuleScreenProps = { module: ModuleDefinition; mode: DataMode }

export type ModuleColumn<T> = { key: string; header: string; render: (row: T) => ReactNode }

type ModuleFrameProps<T> = ModuleScreenProps & {
  rows: T[]
  columns: ModuleColumn<T>[]
  searchText: (row: T) => string
  createLabel: string
  createRow: (index: number) => T
  extra?: ReactNode
}

export function ModuleFrame<T>({ module, mode, rows, columns, searchText, createLabel, createRow, extra }: ModuleFrameProps<T>) {
  const [query, setQuery] = useState('')
  const [created, setCreated] = useState<T[]>([])
  const [remoteRows, setRemoteRows] = useState<T[] | null>(null)
  const [remoteError, setRemoteError] = useState<string | null>(null)
  const realtimeActive = mode === 'realtime' && hasFirebaseConfig

  // Đăng ký theo dataPath trên Realtime DB khi ở chế độ realtime.
  // Node chưa có dữ liệu (null) → giữ fallback dữ liệu mẫu để giao diện không trống.
  useEffect(() => {
    if (!realtimeActive) { setRemoteRows(null); setRemoteError(null); return }
    const unsubscribe = subscribeToPath<unknown>(module.dataPath, (value) => {
      if (value == null) { setRemoteRows(null); return }
      const list = Array.isArray(value) ? value : Object.values(value)
      setRemoteRows(list as T[])
    })
    return unsubscribe
  }, [realtimeActive, module.dataPath])

  const baseRows = realtimeActive && remoteRows ? remoteRows : rows
  const usingFallback = realtimeActive && remoteRows === null && !remoteError

  const visible = useMemo(() => {
    const all = [...created, ...baseRows]
    const q = query.trim().toLowerCase()
    if (!q) return all
    return all.filter((row) => searchText(row).toLowerCase().includes(q))
  }, [created, baseRows, query, searchText])

  const handleCreate = () => {
    const row = createRow(baseRows.length + created.length + 1)
    if (!realtimeActive) { setCreated((current) => [row, ...current]); return }
    const next = [row, ...baseRows]
    setRemoteRows(next)
    writeRealtime(module.dataPath, next).catch((error) => setRemoteError(error instanceof Error ? error.message : String(error)))
  }

  return (
    <section className="module-screen">
      <div className="module-hero">
        <div>
          <div className="mini-label">SUB MODULE / {module.group.toUpperCase()}</div>
          <h2>{module.title}</h2>
          <p>{module.description}</p>
        </div>
        <div className="module-status">
          <span className={realtimeActive ? 'live-dot' : 'mock-dot'} />
          {realtimeActive ? 'Realtime DB' : 'Mock data'}
        </div>
      </div>
      <div className="module-grid">
        <article><FileText size={20} /><strong>Danh sách dữ liệu</strong><span>{visible.length} bản ghi đang hiển thị</span></article>
        <article><Database size={20} /><strong>Data path</strong><code>{module.dataPath}</code></article>
        <article><Radio size={20} /><strong>Realtime events</strong><span>created · updated · archived</span></article>
      </div>
      {remoteError && <div className="module-note warn"><TriangleAlert size={14} /> Không ghi được vào Realtime DB: {remoteError}. Kiểm tra Security Rules rồi thử lại.</div>}
      {usingFallback && <div className="module-note"><Database size={14} /> Node <code>{module.dataPath}</code> trên Realtime DB chưa có dữ liệu — đang hiển thị dữ liệu mẫu. Ghi dữ liệu vào path này (xem README) để thay thế.</div>}
      <div className="module-toolbar">
        <label className="module-search">
          <Search size={16} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={`Tìm trong ${module.title.toLowerCase()}...`} aria-label={`Tìm trong ${module.title}`} />
        </label>
        <button className="primary-button" onClick={handleCreate}>
          <Plus size={16} /> {createLabel}
        </button>
      </div>
      <div className="module-table-wrap">
        <table className="module-table">
          <thead><tr>{columns.map((column) => <th key={column.key}>{column.header}</th>)}</tr></thead>
          <tbody>
            {visible.map((row, index) => <tr key={index}>{columns.map((column) => <td key={column.key}>{column.render(row)}</td>)}</tr>)}
            {visible.length === 0 && <tr><td colSpan={columns.length} className="empty-state">Không tìm thấy dữ liệu phù hợp.</td></tr>}
          </tbody>
        </table>
      </div>
      <div className="module-footer">
        <span><Database size={14} /> {module.dataPath}</span>
        <span>{module.features.join(' · ')}</span>
      </div>
      {extra}
    </section>
  )
}
