import { DashboardStats, QuickAction } from '@/shared/types'
import { colors } from '@/theme'

export const mockDashboardStats: DashboardStats = {
  totalPatients: 247,
  todayAppointments: 8,
  pendingTreatments: 15,
  monthRevenue: 28450,
  patientsChange: 12.5,
  appointmentsChange: -3.2,
  treatmentsChange: 8.7,
  revenueChange: 15.3,
}

export const mockQuickActions: QuickAction[] = [
  {
    id: 'qa-1',
    icon: 'add',
    label: 'Nueva Cita',
    route: 'NewAppointment',
    color: colors.primary.main,
  },
  {
    id: 'qa-2',
    icon: 'person-add',
    label: 'Nuevo Paciente',
    route: 'NewPatient',
    color: colors.status.success,
  },
  {
    id: 'qa-3',
    icon: 'calendar-month',
    label: 'Calendario',
    route: 'Calendar',
    color: colors.status.info,
  },
  {
    id: 'qa-4',
    icon: 'chat',
    label: 'Mensajes',
    route: 'Messages',
    color: colors.status.warning,
  },
]

