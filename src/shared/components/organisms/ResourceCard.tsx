import React from 'react'
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { Resource } from '@/shared/types'
import { Text } from '../atoms/Text'
import { Icon } from '../atoms/Icon'
import { Badge } from '../atoms/Badge'
import { colors, spacing, borderRadius } from '@/theme'

interface ResourceCardProps {
  resource: Resource
  onPress: () => void
}

const typeLabels: Record<string, string> = {
  article: 'Artículo',
  video: 'Video',
  guide: 'Guía',
  infographic: 'Infografía',
  tip: 'Consejo',
}

const typeIcons: Record<string, string> = {
  article: 'article',
  video: 'play-circle',
  guide: 'menu-book',
  infographic: 'image',
  tip: 'lightbulb',
}

export const ResourceCard = ({ resource, onPress }: ResourceCardProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      {resource.thumbnailUrl && (
        <Image source={{ uri: resource.thumbnailUrl }} style={styles.thumbnail} />
      )}
      
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.typeContainer}>
            <Icon name={typeIcons[resource.type] as any} size={16} color={colors.primary.main} />
            <Text variant="caption" weight="semibold" style={styles.typeText}>
              {typeLabels[resource.type]}
            </Text>
          </View>
          {resource.isFavorite && (
            <Icon name="favorite" size={20} color={colors.status.error} />
          )}
        </View>

        <Text variant="body" weight="bold" numberOfLines={2} style={styles.title}>
          {resource.title}
        </Text>

        <Text variant="caption" color="secondary" numberOfLines={2} style={styles.description}>
          {resource.description}
        </Text>

        <View style={styles.footer}>
          <View style={styles.meta}>
            {resource.readTime && (
              <View style={styles.metaItem}>
                <Icon name="schedule" size={14} color={colors.text.secondary} />
                <Text variant="caption" color="secondary">
                  {resource.readTime} min
                </Text>
              </View>
            )}
            {resource.duration && (
              <View style={styles.metaItem}>
                <Icon name="play-circle" size={14} color={colors.text.secondary} />
                <Text variant="caption" color="secondary">
                  {Math.floor(resource.duration / 60)}:{(resource.duration % 60).toString().padStart(2, '0')}
                </Text>
              </View>
            )}
            <View style={styles.metaItem}>
              <Icon name="visibility" size={14} color={colors.text.secondary} />
              <Text variant="caption" color="secondary">
                {resource.views}
              </Text>
            </View>
          </View>
        </View>

        {resource.tags.length > 0 && (
          <View style={styles.tags}>
            {resource.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="default" size="sm">
                {tag}
              </Badge>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  thumbnail: {
    width: '100%',
    height: 180,
    backgroundColor: colors.neutral[200],
  },
  content: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  typeText: {
    color: colors.primary.main,
  },
  title: {
    marginBottom: 4,
  },
  description: {
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  meta: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
})

