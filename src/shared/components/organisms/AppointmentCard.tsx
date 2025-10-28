import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Card } from '../molecules/Card'
import { Text } from '../atoms/Text'
import { Avatar } from '../atoms/Avatar'
import { Badge } from '../atoms/Badge'
import { Icon } from '../atoms/Icon'
import { Appointment } from '@/shared/types'
import { colors, spacing, borderRadius } from '@/theme'

interface AppointmentCardProps {
  appointment: Appointment
  onPress?: () => void
}

const statusLabels: Record<string, string> = {
  scheduled: 'Programada',
  confirmed: 'Confirmada',
  'in-progress': 'En Curso',
  completed: 'Completada',
  cancelled: 'Cancelada',
  'no-show': 'No Asistió',
}

const statusColors: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'default'> = {
  scheduled: 'info',
  confirmed: 'success',
  'in-progress': 'warning',
  completed: 'default',
  cancelled: 'danger',
  'no-show': 'danger',
}

const typeLabels: Record<string, string> = {
  checkup: 'Revisión',
  cleaning: 'Limpieza',
  filling: 'Empaste',
  'root-canal': 'Endodoncia',
  extraction: 'Extracción',
  orthodontics: 'Ortodoncia',
  emergency: 'Emergencia',
  consultation: 'Consulta',
  other: 'Otro',
}

export const AppointmentCard = ({ appointment, onPress }: AppointmentCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Card style={styles.card}>
        <View style={styles.header}>
          <View style={styles.patientInfo}>
            <Avatar src={appointment.patientAvatar} fallback={appointment.patientName[0]} size="md" />
            <View style={styles.patientDetails}>
              <Text variant="body" weight="semibold">
                {appointment.patientName}
              </Text>
              <Text variant="caption" color="secondary">
                {typeLabels[appointment.type]}
              </Text>
            </View>
          </View>
          <Badge variant={statusColors[appointment.status]}>{statusLabels[appointment.status]}</Badge>
        </View>

        <View style={styles.divider} />

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Icon name="schedule" size={16} color={colors.text.secondary} />
            <Text variant="caption" color="secondary">
              {appointment.startTime} - {appointment.endTime}
            </Text>
          </View>
          {appointment.reason && (
            <View style={styles.detailRow}>
              <Icon name="description" size={16} color={colors.text.secondary} />
              <Text variant="caption" color="secondary" numberOfLines={1}>
                {appointment.reason}
              </Text>
            </View>
          )}
        </View>
      </Card>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  patientDetails: {
    flex: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border.light,
    marginVertical: spacing.sm,
  },
  details: {
    gap: spacing.xs,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
})

