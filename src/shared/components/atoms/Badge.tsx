import React, { memo, useMemo } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from './Text'
import { colors, spacing, borderRadius } from '@/theme'

interface BadgeProps {
  count?: number
  variant?: 'primary' | 'success' | 'warning' | 'error'
  size?: 'sm' | 'md'
  maxCount?: number
}

const variantColors = {
  primary: colors.primary.main,
  success: colors.status.success,
  warning: colors.status.warning,
  error: colors.status.error,
}

const BadgeComponent = ({ count = 0, variant = 'primary', size = 'md', maxCount = 99 }: BadgeProps) => {
  const displayCount = useMemo(() => {
    return count > maxCount ? `${maxCount}+` : count.toString()
  }, [count, maxCount])

  if (count === 0) return null

  return (
    <View style={[styles.badge, styles[size], { backgroundColor: variantColors[variant] }]}>
      <Text variant="caption" color="white" weight="semibold" style={styles[`${size}Text`]}>
        {displayCount}
      </Text>
    </View>
  )
}

export const Badge = memo(BadgeComponent)

const styles = StyleSheet.create({
  badge: {
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  sm: {
    minWidth: 16,
    height: 16,
  },
  md: {
    minWidth: 20,
    height: 20,
  },
  smText: {
    fontSize: 10,
  },
  mdText: {
    fontSize: 12,
  },
})

