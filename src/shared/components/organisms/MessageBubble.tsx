import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Message } from '@/shared/types'
import { Text } from '../atoms/Text'
import { Avatar } from '../atoms/Avatar'
import { colors, spacing, borderRadius } from '@/theme'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface MessageBubbleProps {
  message: Message
  isOwnMessage: boolean
  showAvatar?: boolean
}

export const MessageBubble = ({ message, isOwnMessage, showAvatar = true }: MessageBubbleProps) => {
  return (
    <View style={[styles.container, isOwnMessage && styles.containerOwn]}>
      {!isOwnMessage && showAvatar && (
        <Avatar
          src={message.senderAvatar}
          fallback={message.senderName[0]}
          size="sm"
          style={styles.avatar}
        />
      )}
      {!isOwnMessage && !showAvatar && <View style={styles.avatarPlaceholder} />}

      <View style={[styles.bubble, isOwnMessage ? styles.bubbleOwn : styles.bubbleOther]}>
        {!isOwnMessage && (
          <Text variant="caption" weight="semibold" style={styles.senderName}>
            {message.senderName}
          </Text>
        )}
        <Text
          variant="body"
          style={[styles.content, isOwnMessage && styles.contentOwn]}
        >
          {message.content}
        </Text>
        <Text
          variant="caption"
          style={[styles.timestamp, isOwnMessage && styles.timestampOwn]}
        >
          {format(message.timestamp, 'HH:mm', { locale: es })}
        </Text>
      </View>

      {isOwnMessage && <View style={styles.avatarPlaceholder} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  containerOwn: {
    justifyContent: 'flex-end',
  },
  avatar: {
    alignSelf: 'flex-end',
  },
  avatarPlaceholder: {
    width: 32,
  },
  bubble: {
    maxWidth: '70%',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.xs,
  },
  bubbleOwn: {
    backgroundColor: colors.primary.main,
    borderBottomRightRadius: 4,
  },
  bubbleOther: {
    backgroundColor: colors.background.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  senderName: {
    color: colors.primary.main,
    marginBottom: 2,
  },
  content: {
    color: colors.text.primary,
  },
  contentOwn: {
    color: '#fff',
  },
  timestamp: {
    color: colors.text.secondary,
    fontSize: 11,
    alignSelf: 'flex-end',
  },
  timestampOwn: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
})

