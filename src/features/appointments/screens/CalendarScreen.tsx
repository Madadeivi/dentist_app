import React, { useState, useMemo } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { MainTabParamList } from '@/shared/types'
import { Text } from '@/shared/components/atoms/Text'
import { Icon } from '@/shared/components/atoms/Icon'
import { FloatingActionButton } from '@/shared/components/molecules/FloatingActionButton'
import { CalendarHeader, CalendarDay, AppointmentTimeSlot } from '@/shared/components/organisms'
import { mockAppointments } from '@/mock/appointments.mock'
import { colors, spacing } from '@/theme'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  format,
} from 'date-fns'
import { es } from 'date-fns/locale'

type CalendarScreenProps = {
  navigation: BottomTabNavigationProp<MainTabParamList, 'Calendar'>
}

type FilterType = 'all' | 'scheduled' | 'confirmed' | 'completed'

export const CalendarScreen = ({ navigation }: CalendarScreenProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [filter, setFilter] = useState<FilterType>('all')

  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(currentMonth)
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 })
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 })

    const days = []
    let day = startDate

    while (day <= endDate) {
      days.push(day)
      day = addDays(day, 1)
    }

    return days
  }, [currentMonth])

  const appointmentsForDate = useMemo(() => {
    return mockAppointments.filter((apt) => {
      const matchesDate = isSameDay(apt.date, selectedDate)
      const matchesFilter = filter === 'all' || apt.status === filter
      return matchesDate && matchesFilter
    })
  }, [selectedDate, filter])

  const getAppointmentCount = (date: Date) => {
    return mockAppointments.filter((apt) => isSameDay(apt.date, date)).length
  }

  const handlePreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1))
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1))
  const handleToday = () => {
    setCurrentMonth(new Date())
    setSelectedDate(new Date())
  }

  const filterCounts = {
    all: mockAppointments.filter((apt) => isSameDay(apt.date, selectedDate)).length,
    scheduled: mockAppointments.filter(
      (apt) => isSameDay(apt.date, selectedDate) && apt.status === 'scheduled'
    ).length,
    confirmed: mockAppointments.filter(
      (apt) => isSameDay(apt.date, selectedDate) && apt.status === 'confirmed'
    ).length,
    completed: mockAppointments.filter(
      (apt) => isSameDay(apt.date, selectedDate) && apt.status === 'completed'
    ).length,
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" weight="bold">
          Calendario
        </Text>
        <TouchableOpacity onPress={handleToday}>
          <Icon name="today" size={24} color={colors.primary.main} />
        </TouchableOpacity>
      </View>

      <CalendarHeader
        currentDate={currentMonth}
        onPreviousMonth={handlePreviousMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />

      <View style={styles.calendar}>
        {calendarDays.map((day, index) => (
          <CalendarDay
            key={index}
            date={day}
            currentMonth={isSameMonth(day, currentMonth)}
            isSelected={isSameDay(day, selectedDate)}
            appointmentCount={getAppointmentCount(day)}
            onPress={() => setSelectedDate(day)}
          />
        ))}
      </View>

      <View style={styles.appointmentsSection}>
        <View style={styles.appointmentsHeader}>
          <Text variant="h3" weight="semibold">
            {format(selectedDate, "d 'de' MMMM", { locale: es })}
          </Text>
          <Text variant="caption" color="secondary">
            {appointmentsForDate.length} cita{appointmentsForDate.length !== 1 ? 's' : ''}
          </Text>
        </View>

        <View style={styles.filters}>
          <FilterChip
            label="Todas"
            count={filterCounts.all}
            isActive={filter === 'all'}
            onPress={() => setFilter('all')}
          />
          <FilterChip
            label="Programadas"
            count={filterCounts.scheduled}
            isActive={filter === 'scheduled'}
            onPress={() => setFilter('scheduled')}
          />
          <FilterChip
            label="Confirmadas"
            count={filterCounts.confirmed}
            isActive={filter === 'confirmed'}
            onPress={() => setFilter('confirmed')}
          />
          <FilterChip
            label="Completadas"
            count={filterCounts.completed}
            isActive={filter === 'completed'}
            onPress={() => setFilter('completed')}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.appointmentsList}>
          {appointmentsForDate.length > 0 ? (
            appointmentsForDate.map((appointment) => (
              <AppointmentTimeSlot
                key={appointment.id}
                appointment={appointment}
                onPress={() => console.log('Ver cita', appointment.id)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="event-available" size={48} color={colors.text.disabled} />
              <Text variant="body" color="secondary" align="center">
                No hay citas para esta fecha
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

      <FloatingActionButton
        iconName="add"
        onPress={() => console.log('Nueva cita')}
        style={styles.fab}
      />
    </SafeAreaView>
  )
}

interface FilterChipProps {
  label: string
  count: number
  isActive: boolean
  onPress: () => void
}

const FilterChip = ({ label, count, isActive, onPress }: FilterChipProps) => (
  <TouchableOpacity
    style={[styles.filterChip, isActive && styles.filterChipActive]}
    onPress={onPress}
  >
    <Text
      variant="caption"
      weight="semibold"
      style={[styles.filterChipText, isActive && styles.filterChipTextActive]}
    >
      {label} ({count})
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.sm,
    backgroundColor: colors.background.white,
    paddingBottom: spacing.md,
  },
  appointmentsSection: {
    flex: 1,
    paddingTop: spacing.md,
  },
  appointmentsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  filterChipActive: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  filterChipText: {
    color: colors.text.secondary,
    fontSize: 12,
  },
  filterChipTextActive: {
    color: '#fff',
  },
  appointmentsList: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['2xl'],
    gap: spacing.md,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
  },
})

