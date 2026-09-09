'use client'

import { useEffect, useMemo, useState } from 'react'
import { Bell, BookOpen, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, ClipboardList, FileText, FolderOpen, LayoutDashboard, Menu, Moon, Settings, Sun, Users, Wallet } from 'lucide-react'
import { hasFirebaseConfig } from '@/lib/firebase/client'
import { notices } from '@/lib/data/mock'
import { roleConfigs, roleOrder } from '@/lib/roles/permissions'
import { getModule } from '@/lib/modules/registry'
import { getScreen, navigationCatalog, visibleDomains } from '@/lib/navigation/catalog'
import { ModuleScreen } from '@/components/modules/module-screen'
import { RoleDashboard } from '@/components/dashboard/role-dashboard'
import type { DataMode, Role } from '@/lib/types'

const domainIcons: Record<string, typeof Users> = { overview: LayoutDashboard, learners: Users, recruitment: FileText, training: BookOpen, assessment: ClipboardList, dormitory: FolderOpen, finance: Wallet, reports: LayoutDashboard, system: Settings }

export function DashboardShell() {
  const [role, setRole] = useState<Role>('admin')
  const [mode, setMode] = useState<DataMode>(hasFirebaseConfig ? 'realtime' : 'mock')
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dark, setDark] = useState(false)
  const [noticeOpen, setNoticeOpen] = useState(false)
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['overview', 'learners', 'training'])
  const [activeKey, setActiveKey] = useState('overview')
  const config = roleConfigs[role]
  const domains = useMemo(() => visibleDomains(role), [role])
  const activeScreen = getScreen(activeKey)
  const activeDomain = navigationCatalog.find((domain) => domain.screens.some((screen) => screen.key === activeKey))
  const isOverview = activeKey === 'overview'
  const today = useMemo(() => new Intl.DateTimeFormat('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(2026, 8, 9)), [])
  const openScreen = (key: string) => { setActiveKey(key); setMobileOpen(false) }

  useEffect(() => {
    if (!mobileOpen) return
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setMobileOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [mobileOpen])

  return <div className={dark ? 'suleco-app dark' : 'suleco-app'}>
    {mobileOpen && <button className="mobile-backdrop" aria-label="Đóng menu" onClick={() => setMobileOpen(false)} />}
    <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''} ${mobileOpen ? 'sidebar-mobile-open' : ''}`}>
      <div className="brand"><img src="/suleco-logo.webp" alt="Suleco" /><button className="icon-button collapse-button" onClick={() => setCollapsed(!collapsed)} aria-label={collapsed ? 'Mở rộng menu' : 'Thu gọn menu'}>{collapsed ? <ChevronRight /> : <ChevronLeft />}</button></div>
      <nav aria-label="Điều hướng chính">{domains.map((domain) => { const Icon = domainIcons[domain.key] ?? FileText; const isOpen = expandedGroups.includes(domain.key); const hasChildren = domain.screens.length > 1; return <div className="nav-group" key={domain.key}><button className={`nav-item nav-parent ${domain.screens.some((screen) => screen.key === activeKey) ? 'active' : ''}`} onClick={() => { if (!hasChildren) openScreen(domain.screens[0].key); else setExpandedGroups((current) => current.includes(domain.key) ? current.filter((key) => key !== domain.key) : [...current, domain.key]) }} title={collapsed ? domain.label : undefined}><Icon size={18} /><span>{domain.label}</span>{!collapsed && hasChildren && (isOpen ? <ChevronDown size={15} className="nav-chevron" /> : <ChevronRight size={15} className="nav-chevron" />)}</button>{!collapsed && isOpen && hasChildren && <div className="nav-children">{domain.screens.map((screen) => <button key={screen.key} className={`nav-child ${activeKey === screen.key ? 'active' : ''}`} onClick={() => openScreen(screen.key)}>{screen.label}</button>)}</div>}</div> })}</nav>
      <div className="sidebar-foot"><button className="nav-item"><CircleHelp size={18} /><span>Trợ giúp</span></button><div className="firebase-pill"><span className={mode === 'realtime' && hasFirebaseConfig ? 'live-dot' : 'mock-dot'} />{collapsed ? '' : mode === 'realtime' && hasFirebaseConfig ? 'Realtime DB' : 'Mock data'}</div></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><div className="mobile-brand"><button className="icon-button" onClick={() => setMobileOpen(true)} aria-label="Mở menu"><Menu size={20} /></button><img src="/suleco-logo.webp" alt="Suleco" /></div><div className="top-actions"><button className="mode-switch" onClick={() => setMode(mode === 'mock' ? 'realtime' : 'mock')}><span className={mode === 'realtime' && hasFirebaseConfig ? 'live-dot' : 'mock-dot'} />{mode === 'mock' ? 'Demo mode' : hasFirebaseConfig ? 'Realtime DB' : 'Realtime chưa cấu hình'}</button><button className="icon-button" onClick={() => setDark(!dark)} aria-label="Đổi giao diện">{dark ? <Sun size={18} /> : <Moon size={18} />}</button><button className="icon-button notify-button" onClick={() => setNoticeOpen(!noticeOpen)} aria-label="Thông báo"><Bell size={18} /><i>3</i></button><select className="role-select" value={role} onChange={(event) => { setRole(event.target.value as Role); setActiveKey('overview') }} aria-label="Chọn vai trò demo">{roleOrder.map((item) => <option key={item} value={item}>{roleConfigs[item].label}</option>)}</select><div className="profile"><div className="avatar">{roleConfigs[role].label.slice(0, 2).toUpperCase()}</div><div><strong>{roleConfigs[role].label}</strong><small>{roleConfigs[role].subtitle}</small></div><ChevronDown size={16} /></div></div></header>
      {noticeOpen && <div className="notice-popover">{notices.map((notice) => <div className="notice-row" key={notice.title}><span className={`notice-dot ${notice.tone}`} /><div><strong>{notice.title}</strong><small>{notice.detail}</small></div></div>)}</div>}
      <div className="content-wrap">
        <div className="eyebrow">SULECO ERP <span>/</span> {isOverview ? 'Bảng điều hành' : `${activeDomain?.label ?? ''} / ${activeScreen.label}`}</div>
        <div className="page-heading">
          <div>
            <h1>{isOverview ? 'Bảng điều hành' : activeScreen.label}</h1>
            <p>{isOverview ? `${config.label} · ${today.charAt(0).toUpperCase() + today.slice(1)}` : activeScreen.description}</p>
          </div>
        </div>
        {isOverview
          ? <RoleDashboard role={role} mode={mode} onOpen={openScreen} />
          : <ModuleScreen module={getModule(activeScreen.moduleKey)} mode={mode} />}
      </div>
    </main>
  </div>
}
