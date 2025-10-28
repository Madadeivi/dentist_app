export type AppointmentStatus = 'scheduled' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'

export type AppointmentType = 'checkup' | 'cleaning' | 'filling' | 'root-canal' | 'extraction' | 'orthodontics' | 'emergency' | 'consultation' | 'other'

export interface Appointment {
  id: string
  patientId: string
  dentistId: string
  patientName: string
  patientAvatar?: string
  date: Date
  startTime: string
  endTime: string
  duration: number
  type: AppointmentType
  status: AppointmentStatus
  notes?: string
  reason?: string
  treatmentId?: string
  createdAt: Date
  updatedAt: Date
}

export interface AppointmentCreateData {
  patientId: string
  date: Date
  startTime: string
  duration: number
  type: AppointmentType
  reason?: string
  notes?: string
}

export interface AppointmentUpdateData {
  date?: Date
  startTime?: string
  duration?: number
  type?: AppointmentType
  status?: AppointmentStatus
  notes?: string
}

