import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, FlatList, SafeAreaView, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { MessagesStackParamList } from '@/shared/types'
import { Icon } from '@/shared/components/atoms/Icon'
import { Header } from '@/shared/components/molecules/Header'
import { MessageBubble } from '@/shared/components/organisms/MessageBubble'
import { useAuthStore } from '@/store'
import { mockMessages } from '@/mock/messaging.mock'
import { colors, spacing, borderRadius } from '@/theme'

type ChatScreenProps = {
  navigation: StackNavigationProp<MessagesStackParamList, 'Chat'>
  route: RouteProp<MessagesStackParamList, 'Chat'>
}

export const ChatScreen = ({ navigation, route }: ChatScreenProps) => {
  const { conversationId, recipientName } = route.params
  const { user } = useAuthStore()
  const [messageText, setMessageText] = useState('')
  const flatListRef = useRef<FlatList>(null)

  const conversationMessages = mockMessages
    .filter((msg) => msg.conversationId === conversationId)
    .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())

  useEffect(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true })
    }, 100)
  }, [])

  const handleSend = () => {
    if (messageText.trim()) {
      console.log('Enviando mensaje:', messageText)
      setMessageText('')
    }
  }

  const renderMessage = ({ item, index }: { item: typeof conversationMessages[0]; index: number }) => {
    const isOwnMessage = item.senderId === user?.id
    const previousMessage = index > 0 ? conversationMessages[index - 1] : null
    const showAvatar = !previousMessage || previousMessage.senderId !== item.senderId

    return <MessageBubble message={item} isOwnMessage={isOwnMessage} showAvatar={showAvatar} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={recipientName}
        subtitle="En línea"
        leftAction={{ icon: 'arrow-back', onPress: () => navigation.goBack() }}
        rightAction={{ icon: 'more-vert', onPress: () => console.log('Opciones') }}
      />

      <KeyboardAvoidingView
        style={styles.content}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={conversationMessages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Icon name="attach-file" size={24} color={colors.text.secondary} />
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            placeholder="Escribe un mensaje..."
            placeholderTextColor={colors.text.secondary}
            value={messageText}
            onChangeText={setMessageText}
            multiline
            maxLength={500}
          />

          <TouchableOpacity
            style={[styles.sendButton, !messageText.trim() && styles.sendButtonDisabled]}
            onPress={handleSend}
            disabled={!messageText.trim()}
          >
            <Icon name="send" size={24} color={messageText.trim() ? colors.primary.main : colors.text.disabled} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  content: {
    flex: 1,
  },
  messagesList: {
    paddingVertical: spacing.md,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background.white,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    gap: spacing.sm,
  },
  attachButton: {
    padding: spacing.xs,
    marginBottom: 4,
  },
  input: {
    flex: 1,
    maxHeight: 100,
    minHeight: 40,
    backgroundColor: colors.background.light,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.text.primary,
  },
  sendButton: {
    padding: spacing.xs,
    marginBottom: 4,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
})

