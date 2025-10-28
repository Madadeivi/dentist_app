import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainTabParamList } from '@/shared/types'
import { Icon } from '@/shared/components/atoms'
import { useThemeColors } from '@/theme'
import { PatientDashboardScreen } from '@/features/patients/screens/PatientDashboardScreen'
import { PatientAppointmentsScreen } from '@/features/patients/screens/PatientAppointmentsScreen'
import { PatientProfileScreen } from '@/features/patients/screens/PatientProfileScreen'
import { MessagesNavigator } from './MessagesNavigator'
import { SettingsScreen } from '@/features/settings/screens/SettingsScreen'

const Tab = createBottomTabNavigator<MainTabParamList>()

export const PatientNavigator = () => {
  const colors = useThemeColors()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
          backgroundColor: colors.background.secondary,
          borderTopColor: colors.border.primary,
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={PatientDashboardScreen}
        options={{
          tabBarLabel: 'Inicio',
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={PatientAppointmentsScreen}
        options={{
          tabBarLabel: 'Citas',
          tabBarIcon: ({ color, size }) => <Icon name="calendar-today" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Messages"
        component={MessagesNavigator}
        options={{
          tabBarLabel: 'Mensajes',
          tabBarIcon: ({ color, size }) => <Icon name="chat-bubble" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Patients"
        component={PatientProfileScreen}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => <Icon name="person" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Ajustes',
          tabBarIcon: ({ color, size }) => <Icon name="settings" size={size} color={color} />,
        }}
      />
    </Tab.Navigator>
  )
}

