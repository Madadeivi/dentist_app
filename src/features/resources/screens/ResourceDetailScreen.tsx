import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '@/shared/types'
import { Text } from '@/shared/components/atoms/Text'
import { Icon } from '@/shared/components/atoms/Icon'
import { Badge } from '@/shared/components/atoms/Badge'
import { Button } from '@/shared/components/atoms/Button'
import { Header } from '@/shared/components/molecules/Header'
import { mockResources } from '@/mock/resources.mock'
import { colors, spacing, borderRadius } from '@/theme'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

type ResourceDetailScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ResourceDetail'>
  route: RouteProp<RootStackParamList, 'ResourceDetail'>
}

const typeLabels: Record<string, string> = {
  article: 'Artículo',
  video: 'Video',
  guide: 'Guía',
  infographic: 'Infografía',
  tip: 'Consejo',
}

export const ResourceDetailScreen = ({ navigation, route }: ResourceDetailScreenProps) => {
  const { resourceId } = route.params
  const resource = mockResources.find((r) => r.id === resourceId)
  const [isFavorite, setIsFavorite] = useState(resource?.isFavorite || false)
  const [likes, setLikes] = useState(resource?.likes || 0)
  const [hasLiked, setHasLiked] = useState(false)

  if (!resource) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Recurso"
          leftAction={{ icon: 'arrow-back', onPress: () => navigation.goBack() }}
        />
        <View style={styles.emptyState}>
          <Text variant="body" color="secondary">
            Recurso no encontrado
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  const handleLike = () => {
    setHasLiked(!hasLiked)
    setLikes(hasLiked ? likes - 1 : likes + 1)
  }

  const handleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={typeLabels[resource.type]}
        leftAction={{ icon: 'arrow-back', onPress: () => navigation.goBack() }}
        rightAction={{
          icon: isFavorite ? 'favorite' : 'favorite-border',
          onPress: handleFavorite,
        }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        {resource.thumbnailUrl && (
          <Image source={{ uri: resource.thumbnailUrl }} style={styles.cover} />
        )}

        <View style={styles.content}>
          <View style={styles.meta}>
            <View style={styles.metaLeft}>
              {resource.readTime && (
                <View style={styles.metaItem}>
                  <Icon name="schedule" size={16} color={colors.text.secondary} />
                  <Text variant="caption" color="secondary">
                    {resource.readTime} min de lectura
                  </Text>
                </View>
              )}
              {resource.duration && (
                <View style={styles.metaItem}>
                  <Icon name="play-circle" size={16} color={colors.text.secondary} />
                  <Text variant="caption" color="secondary">
                    {Math.floor(resource.duration / 60)}:{(resource.duration % 60).toString().padStart(2, '0')}
                  </Text>
                </View>
              )}
              <View style={styles.metaItem}>
                <Icon name="visibility" size={16} color={colors.text.secondary} />
                <Text variant="caption" color="secondary">
                  {resource.views} vistas
                </Text>
              </View>
            </View>
          </View>

          <Text variant="h2" weight="bold" style={styles.title}>
            {resource.title}
          </Text>

          <Text variant="body" color="secondary" style={styles.description}>
            {resource.description}
          </Text>

          {resource.author && (
            <View style={styles.authorContainer}>
              <Icon name="person" size={20} color={colors.primary.main} />
              <View>
                <Text variant="caption" color="secondary">
                  Autor
                </Text>
                <Text variant="body" weight="semibold">
                  {resource.author}
                </Text>
              </View>
              <View style={styles.spacer} />
              <Text variant="caption" color="secondary">
                {format(resource.publishedAt, "d MMM yyyy", { locale: es })}
              </Text>
            </View>
          )}

          {resource.tags.length > 0 && (
            <View style={styles.tags}>
              {resource.tags.map((tag) => (
                <Badge key={tag} variant="default">
                  {tag}
                </Badge>
              ))}
            </View>
          )}

          {resource.content && (
            <View style={styles.contentSection}>
              <Text variant="body" style={styles.contentText}>
                {resource.content}
              </Text>
            </View>
          )}

          {resource.videoUrl && (
            <View style={styles.videoPlaceholder}>
              <Icon name="play-circle-filled" size={64} color={colors.primary.main} />
              <Text variant="body" weight="semibold">
                Video no disponible en demo
              </Text>
            </View>
          )}

          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.actionButton, hasLiked && styles.actionButtonActive]}
              onPress={handleLike}
            >
              <Icon
                name={hasLiked ? 'thumb-up' : 'thumb-up-off-alt'}
                size={24}
                color={hasLiked ? colors.primary.main : colors.text.secondary}
              />
              <Text
                variant="body"
                weight={hasLiked ? 'semibold' : 'regular'}
                style={[styles.actionText, hasLiked && styles.actionTextActive]}
              >
                {likes}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Icon name="share" size={24} color={colors.text.secondary} />
              <Text variant="body" style={styles.actionText}>
                Compartir
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Icon name="bookmark-border" size={24} color={colors.text.secondary} />
              <Text variant="body" style={styles.actionText}>
                Guardar
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  cover: {
    width: '100%',
    height: 250,
    backgroundColor: colors.neutral[200],
  },
  content: {
    padding: spacing.lg,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  metaLeft: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  title: {
    marginBottom: spacing.sm,
  },
  description: {
    marginBottom: spacing.md,
    lineHeight: 24,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
  },
  spacer: {
    flex: 1,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginBottom: spacing.lg,
  },
  contentSection: {
    marginBottom: spacing.lg,
  },
  contentText: {
    lineHeight: 26,
    color: colors.text.primary,
  },
  videoPlaceholder: {
    height: 200,
    backgroundColor: colors.neutral[100],
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  actionButtonActive: {
    backgroundColor: colors.primary.main + '15',
  },
  actionText: {
    color: colors.text.secondary,
  },
  actionTextActive: {
    color: colors.primary.main,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

