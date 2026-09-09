export type Role = 'admin' | 'student-affairs' | 'japan' | 'training' | 'teacher' | 'dormitory' | 'accounting' | 'japan-partner' | 'student'
export type DataMode = 'mock' | 'realtime'

export type Notice = { title: string; detail: string; tone: 'blue' | 'orange' | 'green' }

export type RoleConfig = {
  label: string
  subtitle: string
  description: string
}

export type DashboardKpi = {
  value: string
  label: string
  delta: string
  tone: 'ink' | 'brand' | 'amber' | 'green'
}

export type WorkItem = {
  title: string
  context: string
  due: string
  tone: 'brand' | 'amber' | 'green' | 'ink'
  screenKey?: string
}

export type RoleDashboard = {
  headline: string
  kpis: DashboardKpi[]
  work: WorkItem[]
}

export type RealtimePaths = 'presence' | 'notifications' | 'lessonProgress' | 'uploadStatus' | 'fileMetadata'

export type FileMetadata = { name: string; size: number; mimeType: string; storagePath: string; status: 'pending' | 'ready' | 'failed' }
