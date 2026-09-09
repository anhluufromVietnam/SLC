'use client'

import type { ComponentType } from 'react'
import type { ModuleScreenProps } from '@/components/modules/shared/data-table'
import { OverviewScreen } from '@/components/modules/overview/overview'
import { StudentListScreen } from '@/components/modules/learners/student-list'
import { StudentProfileScreen } from '@/components/modules/learners/student-profile'
import { StudentCareScreen } from '@/components/modules/learners/student-care'
import { ApplicationsScreen } from '@/components/modules/recruitment/applications'
import { OrdersScreen } from '@/components/modules/recruitment/orders'
import { PartnersScreen } from '@/components/modules/recruitment/partners'
import { JapanWorkforceScreen } from '@/components/modules/recruitment/japan-workforce'
import { CoursesScreen } from '@/components/modules/training/courses'
import { ClassesScreen } from '@/components/modules/training/classes'
import { SchedulesScreen } from '@/components/modules/training/schedules'
import { MaterialsScreen } from '@/components/modules/training/materials'
import { ExamBankScreen } from '@/components/modules/assessment/exambank'
import { ExamSessionsScreen } from '@/components/modules/assessment/exam-sessions'
import { GradingScreen } from '@/components/modules/assessment/grading'
import { CertificatesScreen } from '@/components/modules/assessment/certificates'
import { RoomsScreen } from '@/components/modules/dormitory/rooms'
import { ResidencesScreen } from '@/components/modules/dormitory/residences'
import { ServiceTicketsScreen } from '@/components/modules/dormitory/service-tickets'
import { TransactionsScreen } from '@/components/modules/finance/transactions'
import { TuitionScreen } from '@/components/modules/finance/tuition'
import { DebtsScreen } from '@/components/modules/finance/debts'
import { BankAccountsScreen } from '@/components/modules/finance/bank-accounts'
import { ReportsScreen } from '@/components/modules/reports/reports'
import { OperationsScreen } from '@/components/modules/reports/operations'
import { PermissionsScreen } from '@/components/modules/system/permissions'
import { RolesScreen } from '@/components/modules/system/roles'
import { AuditLogsScreen } from '@/components/modules/system/audit-logs'
import { SettingsScreen } from '@/components/modules/system/settings'

const screens: Record<string, ComponentType<ModuleScreenProps>> = {
  overview: OverviewScreen,
  'student-list': StudentListScreen,
  'student-profile': StudentProfileScreen,
  'student-care': StudentCareScreen,
  applications: ApplicationsScreen,
  orders: OrdersScreen,
  partners: PartnersScreen,
  'japan-workforce': JapanWorkforceScreen,
  courses: CoursesScreen,
  classes: ClassesScreen,
  schedules: SchedulesScreen,
  materials: MaterialsScreen,
  exams: ExamBankScreen,
  'exam-sessions': ExamSessionsScreen,
  grading: GradingScreen,
  certificates: CertificatesScreen,
  dormitory: RoomsScreen,
  residences: ResidencesScreen,
  'service-tickets': ServiceTicketsScreen,
  accounting: TransactionsScreen,
  tuition: TuitionScreen,
  debts: DebtsScreen,
  'bank-accounts': BankAccountsScreen,
  reports: ReportsScreen,
  operations: OperationsScreen,
  permissions: PermissionsScreen,
  roles: RolesScreen,
  'audit-logs': AuditLogsScreen,
  settings: SettingsScreen,
}

export function ModuleScreen({ module, mode }: ModuleScreenProps) {
  const Screen = screens[module.id] ?? OverviewScreen
  return <Screen module={module} mode={mode} />
}
