import React, { memo, useMemo } from 'react'
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native'
import { Text } from './Text'
import { colors, borderRadius } from '@/theme'

interface AvatarProps {
  source?: ImageSourcePropType
  src?: string
  fallback?: string
  name?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  status?: 'online' | 'offline' | 'busy'
}

const sizes = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 96,
}

const statusColors = {
  online: colors.status.success,
  offline: colors.neutral[400],
  busy: colors.status.warning,
}

const AvatarComponent = ({ source, src, fallback, name, size = 'md', status }: AvatarProps) => {
  const avatarSize = sizes[size]
  
  const initials = useMemo(() => {
    const displayName = name || fallback || '?'
    return displayName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }, [name, fallback])

  const imageSource = useMemo(() => {
    if (source) return source
    if (src) return { uri: src }
    return undefined
  }, [source, src])

  return (
    <View style={[styles.container, { width: avatarSize, height: avatarSize }]}>
      {imageSource ? (
        <Image source={imageSource} style={[styles.image, { width: avatarSize, height: avatarSize }]} />
      ) : (
        <View style={[styles.placeholder, { width: avatarSize, height: avatarSize }]}>
          <Text variant="body" color="white" weight="semibold">
            {initials}
          </Text>
        </View>
      )}
      {status && (
        <View
          style={[
            styles.statusDot,
            { backgroundColor: statusColors[status], width: avatarSize * 0.25, height: avatarSize * 0.25 },
          ]}
        />
      )}
    </View>
  )
}

export const Avatar = memo(AvatarComponent)

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    borderRadius: borderRadius.full,
  },
  placeholder: {
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.background.white,
  },
})

