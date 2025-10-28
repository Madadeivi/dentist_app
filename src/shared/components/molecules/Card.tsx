import React from 'react'
import { View, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native'
import { colors, spacing, borderRadius, shadows } from '@/theme'

interface CardProps {
  children: React.ReactNode
  variant?: 'default' | 'outlined' | 'elevated'
  padding?: keyof typeof spacing
  onPress?: () => void
  style?: ViewStyle
}

export const Card = ({ children, variant = 'default', padding = 'md', onPress, style }: CardProps) => {
  const Container = onPress ? TouchableOpacity : View

  return (
    <Container
      onPress={onPress}
      style={[styles.card, styles[variant], { padding: spacing[padding] }, style]}
      activeOpacity={onPress ? 0.7 : 1}
    >
      {children}
    </Container>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background.white,
  },
  default: {
    ...shadows.sm,
  },
  outlined: {
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  elevated: {
    ...shadows.lg,
  },
})

