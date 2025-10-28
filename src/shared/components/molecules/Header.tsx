import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Icon } from '../atoms'
import { colors, spacing } from '@/theme'

interface HeaderAction {
  icon: keyof typeof import('@expo/vector-icons/MaterialIcons').default.glyphMap
  onPress: () => void
}

interface HeaderProps {
  title: string
  leftAction?: HeaderAction
  rightAction?: HeaderAction
  subtitle?: string
}

export const Header = ({ title, leftAction, rightAction, subtitle }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {leftAction ? (
          <TouchableOpacity onPress={leftAction.onPress} style={styles.actionButton}>
            <Icon name={leftAction.icon} size={24} color={colors.text.primary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.actionButton} />
        )}
      </View>

      <View style={styles.centerContainer}>
        <Text variant="h3" weight="bold" align="center">
          {title}
        </Text>
        {subtitle && (
          <Text variant="caption" color="secondary" align="center">
            {subtitle}
          </Text>
        )}
      </View>

      <View style={styles.rightContainer}>
        {rightAction ? (
          <TouchableOpacity onPress={rightAction.onPress} style={styles.actionButton}>
            <Icon name={rightAction.icon} size={24} color={colors.text.primary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.actionButton} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.background.light,
    justifyContent: 'space-between',
  },
  leftContainer: {
    width: 48,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightContainer: {
    width: 48,
  },
  actionButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

