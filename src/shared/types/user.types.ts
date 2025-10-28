export interface Address {
  street: string
  number: string
  floor?: string
  apartment?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface WorkingHours {
  monday?: TimeRange
  tuesday?: TimeRange
  wednesday?: TimeRange
  thursday?: TimeRange
  friday?: TimeRange
  saturday?: TimeRange
  sunday?: TimeRange
}

export interface TimeRange {
  start: string
  end: string
  breakStart?: string
  breakEnd?: string
}

export interface DentistProfile {
  name: string
  lastName: string
  phone: string
  avatar?: string
  licenseNumber: string
  specialization: string[]
  clinicName?: string
  clinicAddress?: Address
  workingHours?: WorkingHours
  bio?: string
}

export interface EmergencyContact {
  name: string
  relationship: string
  phone: string
}

export type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'

export interface PatientProfile {
  name: string
  lastName: string
  phone: string
  avatar?: string
  dateOfBirth: Date
  dni: string
  address?: Address
  emergencyContact?: EmergencyContact
  allergies?: string[]
  medicalConditions?: string[]
  bloodType?: BloodType
}

export interface User {
  id: string
  email: string
  type: 'dentist' | 'patient'
  profile: DentistProfile | PatientProfile
  createdAt: Date
  updatedAt: Date
  isVerified: boolean
  isActive: boolean
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterDentistData {
  email: string
  password: string
  name: string
  lastName: string
  phone: string
  licenseNumber: string
  specialization: string[]
}

export interface RegisterPatientData {
  email: string
  password: string
  name: string
  lastName: string
  phone: string
  dateOfBirth: Date
  dni: string
}

export interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
  expiresIn: number
}

