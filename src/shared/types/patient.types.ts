import { PatientProfile } from './user.types'

export interface Patient {
  id: string
  profile: PatientProfile
  email: string
  dentistId: string
  status: 'active' | 'inactive' | 'archived'
  lastVisit?: Date
  nextAppointment?: Date
  totalVisits: number
  pendingPayments: number
  notes?: string
  tags?: string[]
  createdAt: Date
  updatedAt: Date
}

export interface MedicalHistory {
  patientId: string
  allergies: string[]
  medications: string[]
  conditions: string[]
  surgeries: Surgery[]
  familyHistory: string[]
  habits: {
    smoking: boolean
    alcohol: boolean
    exerciseFrequency?: string
  }
  lastUpdated: Date
}

export interface Surgery {
  date: Date
  type: string
  notes?: string
}

export interface DentalRecord {
  id: string
  patientId: string
  date: Date
  type: 'checkup' | 'treatment' | 'emergency' | 'followup'
  dentistId: string
  diagnosis: string
  treatment: string
  prescriptions?: Prescription[]
  images?: string[]
  xrays?: string[]
  notes?: string
  cost?: number
  paid?: boolean
}

export interface Prescription {
  medication: string
  dosage: string
  frequency: string
  duration: string
  notes?: string
}

export interface PatientStats {
  totalVisits: number
  upcomingAppointments: number
  completedTreatments: number
  pendingTreatments: number
  totalSpent: number
  lastVisit?: Date
  nextAppointment?: Date
}

