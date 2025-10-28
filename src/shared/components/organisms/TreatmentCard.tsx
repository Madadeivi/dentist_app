import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Treatment } from '@/shared/types'
import { Text } from '../atoms/Text'
import { Icon } from '../atoms/Icon'
import { Badge } from '../atoms/Badge'
import { colors, spacing, borderRadius } from '@/theme'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface TreatmentCardProps {
  treatment: Treatment
  onPress: () => void
}

const treatmentTypeLabels: Record<string, string> = {
  cleaning: 'Limpieza',
  filling: 'Empaste',
  'root-canal': 'Endodoncia',
  extraction: 'Extracción',
  implant: 'Implante',
  crown: 'Corona',
  orthodontics: 'Ortodoncia',
  whitening: 'Blanqueamiento',
  other: 'Otro',
}

const statusColors: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'default'> = {
  planned: 'info',
  'in-progress': 'warning',
  completed: 'success',
  cancelled: 'danger',
}

const statusLabels: Record<string, string> = {
  planned: 'Planificado',
  'in-progress': 'En Progreso',
  completed: 'Completado',
  cancelled: 'Cancelado',
}

const treatmentIcons: Record<string, string> = {
  cleaning: 'cleaning-services',
  filling: 'format-paint',
  'root-canal': 'medical-services',
  extraction: 'content-cut',
  implant: 'health-and-safety',
  crown: 'stars',
  orthodontics: 'straighten',
  whitening: 'auto-awesome',
  other: 'build',
}

export const TreatmentCard = ({ treatment, onPress }: TreatmentCardProps) => {
  const progress = (treatment.completedSessions / treatment.estimatedSessions) * 100
  const pendingPayment = treatment.cost - treatment.paid

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primary.main + '20' }]}>
            <Icon name={treatmentIcons[treatment.type] as any} size={24} color={colors.primary.main} />
          </View>
          <View style={styles.headerInfo}>
            <Text variant="body" weight="semibold" numberOfLines={1}>
              {treatment.title}
            </Text>
            <Text variant="caption" color="secondary">
              {treatmentTypeLabels[treatment.type]}
            </Text>
          </View>
        </View>
        <Badge variant={statusColors[treatment.status]} size="sm">
          {statusLabels[treatment.status]}
        </Badge>
      </View>

      {treatment.status !== 'completed' && treatment.status !== 'cancelled' && (
        <View style={styles.progress}>
          <View style={styles.progressHeader}>
            <Text variant="caption" color="secondary">
              Progreso
            </Text>
            <Text variant="caption" weight="semibold">
              {treatment.completedSessions}/{treatment.estimatedSessions} sesiones
            </Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>
      )}

      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Icon name="event" size={16} color={colors.text.secondary} />
          <Text variant="caption" color="secondary">
            {format(treatment.startDate, 'd MMM yyyy', { locale: es })}
          </Text>
        </View>
        <View style={styles.footerItem}>
          <Icon name="attach-money" size={16} color={colors.text.secondary} />
          <Text variant="caption" color="secondary">
            ${treatment.paid} / ${treatment.cost}
          </Text>
        </View>
        {pendingPayment > 0 && (
          <Badge variant="warning" size="sm">
            Pend: ${pendingPayment}
          </Badge>
        )}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border.light,
    gap: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerInfo: {
    flex: 1,
  },
  progress: {
    gap: spacing.xs,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: colors.neutral[200],
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.main,
    borderRadius: 3,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
})

