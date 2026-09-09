'use client'

import { ArrowUpRight, Bell, BookOpen, CalendarDays, ClipboardList, FileText, FolderOpen, LayoutDashboard, Settings, Users, Wallet } from 'lucide-react'
import { roleDashboards } from '@/lib/roles/dashboards'
import { roleConfigs } from '@/lib/roles/permissions'
import { visibleDomains } from '@/lib/navigation/catalog'
import { notices, schedule } from '@/lib/data/mock'
import type { DataMode, Role } from '@/lib/types'

const domainIcons: Record<string, typeof Users> = { overview: LayoutDashboard, learners: Users, recruitment: FileText, training: BookOpen, assessment: ClipboardList, dormitory: FolderOpen, finance: Wallet, reports: LayoutDashboard, system: Settings }

type RoleDashboardProps = { role: Role; mode: DataMode; onOpen: (screenKey: string) => void }

export function RoleDashboard({ role, mode, onOpen }: RoleDashboardProps) {
  const config = roleConfigs[role]
  const dashboard = roleDashboards[role]
  const domains = visibleDomains(role).filter((domain) => domain.key !== 'overview')
  const grantedCount = domains.reduce((total, domain) => total + domain.screens.length, 0)

  return (
    <div className="role-dashboard">
      <div className="dashboard-intro">
        <div>
          <div className="mini-label">{config.subtitle}</div>
          <h2>{dashboard.headline}</h2>
          <p>{config.description}</p>
        </div>
        <div className="intro-meta">
          <span className={mode === 'realtime' ? 'live-dot' : 'mock-dot'} />
          {mode === 'realtime' ? 'Realtime DB' : 'Mock data'} · {grantedCount} màn hình được phân quyền
        </div>
      </div>

      <section className="kpi-grid" aria-label="Chỉ số theo vai trò">
        {dashboard.kpis.map((kpi) => (
          <article className="kpi-card" key={kpi.label}>
            <span className={`kpi-value tone-${kpi.tone}`}>{kpi.value}</span>
            <span className="kpi-label">{kpi.label}</span>
            <span className={`kpi-delta tone-${kpi.tone}`}>{kpi.delta}</span>
          </article>
        ))}
      </section>

      <div className="dashboard-grid">
        <section className="panel work-panel">
          <div className="panel-heading">
            <div>
              <div className="mini-label">HÀNG ĐỢI CÔNG VIỆC</div>
              <h2>Việc cần xử lý</h2>
              <p>{dashboard.work.length} việc gắn với phân hệ bạn được phân quyền</p>
            </div>
            <ClipboardList size={20} className="panel-icon" />
          </div>
          <div className="work-list">
            {dashboard.work.map((item) => (
              <button className="work-item" key={item.title} onClick={() => item.screenKey && onOpen(item.screenKey)}>
                <span className={`work-rail tone-${item.tone}`} />
                <span className="work-body">
                  <strong>{item.title}</strong>
                  <small>{item.context}</small>
                </span>
                <span className="work-due">{item.due}</span>
                {item.screenKey && <ArrowUpRight size={16} className="work-arrow" />}
              </button>
            ))}
          </div>
        </section>

        <div className="dashboard-side">
          <section className="panel schedule-panel">
            <div className="panel-heading">
              <div>
                <div className="mini-label">LỊCH TRONG NGÀY</div>
                <h2>Lịch hoạt động</h2>
              </div>
              <CalendarDays size={20} className="panel-icon" />
            </div>
            <div className="schedule-list">
              {schedule.map((item) => (
                <div className="schedule-item" key={item.title}>
                  <div className="time">{item.time}</div>
                  <div className="schedule-marker" />
                  <div className="schedule-info"><strong>{item.title}</strong><span>{item.room}</span></div>
                  <em>{item.status}</em>
                </div>
              ))}
            </div>
          </section>
          <section className="panel notice-panel">
            <div className="panel-heading">
              <div>
                <div className="mini-label">THÔNG BÁO</div>
                <h2>Mới nhất</h2>
              </div>
              <Bell size={20} className="panel-icon" />
            </div>
            <div className="notice-list">
              {notices.map((notice) => (
                <div className="notice-row" key={notice.title}>
                  <span className={`notice-dot ${notice.tone}`} />
                  <div><strong>{notice.title}</strong><small>{notice.detail}</small></div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <div className="section-title">
        <div>
          <div className="mini-label">PHÂN HỆ THEO PHÂN QUYỀN</div>
          <h2>Phân hệ bạn được phân quyền</h2>
          <p>Điều hướng nhanh đến các màn hình thuộc vai trò {config.label}</p>
        </div>
      </div>
      <section className="access-grid" aria-label="Phân hệ được phân quyền">
        {domains.map((domain) => {
          const Icon = domainIcons[domain.key] ?? FileText
          return (
            <article className="access-group" key={domain.key}>
              <header><Icon size={16} /><strong>{domain.label}</strong><span>{domain.screens.length}</span></header>
              {domain.screens.map((screen) => (
                <button key={screen.key} onClick={() => onOpen(screen.key)}>
                  <span>{screen.label}</span>
                  <small>{screen.description}</small>
                  <ArrowUpRight size={15} />
                </button>
              ))}
            </article>
          )
        })}
      </section>
    </div>
  )
}
