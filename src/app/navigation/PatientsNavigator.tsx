import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { PatientsStackParamList } from '@/shared/types'
import { PatientsListScreen } from '@/features/patients/screens/PatientsListScreen'
import { PatientDetailScreen } from '@/features/patients/screens/PatientDetailScreen'
import { TreatmentsListScreen } from '@/features/treatments/screens/TreatmentsListScreen'
import { TreatmentDetailScreen } from '@/features/treatments/screens/TreatmentDetailScreen'

const Stack = createStackNavigator<PatientsStackParamList>()

export const PatientsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="PatientsList" component={PatientsListScreen} />
      <Stack.Screen name="PatientDetail" component={PatientDetailScreen} />
      <Stack.Screen name="Treatments" component={TreatmentsListScreen} />
      <Stack.Screen name="TreatmentDetail" component={TreatmentDetailScreen} />
    </Stack.Navigator>
  )
}

