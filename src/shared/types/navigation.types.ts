export type RootStackParamList = {
  Auth: undefined
  Main: undefined
  AppointmentForm: { appointmentId?: string }
  Resources: undefined
  ResourceDetail: { resourceId: string }
  ProfileEdit: undefined
  ChangePassword: undefined
}

export type AuthStackParamList = {
  UserTypeSelection: undefined
  Login: undefined
  RegisterDentist: undefined
  RegisterPatient: undefined
  AccountConfirmation: { email: string }
}

export type MainTabParamList = {
  Dashboard: undefined
  Patients: undefined
  Calendar: undefined
  Messages: undefined
  Settings: undefined
}

export type PatientsStackParamList = {
  PatientsList: undefined
  PatientDetail: { patientId: string }
  Treatments: { patientId: string }
  TreatmentDetail: { treatmentId: string }
}

export type MessagesStackParamList = {
  MessagesList: undefined
  Chat: { conversationId: string; recipientName: string }
}

