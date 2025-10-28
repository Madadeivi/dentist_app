import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Appointment } from '@/shared/types'
import { Text } from '../atoms/Text'
import { Avatar } from '../atoms/Avatar'
import { Badge } from '../atoms/Badge'
import { Icon } from '../atoms/Icon'
import { colors, spacing, borderRadius } from '@/theme'

interface AppointmentTimeSlotProps {
  appointment: Appointment
  onPress: () => void
}

const statusColors: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'default'> = {
  scheduled: 'info',
  confirmed: 'success',
  'in-progress': 'warning',
  completed: 'default',
  cancelled: 'danger',
  'no-show': 'danger',
}

const statusLabels: Record<string, string> = {
  scheduled: 'Programada',
  confirmed: 'Confirmada',
  'in-progress': 'En Curso',
  completed: 'Completada',
  cancelled: 'Cancelada',
  'no-show': 'No Asistió',
}

export const AppointmentTimeSlot = ({ appointment, onPress }: AppointmentTimeSlotProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.timeColumn}>
        <Text variant="body" weight="bold">
          {appointment.startTime}
        </Text>
        <Text variant="caption" color="secondary">
          {appointment.duration}m
        </Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.patientInfo}>
            <Avatar
              src={appointment.patientAvatar}
              fallback={appointment.patientName[0]}
              size="md"
            />
            <View style={styles.patientDetails}>
              <Text variant="body" weight="semibold" numberOfLines={1}>
                {appointment.patientName}
              </Text>
              <Text variant="caption" color="secondary" numberOfLines={1}>
                {appointment.reason || 'Sin motivo especificado'}
              </Text>
            </View>
          </View>
          <Badge variant={statusColors[appointment.status]} size="sm">
            {statusLabels[appointment.status]}
          </Badge>
        </View>

        {appointment.notes && (
          <View style={styles.notes}>
            <Icon name="notes" size={14} color={colors.text.secondary} />
            <Text variant="caption" color="secondary" numberOfLines={1}>
              {appointment.notes}
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  timeColumn: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 60,
  },
  divider: {
    width: 2,
    backgroundColor: colors.border.light,
    marginHorizontal: spacing.md,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.sm,
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  patientDetails: {
    flex: 1,
  },
  notes: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
})

