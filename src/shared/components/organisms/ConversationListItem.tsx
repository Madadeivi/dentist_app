import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Conversation } from '@/shared/types'
import { Avatar } from '../atoms/Avatar'
import { Text } from '../atoms/Text'
import { Badge } from '../atoms/Badge'
import { colors, spacing, borderRadius } from '@/theme'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

interface ConversationListItemProps {
  conversation: Conversation
  onPress: () => void
}

export const ConversationListItem = ({ conversation, onPress }: ConversationListItemProps) => {
  const { participantName, participantAvatar, lastMessage, unreadCount, updatedAt } = conversation
  const hasUnread = unreadCount > 0

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Avatar src={participantAvatar} fallback={participantName[0]} size="lg" />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text
            variant="body"
            weight={hasUnread ? 'bold' : 'semibold'}
            numberOfLines={1}
            style={styles.name}
          >
            {participantName}
          </Text>
          <Text variant="caption" color="secondary">
            {formatDistanceToNow(updatedAt, { addSuffix: true, locale: es })}
          </Text>
        </View>

        <View style={styles.messageRow}>
          {lastMessage && (
            <Text
              variant="caption"
              color={hasUnread ? 'primary' : 'secondary'}
              weight={hasUnread ? 'semibold' : 'regular'}
              numberOfLines={2}
              style={styles.lastMessage}
            >
              {lastMessage.content}
            </Text>
          )}
          {hasUnread && (
            <Badge variant="primary" size="sm">
              {unreadCount}
            </Badge>
          )}
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: spacing.md,
    backgroundColor: colors.background.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
    gap: spacing.md,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    flex: 1,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  lastMessage: {
    flex: 1,
  },
})

