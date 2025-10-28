import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useAuthStore } from '@/store'
import { RootStackParamList } from '@/shared/types'
import { AuthNavigator } from './AuthNavigator'
import { MainNavigator } from './MainNavigator'
import { PatientNavigator } from './PatientNavigator'
import { AppointmentFormScreen } from '@/features/appointments/screens/AppointmentFormScreen'
import { ResourcesScreen } from '@/features/resources/screens/ResourcesScreen'
import { ResourceDetailScreen } from '@/features/resources/screens/ResourceDetailScreen'
import { ProfileEditScreen } from '@/features/settings/screens/ProfileEditScreen'
import { ChangePasswordScreen } from '@/features/settings/screens/ChangePasswordScreen'

const Stack = createStackNavigator<RootStackParamList>()

export const RootNavigator = () => {
  const { isAuthenticated, user } = useAuthStore()
  const isDentist = user?.type === 'dentist'

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen
              name="Main"
              component={isDentist ? MainNavigator : PatientNavigator}
            />
            {isDentist && (
              <Stack.Screen
                name="AppointmentForm"
                component={AppointmentFormScreen}
                options={{ presentation: 'modal' }}
              />
            )}
            <Stack.Screen
              name="Resources"
              component={ResourcesScreen}
              options={{ presentation: 'modal' }}
            />
            <Stack.Screen name="ResourceDetail" component={ResourceDetailScreen} />
            <Stack.Screen
              name="ProfileEdit"
              component={ProfileEditScreen}
              options={{ presentation: 'modal' }}
            />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          </>
        ) : (
          <Stack.Screen name="Auth" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

