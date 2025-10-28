import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { AuthStackParamList } from '@/shared/types'

import { UserTypeSelectionScreen } from '@/features/auth/screens/UserTypeSelectionScreen'
import { LoginScreen } from '@/features/auth/screens/LoginScreen'
import { RegisterDentistScreen } from '@/features/auth/screens/RegisterDentistScreen'
import { RegisterPatientScreen } from '@/features/auth/screens/RegisterPatientScreen'
import { AccountConfirmationScreen } from '@/features/auth/screens/AccountConfirmationScreen'

const Stack = createStackNavigator<AuthStackParamList>()

export const AuthNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="UserTypeSelection"
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#fff' },
      }}
    >
      <Stack.Screen name="UserTypeSelection" component={UserTypeSelectionScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="RegisterDentist" component={RegisterDentistScreen} />
      <Stack.Screen name="RegisterPatient" component={RegisterPatientScreen} />
      <Stack.Screen name="AccountConfirmation" component={AccountConfirmationScreen} />
    </Stack.Navigator>
  )
}

