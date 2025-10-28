export type TreatmentStatus = 'planned' | 'in-progress' | 'completed' | 'cancelled'

export type TreatmentType =
  | 'cleaning'
  | 'filling'
  | 'root-canal'
  | 'extraction'
  | 'implant'
  | 'crown'
  | 'orthodontics'
  | 'whitening'
  | 'other'

export interface Treatment {
  id: string
  patientId: string
  dentistId: string
  type: TreatmentType
  title: string
  description: string
  status: TreatmentStatus
  startDate: Date
  endDate?: Date
  estimatedSessions: number
  completedSessions: number
  diagnosis: string
  notes?: string
  cost: number
  paid: number
  images?: string[]
  xrays?: string[]
  prescriptions?: Prescription[]
  teethAffected?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Prescription {
  id: string
  medication: string
  dosage: string
  frequency: string
  duration: string
  instructions?: string
  prescribedAt: Date
}

export interface TreatmentSession {
  id: string
  treatmentId: string
  date: Date
  duration: number
  notes: string
  procedures: string[]
  nextSessionDate?: Date
}

export interface Diagnosis {
  id: string
  patientId: string
  date: Date
  dentistId: string
  title: string
  description: string
  severity: 'low' | 'medium' | 'high'
  teethAffected: string[]
  images?: string[]
  recommendedTreatment?: string
}

