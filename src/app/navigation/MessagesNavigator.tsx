import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MessagesStackParamList } from '@/shared/types'
import { MessagesListScreen } from '@/features/messaging/screens/MessagesListScreen'
import { ChatScreen } from '@/features/messaging/screens/ChatScreen'

const Stack = createStackNavigator<MessagesStackParamList>()

export const MessagesNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MessagesList" component={MessagesListScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  )
}

