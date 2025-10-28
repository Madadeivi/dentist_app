import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainTabParamList } from '@/shared/types'
import { Icon } from '@/shared/components/atoms'
import { colors } from '@/theme'
import { DentistDashboardScreen } from '@/features/dashboard/screens/DentistDashboardScreen'
import { PatientsNavigator } from './PatientsNavigator'
import { CalendarScreen } from '@/features/appointments/screens/CalendarScreen'
import { MessagesNavigator } from './MessagesNavigator'
import { SettingsScreen } from '@/features/settings/screens/SettingsScreen'

const Tab = createBottomTabNavigator<MainTabParamList>()

export const MainNavigator = () => {
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
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DentistDashboardScreen}
        options={{
          tabBarLabel: 'Panel',
          tabBarIcon: ({ color, size }) => <Icon name="dashboard" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Patients"
        component={PatientsNavigator}
        options={{
          tabBarLabel: 'Pacientes',
          tabBarIcon: ({ color, size }) => <Icon name="group" size={size} color={color} />,
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarLabel: 'Calendario',
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

