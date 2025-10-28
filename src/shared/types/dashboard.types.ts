export interface DashboardStats {
  totalPatients: number
  todayAppointments: number
  pendingTreatments: number
  monthRevenue: number
  patientsChange: number
  appointmentsChange: number
  treatmentsChange: number
  revenueChange: number
}

export interface QuickAction {
  id: string
  icon: string
  label: string
  route: string
  color: string
}

