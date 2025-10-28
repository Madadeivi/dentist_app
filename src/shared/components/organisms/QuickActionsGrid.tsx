import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '../atoms/Text'
import { Icon } from '../atoms/Icon'
import { QuickAction } from '@/shared/types'
import { colors, spacing, borderRadius } from '@/theme'

interface QuickActionsGridProps {
  actions: QuickAction[]
  onActionPress: (action: QuickAction) => void
}

export const QuickActionsGrid = ({ actions, onActionPress }: QuickActionsGridProps) => {
  return (
    <View style={styles.grid}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.id}
          style={styles.actionButton}
          onPress={() => onActionPress(action)}
          activeOpacity={0.7}
        >
          <View style={[styles.iconContainer, { backgroundColor: action.color + '20' }]}>
            <Icon name={action.icon as any} size={28} color={action.color} />
          </View>
          <Text variant="caption" weight="medium" align="center" numberOfLines={2}>
            {action.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  actionButton: {
    flex: 1,
    minWidth: '45%',
    maxWidth: '48%',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

