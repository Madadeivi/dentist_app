import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Card } from '../molecules/Card'
import { Text } from '../atoms/Text'
import { Icon } from '../atoms/Icon'
import { colors, spacing } from '@/theme'

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  icon: string
  color?: string
}

export const StatsCard = ({ title, value, change, icon, color = colors.primary.main }: StatsCardProps) => {
  const isPositive = change && change > 0
  const isNegative = change && change < 0
  const changeColor = isPositive ? colors.status.success : isNegative ? colors.status.error : colors.text.secondary

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
          <Icon name={icon as any} size={24} color={color} />
        </View>
        {change !== undefined && (
          <View style={styles.changeContainer}>
            <Icon
              name={isPositive ? 'arrow-upward' : isNegative ? 'arrow-downward' : 'remove'}
              size={16}
              color={changeColor}
            />
            <Text variant="caption" weight="semibold" style={{ color: changeColor }}>
              {Math.abs(change)}%
            </Text>
          </View>
        )}
      </View>
      <Text variant="h2" weight="bold" style={styles.value}>
        {value}
      </Text>
      <Text variant="caption" color="secondary">
        {title}
      </Text>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 150,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  value: {
    marginBottom: spacing.xs,
  },
})

