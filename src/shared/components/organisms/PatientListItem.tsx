import React, { memo } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Patient } from '@/shared/types'
import { Avatar } from '../atoms/Avatar'
import { Text } from '../atoms/Text'
import { Icon } from '../atoms/Icon'
import { Badge } from '../atoms/Badge'
import { colors, spacing, borderRadius } from '@/theme'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface PatientListItemProps {
  patient: Patient
  onPress: () => void
}

const PatientListItemComponent = ({ patient, onPress }: PatientListItemProps) => {
  const { profile, lastVisit, nextAppointment, pendingPayments } = patient
  const fullName = `${profile.name} ${profile.lastName}`

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <Avatar src={profile.avatar} fallback={profile.name[0]} size="lg" />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="body" weight="semibold" numberOfLines={1} style={styles.name}>
            {fullName}
          </Text>
          {pendingPayments > 0 && (
            <Badge variant="warning" size="sm">
              ${pendingPayments}
            </Badge>
          )}
        </View>

        <View style={styles.info}>
          {nextAppointment && (
            <View style={styles.infoRow}>
              <Icon name="event" size={14} color={colors.status.success} />
              <Text variant="caption" color="secondary">
                Próxima: {format(nextAppointment, "d MMM 'a las' HH:mm", { locale: es })}
              </Text>
            </View>
          )}
          {lastVisit && !nextAppointment && (
            <View style={styles.infoRow}>
              <Icon name="schedule" size={14} color={colors.text.secondary} />
              <Text variant="caption" color="secondary">
                Última visita: {format(lastVisit, 'd MMM yyyy', { locale: es })}
              </Text>
            </View>
          )}
        </View>

        {patient.tags && patient.tags.length > 0 && (
          <View style={styles.tags}>
            {patient.tags.slice(0, 2).map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text variant="caption" weight="medium" style={styles.tagText}>
                  {tag}
                </Text>
              </View>
            ))}
          </View>
        )}
      </View>

      <Icon name="chevron-right" size={24} color={colors.text.disabled} />
    </TouchableOpacity>
  )
}

export const PatientListItem = memo(PatientListItemComponent, (prevProps, nextProps) => {
  return prevProps.patient.id === nextProps.patient.id &&
         prevProps.patient.lastVisit === nextProps.patient.lastVisit &&
         prevProps.patient.nextAppointment === nextProps.patient.nextAppointment &&
         prevProps.patient.pendingPayments === nextProps.patient.pendingPayments
})

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    gap: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  content: {
    flex: 1,
    gap: spacing.xs,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  name: {
    flex: 1,
  },
  info: {
    gap: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tags: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: 2,
  },
  tag: {
    backgroundColor: colors.primary.main + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
  },
  tagText: {
    color: colors.primary.main,
    fontSize: 11,
  },
})

