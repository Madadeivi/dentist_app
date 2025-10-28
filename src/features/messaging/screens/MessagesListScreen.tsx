import React, { useState } from 'react'
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { MessagesStackParamList } from '@/shared/types'
import { Text } from '@/shared/components/atoms/Text'
import { Icon } from '@/shared/components/atoms/Icon'
import { SearchBar } from '@/shared/components/molecules/SearchBar'
import { ConversationListItem } from '@/shared/components/organisms/ConversationListItem'
import { mockConversations } from '@/mock/messaging.mock'
import { colors, spacing } from '@/theme'

type MessagesListScreenProps = {
  navigation: StackNavigationProp<MessagesStackParamList, 'MessagesList'>
}

export const MessagesListScreen = ({ navigation }: MessagesListScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredConversations = mockConversations.filter((conv) =>
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const unreadCount = mockConversations.reduce((acc, conv) => acc + conv.unreadCount, 0)

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" weight="bold">
          Mensajes
        </Text>
        {unreadCount > 0 && (
          <View style={styles.unreadBadge}>
            <Text variant="caption" weight="bold" style={styles.unreadText}>
              {unreadCount} sin leer
            </Text>
          </View>
        )}
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Buscar conversaciones..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConversationListItem
            conversation={item}
            onPress={() =>
              navigation.navigate('Chat', {
                conversationId: item.id,
                recipientName: item.participantName,
              })
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="chat-bubble-outline" size={64} color={colors.text.disabled} />
            <Text variant="body" color="secondary" align="center">
              {searchQuery ? 'No se encontraron conversaciones' : 'No tienes mensajes aún'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  unreadBadge: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  unreadText: {
    color: '#fff',
    fontSize: 12,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['2xl'],
    gap: spacing.md,
  },
})

