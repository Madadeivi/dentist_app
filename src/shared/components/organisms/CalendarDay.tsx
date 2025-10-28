import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Text } from '../atoms/Text'
import { colors, spacing, borderRadius } from '@/theme'
import { isSameDay, isToday } from 'date-fns'

interface CalendarDayProps {
  date: Date
  currentMonth: boolean
  isSelected: boolean
  appointmentCount?: number
  onPress: () => void
}

export const CalendarDay = ({
  date,
  currentMonth,
  isSelected,
  appointmentCount = 0,
  onPress,
}: CalendarDayProps) => {
  const today = isToday(date)
  const hasAppointments = appointmentCount > 0

  return (
    <TouchableOpacity
      style={[
        styles.container,
        !currentMonth && styles.otherMonth,
        isSelected && styles.selected,
        today && !isSelected && styles.today,
      ]}
      onPress={onPress}
      disabled={!currentMonth}
    >
      <Text
        variant="body"
        weight={today || isSelected ? 'bold' : 'regular'}
        style={[
          styles.dayText,
          !currentMonth && styles.otherMonthText,
          isSelected && styles.selectedText,
          today && !isSelected && styles.todayText,
        ]}
      >
        {date.getDate()}
      </Text>
      {hasAppointments && currentMonth && (
        <View style={[styles.indicator, isSelected && styles.indicatorSelected]}>
          <Text variant="caption" weight="bold" style={styles.indicatorText}>
            {appointmentCount}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 2,
    borderRadius: borderRadius.md,
    position: 'relative',
  },
  otherMonth: {
    opacity: 0.3,
  },
  selected: {
    backgroundColor: colors.primary.main,
  },
  today: {
    backgroundColor: colors.primary.main + '20',
  },
  dayText: {
    fontSize: 16,
  },
  otherMonthText: {
    color: colors.text.disabled,
  },
  selectedText: {
    color: '#fff',
  },
  todayText: {
    color: colors.primary.main,
  },
  indicator: {
    position: 'absolute',
    bottom: 4,
    backgroundColor: colors.primary.main,
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  indicatorSelected: {
    backgroundColor: '#fff',
  },
  indicatorText: {
    color: '#fff',
    fontSize: 10,
  },
})

