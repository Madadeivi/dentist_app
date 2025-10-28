# Modelos de Datos - DentalFlow

Este documento define todos los tipos, interfaces y modelos de datos utilizados en la aplicación DentalFlow.

---

## 📑 Índice

1. [Usuario y Autenticación](#usuario-y-autenticación)
2. [Pacientes](#pacientes)
3. [Citas](#citas)
4. [Tratamientos](#tratamientos)
5. [Mensajería](#mensajería)
6. [Recursos](#recursos)
7. [Estadísticas](#estadísticas)

---

## 👤 Usuario y Autenticación

### User

```typescript
interface User {
  id: string
  email: string
  type: 'dentist' | 'patient'
  profile: DentistProfile | PatientProfile
  createdAt: Date
  updatedAt: Date
  isVerified: boolean
  isActive: boolean
}
```

### DentistProfile

```typescript
interface DentistProfile {
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
```

### PatientProfile

```typescript
interface PatientProfile {
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
```

### Address

```typescript
interface Address {
  street: string
  number: string
  floor?: string
  apartment?: string
  city: string
  state: string
  postalCode: string
  country: string
}
```

### WorkingHours

```typescript
interface WorkingHours {
  monday?: TimeRange
  tuesday?: TimeRange
  wednesday?: TimeRange
  thursday?: TimeRange
  friday?: TimeRange
  saturday?: TimeRange
  sunday?: TimeRange
}

interface TimeRange {
  start: string
  end: string
  breakStart?: string
  breakEnd?: string
}
```

### EmergencyContact

```typescript
interface EmergencyContact {
  name: string
  relationship: string
  phone: string
}
```

### AuthCredentials

```typescript
interface LoginCredentials {
  email: string
  password: string
}

interface RegisterDentistData {
  email: string
  password: string
  name: string
  lastName: string
  phone: string
  licenseNumber: string
  specialization: string[]
}

interface RegisterPatientData {
  email: string
  password: string
  name: string
  lastName: string
  phone: string
  dateOfBirth: Date
  dni: string
}
```

### AuthResponse

```typescript
interface AuthResponse {
  user: User
  accessToken: string
  refreshToken: string
  expiresIn: number
}
```

---

## 👥 Pacientes

### Patient

```typescript
interface Patient {
  id: string
  dentistId: string
  profile: PatientProfile
  medicalHistory: MedicalHistory
  status: PatientStatus
  tags?: string[]
  notes?: Note[]
  documents?: Document[]
  createdAt: Date
  updatedAt: Date
  lastVisit?: Date
  nextAppointment?: Date
}
```

### PatientStatus

```typescript
type PatientStatus = 'active' | 'inactive' | 'pending' | 'archived'
```

### MedicalHistory

```typescript
interface MedicalHistory {
  patientId: string
  allergies: string[]
  medications: string[]
  medicalConditions: string[]
  previousSurgeries: Surgery[]
  familyHistory?: string[]
  habits?: Habits
  dentalHistory?: DentalHistory
}
```

### DentalHistory

```typescript
interface DentalHistory {
  lastCleaning?: Date
  lastXRay?: Date
  orthodonticTreatment?: boolean
  orthodonticDetails?: string
  dentalImplants?: boolean
  implantDetails?: string
  sensitivities?: string[]
  currentIssues?: string[]
}
```

### Habits

```typescript
interface Habits {
  smoking: boolean
  smokingFrequency?: 'light' | 'moderate' | 'heavy'
  alcohol: boolean
  alcoholFrequency?: 'occasional' | 'moderate' | 'frequent'
  brushingFrequency?: number
  flossing: boolean
  flossingFrequency?: number
}
```

### Surgery

```typescript
interface Surgery {
  id: string
  date: Date
  type: string
  description: string
  hospital?: string
  complications?: string
}
```

### Note

```typescript
interface Note {
  id: string
  content: string
  createdBy: string
  createdAt: Date
  updatedAt?: Date
  type: 'general' | 'medical' | 'financial' | 'reminder'
  priority?: 'low' | 'medium' | 'high'
}
```

### Document

```typescript
interface Document {
  id: string
  name: string
  type: DocumentType
  url: string
  size: number
  mimeType: string
  uploadedBy: string
  uploadedAt: Date
  description?: string
}

type DocumentType = 
  | 'xray' 
  | 'photo' 
  | 'prescription' 
  | 'report' 
  | 'insurance' 
  | 'consent' 
  | 'other'
```

### PatientsFilter

```typescript
interface PatientsFilter {
  status?: PatientStatus
  hasUpcomingAppointment?: boolean
  hasPendingTreatment?: boolean
  lastVisitBefore?: Date
  lastVisitAfter?: Date
  tags?: string[]
  search?: string
}
```

---

## 📅 Citas

### Appointment

```typescript
interface Appointment {
  id: string
  dentistId: string
  patientId: string
  patient: Pick<Patient, 'id' | 'profile'>
  date: Date
  startTime: string
  endTime: string
  duration: number
  type: AppointmentType
  status: AppointmentStatus
  reason: string
  notes?: string
  treatmentId?: string
  reminders?: Reminder[]
  createdAt: Date
  updatedAt: Date
}
```

### AppointmentType

```typescript
type AppointmentType = 
  | 'cleaning' 
  | 'checkup' 
  | 'filling' 
  | 'extraction' 
  | 'root-canal' 
  | 'orthodontics' 
  | 'cosmetic' 
  | 'emergency' 
  | 'consultation' 
  | 'follow-up' 
  | 'other'
```

### AppointmentStatus

```typescript
type AppointmentStatus = 
  | 'scheduled' 
  | 'confirmed' 
  | 'in-progress' 
  | 'completed' 
  | 'cancelled' 
  | 'no-show' 
  | 'rescheduled'
```

### Reminder

```typescript
interface Reminder {
  id: string
  appointmentId: string
  type: ReminderType
  scheduledFor: Date
  sent: boolean
  sentAt?: Date
  method: 'push' | 'email' | 'sms'
}

type ReminderType = '24-hours' | '1-hour' | '30-minutes' | 'custom'
```

### AppointmentSlot

```typescript
interface AppointmentSlot {
  date: Date
  startTime: string
  endTime: string
  available: boolean
  appointmentId?: string
}
```

### CalendarDay

```typescript
interface CalendarDay {
  date: Date
  appointments: Appointment[]
  hasAppointments: boolean
  appointmentCount: number
  isToday: boolean
  isPast: boolean
}
```

---

## 💊 Tratamientos

### Treatment

```typescript
interface Treatment {
  id: string
  patientId: string
  dentistId: string
  name: string
  type: TreatmentType
  status: TreatmentStatus
  diagnosis: string
  description?: string
  startDate: Date
  endDate?: Date
  estimatedDuration?: number
  phases?: TreatmentPhase[]
  procedures?: Procedure[]
  prescription?: Prescription[]
  budget?: Budget
  payment?: Payment
  notes?: string
  createdAt: Date
  updatedAt: Date
}
```

### TreatmentType

```typescript
type TreatmentType = 
  | 'preventive' 
  | 'restorative' 
  | 'endodontic' 
  | 'periodontic' 
  | 'orthodontic' 
  | 'prosthodontic' 
  | 'cosmetic' 
  | 'oral-surgery' 
  | 'pediatric' 
  | 'other'
```

### TreatmentStatus

```typescript
type TreatmentStatus = 
  | 'planned' 
  | 'in-progress' 
  | 'on-hold' 
  | 'completed' 
  | 'cancelled'
```

### TreatmentPhase

```typescript
interface TreatmentPhase {
  id: string
  treatmentId: string
  name: string
  order: number
  status: TreatmentStatus
  startDate?: Date
  endDate?: Date
  description?: string
  estimatedCost?: number
}
```

### Procedure

```typescript
interface Procedure {
  id: string
  treatmentId: string
  appointmentId?: string
  name: string
  date: Date
  duration: number
  tooth?: string[]
  description?: string
  notes?: string
  cost?: number
  performedBy: string
  assistants?: string[]
  materials?: Material[]
  images?: string[]
}
```

### Material

```typescript
interface Material {
  id: string
  name: string
  quantity: number
  unit: string
  cost?: number
}
```

### Prescription

```typescript
interface Prescription {
  id: string
  treatmentId: string
  medication: string
  dosage: string
  frequency: string
  duration: string
  instructions?: string
  prescribedAt: Date
  prescribedBy: string
}
```

### Budget

```typescript
interface Budget {
  id: string
  treatmentId: string
  totalAmount: number
  currency: string
  breakdown: BudgetItem[]
  validUntil?: Date
  approved: boolean
  approvedAt?: Date
}

interface BudgetItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  total: number
}
```

### Payment

```typescript
interface Payment {
  id: string
  treatmentId: string
  amount: number
  currency: string
  method: PaymentMethod
  status: PaymentStatus
  date: Date
  reference?: string
  notes?: string
}

type PaymentMethod = 'cash' | 'card' | 'transfer' | 'insurance' | 'other'

type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'
```

### Diagnosis

```typescript
interface Diagnosis {
  id: string
  patientId: string
  dentistId: string
  date: Date
  findings: string[]
  diagnosis: string
  recommendations: string[]
  urgency: 'low' | 'medium' | 'high' | 'urgent'
  images?: string[]
  xrays?: string[]
}
```

---

## 💬 Mensajería

### Conversation

```typescript
interface Conversation {
  id: string
  participants: Participant[]
  lastMessage?: Message
  unreadCount: number
  createdAt: Date
  updatedAt: Date
}
```

### Participant

```typescript
interface Participant {
  id: string
  type: 'dentist' | 'patient'
  name: string
  avatar?: string
  isOnline: boolean
  lastSeen?: Date
}
```

### Message

```typescript
interface Message {
  id: string
  conversationId: string
  senderId: string
  senderType: 'dentist' | 'patient'
  content: string
  type: MessageType
  attachments?: Attachment[]
  isRead: boolean
  readAt?: Date
  sentAt: Date
  editedAt?: Date
  deletedAt?: Date
}
```

### MessageType

```typescript
type MessageType = 'text' | 'image' | 'document' | 'resource' | 'appointment' | 'system'
```

### Attachment

```typescript
interface Attachment {
  id: string
  type: 'image' | 'document' | 'video' | 'audio'
  name: string
  url: string
  size: number
  mimeType: string
  thumbnail?: string
}
```

---

## 📚 Recursos

### Resource

```typescript
interface Resource {
  id: string
  title: string
  description: string
  category: ResourceCategory
  type: ResourceType
  content?: string
  url?: string
  thumbnail?: string
  images?: string[]
  videos?: string[]
  tags?: string[]
  author?: string
  publishedAt: Date
  views: number
  likes: number
}
```

### ResourceCategory

```typescript
type ResourceCategory = 
  | 'oral-hygiene' 
  | 'procedures' 
  | 'post-treatment-care' 
  | 'prevention' 
  | 'nutrition' 
  | 'pediatric' 
  | 'orthodontics' 
  | 'cosmetic' 
  | 'emergency' 
  | 'general'
```

### ResourceType

```typescript
type ResourceType = 'article' | 'video' | 'infographic' | 'guide' | 'faq'
```

---

## 📊 Estadísticas

### DashboardStats

```typescript
interface DashboardStats {
  activePatients: number
  todayAppointments: number
  pendingTreatments: number
  monthlyRevenue: number
  upcomingAppointments: UpcomingAppointment[]
  reminders: Reminder[]
  recentActivity: Activity[]
}
```

### UpcomingAppointment

```typescript
interface UpcomingAppointment {
  id: string
  patient: {
    id: string
    name: string
    avatar?: string
  }
  time: string
  type: AppointmentType
  duration: number
}
```

### Activity

```typescript
interface Activity {
  id: string
  type: ActivityType
  description: string
  timestamp: Date
  relatedEntity?: {
    type: 'patient' | 'appointment' | 'treatment'
    id: string
    name: string
  }
}

type ActivityType = 
  | 'appointment-created' 
  | 'appointment-completed' 
  | 'treatment-started' 
  | 'treatment-completed' 
  | 'patient-registered' 
  | 'message-received'
```

### MonthlyStats

```typescript
interface MonthlyStats {
  month: number
  year: number
  totalAppointments: number
  completedAppointments: number
  cancelledAppointments: number
  noShowAppointments: number
  newPatients: number
  revenue: number
  averageAppointmentDuration: number
  mostCommonTreatments: TreatmentTypeCount[]
}

interface TreatmentTypeCount {
  type: TreatmentType
  count: number
  percentage: number
}
```

---

## 🔧 Utilidades y Tipos Auxiliares

### Pagination

```typescript
interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasNext: boolean
    hasPrev: boolean
  }
}

interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}
```

### API Response

```typescript
interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: ApiError
  message?: string
}

interface ApiError {
  code: string
  message: string
  details?: Record<string, any>
}
```

### Notification

```typescript
interface Notification {
  id: string
  userId: string
  type: NotificationType
  title: string
  message: string
  data?: Record<string, any>
  isRead: boolean
  createdAt: Date
  readAt?: Date
}

type NotificationType = 
  | 'appointment-reminder' 
  | 'message' 
  | 'treatment-update' 
  | 'payment-due' 
  | 'system'
```

### BloodType

```typescript
type BloodType = 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-'
```

### TimeSlot

```typescript
interface TimeSlot {
  hour: number
  minute: number
  formatted: string
}
```

### DateRange

```typescript
interface DateRange {
  start: Date
  end: Date
}
```

---

## 📝 Validación con Zod

### Ejemplos de Esquemas

#### Login Schema

```typescript
import { z } from 'zod'

const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres'),
})

type LoginFormData = z.infer<typeof loginSchema>
```

#### Register Dentist Schema

```typescript
const registerDentistSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .regex(/[A-Z]/, 'Debe contener al menos una mayúscula')
    .regex(/[0-9]/, 'Debe contener al menos un número'),
  confirmPassword: z.string(),
  name: z.string().min(2, 'El nombre es requerido'),
  lastName: z.string().min(2, 'El apellido es requerido'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Teléfono inválido'),
  licenseNumber: z.string().min(4, 'Número de licencia requerido'),
  specialization: z.array(z.string()).min(1, 'Selecciona al menos una especialización'),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Las contraseñas no coinciden',
  path: ['confirmPassword'],
})
```

#### Appointment Schema

```typescript
const appointmentSchema = z.object({
  patientId: z.string().uuid('ID de paciente inválido'),
  date: z.date().min(new Date(), 'La fecha debe ser futura'),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Hora inválida'),
  duration: z.number().min(15).max(480),
  type: z.enum([
    'cleaning',
    'checkup',
    'filling',
    'extraction',
    'root-canal',
    'orthodontics',
    'cosmetic',
    'emergency',
    'consultation',
    'follow-up',
    'other',
  ]),
  reason: z.string().min(5, 'Describe el motivo de la cita'),
  notes: z.string().optional(),
})
```

---

## 🎯 Tipos de Navegación

### Navigation Params

```typescript
type RootStackParamList = {
  Auth: undefined
  Main: undefined
}

type AuthStackParamList = {
  UserTypeSelection: undefined
  Login: undefined
  RegisterDentist: undefined
  RegisterPatient: undefined
  AccountConfirmation: { email: string }
}

type MainTabParamList = {
  Dashboard: undefined
  Patients: undefined
  Calendar: undefined
  Messages: undefined
  Settings: undefined
}

type PatientsStackParamList = {
  PatientsList: undefined
  PatientDetail: { patientId: string }
  Treatments: { patientId: string; treatmentId?: string }
}

type MessagesStackParamList = {
  MessagesList: undefined
  Chat: { conversationId: string; recipientName: string }
}
```

---

Este documento será actualizado conforme se agreguen nuevos modelos o se modifiquen los existentes durante el desarrollo de la aplicación.

