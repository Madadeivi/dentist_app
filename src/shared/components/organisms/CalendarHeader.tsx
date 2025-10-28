import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from '../atoms/Text'
import { Icon } from '../atoms/Icon'
import { colors, spacing } from '@/theme'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface CalendarHeaderProps {
  currentDate: Date
  onPreviousMonth: () => void
  onNextMonth: () => void
  onToday: () => void
}

export const CalendarHeader = ({
  currentDate,
  onPreviousMonth,
  onNextMonth,
  onToday,
}: CalendarHeaderProps) => {
  const monthYear = format(currentDate, 'MMMM yyyy', { locale: es })

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={onPreviousMonth} style={styles.navButton}>
          <Icon name="chevron-left" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={onToday}>
          <Text variant="h3" weight="bold" style={styles.monthText}>
            {monthYear.charAt(0).toUpperCase() + monthYear.slice(1)}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onNextMonth} style={styles.navButton}>
          <Icon name="chevron-right" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      <View style={styles.weekDays}>
        {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day, index) => (
          <View key={index} style={styles.weekDay}>
            <Text variant="caption" weight="semibold" color="secondary">
              {day}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.white,
    paddingVertical: spacing.md,
  },
  navigation: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  navButton: {
    padding: spacing.xs,
  },
  monthText: {
    minWidth: 200,
    textAlign: 'center',
  },
  weekDays: {
    flexDirection: 'row',
    paddingHorizontal: spacing.sm,
  },
  weekDay: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
})

