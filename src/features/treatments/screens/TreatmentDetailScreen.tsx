import React from 'react'
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { PatientsStackParamList } from '@/shared/types'
import { Text } from '@/shared/components/atoms/Text'
import { Icon } from '@/shared/components/atoms/Icon'
import { Badge } from '@/shared/components/atoms/Badge'
import { Button } from '@/shared/components/atoms/Button'
import { Card } from '@/shared/components/molecules/Card'
import { Header } from '@/shared/components/molecules/Header'
import { mockTreatments, mockTreatmentSessions } from '@/mock/treatments.mock'
import { colors, spacing, borderRadius } from '@/theme'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

type TreatmentDetailScreenProps = {
  navigation: StackNavigationProp<PatientsStackParamList, 'TreatmentDetail'>
  route: RouteProp<PatientsStackParamList, 'TreatmentDetail'>
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

export const TreatmentDetailScreen = ({ navigation, route }: TreatmentDetailScreenProps) => {
  const { treatmentId } = route.params
  const treatment = mockTreatments.find((t) => t.id === treatmentId)
  const sessions = mockTreatmentSessions.filter((s) => s.treatmentId === treatmentId)

  if (!treatment) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Tratamiento"
          leftAction={{ icon: 'arrow-back', onPress: () => navigation.goBack() }}
        />
        <View style={styles.emptyState}>
          <Text variant="body" color="secondary">
            Tratamiento no encontrado
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  const progress = (treatment.completedSessions / treatment.estimatedSessions) * 100
  const pendingPayment = treatment.cost - treatment.paid

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={treatment.title}
        leftAction={{ icon: 'arrow-back', onPress: () => navigation.goBack() }}
        rightAction={{ icon: 'edit', onPress: () => console.log('Editar') }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Card>
            <View style={styles.statusRow}>
              <Text variant="h3" weight="semibold">
                Estado del Tratamiento
              </Text>
              <Badge variant={statusColors[treatment.status]}>
                {statusLabels[treatment.status]}
              </Badge>
            </View>

            {treatment.status !== 'completed' && treatment.status !== 'cancelled' && (
              <View style={styles.progressSection}>
                <View style={styles.progressHeader}>
                  <Text variant="body" color="secondary">
                    Progreso
                  </Text>
                  <Text variant="body" weight="bold">
                    {treatment.completedSessions}/{treatment.estimatedSessions} sesiones
                  </Text>
                </View>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
              </View>
            )}
          </Card>

          <Card>
            <Text variant="h3" weight="semibold" style={styles.sectionTitle}>
              Información General
            </Text>
            <InfoRow icon="description" label="Descripción" value={treatment.description} />
            <InfoRow icon="medical-information" label="Diagnóstico" value={treatment.diagnosis} />
            <InfoRow
              icon="event"
              label="Fecha de inicio"
              value={format(treatment.startDate, "d 'de' MMMM yyyy", { locale: es })}
            />
            {treatment.endDate && (
              <InfoRow
                icon="event-available"
                label="Fecha de finalización"
                value={format(treatment.endDate, "d 'de' MMMM yyyy", { locale: es })}
              />
            )}
            {treatment.teethAffected && treatment.teethAffected.length > 0 && (
              <InfoRow
                icon="dental-services"
                label="Dientes afectados"
                value={treatment.teethAffected.join(', ')}
              />
            )}
          </Card>

          {treatment.notes && (
            <Card>
              <Text variant="h3" weight="semibold" style={styles.sectionTitle}>
                Notas
              </Text>
              <Text variant="body" color="secondary">
                {treatment.notes}
              </Text>
            </Card>
          )}

          <Card>
            <Text variant="h3" weight="semibold" style={styles.sectionTitle}>
              Información Financiera
            </Text>
            <View style={styles.financeRow}>
              <View style={styles.financeItem}>
                <Text variant="caption" color="secondary">
                  Costo total
                </Text>
                <Text variant="h3" weight="bold">
                  ${treatment.cost}
                </Text>
              </View>
              <View style={styles.financeItem}>
                <Text variant="caption" color="secondary">
                  Pagado
                </Text>
                <Text variant="h3" weight="bold" style={{ color: colors.status.success }}>
                  ${treatment.paid}
                </Text>
              </View>
              <View style={styles.financeItem}>
                <Text variant="caption" color="secondary">
                  Pendiente
                </Text>
                <Text
                  variant="h3"
                  weight="bold"
                  style={{ color: pendingPayment > 0 ? colors.status.warning : colors.status.success }}
                >
                  ${pendingPayment}
                </Text>
              </View>
            </View>
          </Card>

          {treatment.prescriptions && treatment.prescriptions.length > 0 && (
            <Card>
              <Text variant="h3" weight="semibold" style={styles.sectionTitle}>
                Prescripciones
              </Text>
              {treatment.prescriptions.map((prescription, index) => (
                <View key={prescription.id} style={[styles.prescriptionItem, index > 0 && styles.prescriptionItemBorder]}>
                  <View style={styles.prescriptionHeader}>
                    <Icon name="medication" size={20} color={colors.primary.main} />
                    <Text variant="body" weight="semibold">
                      {prescription.medication}
                    </Text>
                  </View>
                  <View style={styles.prescriptionDetails}>
                    <Text variant="caption" color="secondary">
                      Dosis: {prescription.dosage} | {prescription.frequency}
                    </Text>
                    <Text variant="caption" color="secondary">
                      Duración: {prescription.duration}
                    </Text>
                    {prescription.instructions && (
                      <Text variant="caption" color="secondary">
                        {prescription.instructions}
                      </Text>
                    )}
                  </View>
                </View>
              ))}
            </Card>
          )}

          {sessions.length > 0 && (
            <Card>
              <Text variant="h3" weight="semibold" style={styles.sectionTitle}>
                Historial de Sesiones
              </Text>
              {sessions.map((session, index) => (
                <View key={session.id} style={[styles.sessionItem, index > 0 && styles.sessionItemBorder]}>
                  <View style={styles.sessionHeader}>
                    <Text variant="body" weight="semibold">
                      Sesión {index + 1}
                    </Text>
                    <Text variant="caption" color="secondary">
                      {format(session.date, 'd MMM yyyy', { locale: es })}
                    </Text>
                  </View>
                  <Text variant="caption" color="secondary" style={styles.sessionNotes}>
                    {session.notes}
                  </Text>
                  {session.procedures.length > 0 && (
                    <View style={styles.procedures}>
                      {session.procedures.map((proc, i) => (
                        <View key={i} style={styles.procedureTag}>
                          <Text variant="caption" style={styles.procedureText}>
                            {proc}
                          </Text>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </Card>
          )}

          {treatment.status === 'in-progress' && (
            <View style={styles.actions}>
              <Button
                variant="outline"
                onPress={() => console.log('Agregar sesión')}
                icon={<Icon name="add" size={20} color={colors.primary.main} />}
              >
                Agregar Sesión
              </Button>
              <Button
                onPress={() => console.log('Completar tratamiento')}
                icon={<Icon name="check-circle" size={20} color="#fff" />}
              >
                Completar
              </Button>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

interface InfoRowProps {
  icon: string
  label: string
  value: string
}

const InfoRow = ({ icon, label, value }: InfoRowProps) => (
  <View style={styles.infoRow}>
    <Icon name={icon as any} size={20} color={colors.text.secondary} />
    <View style={styles.infoContent}>
      <Text variant="caption" color="secondary">
        {label}
      </Text>
      <Text variant="body">{value}</Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  progressSection: {
    gap: spacing.sm,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.neutral[200],
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary.main,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  infoContent: {
    flex: 1,
    gap: 2,
  },
  financeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  financeItem: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.background.light,
    borderRadius: borderRadius.md,
  },
  prescriptionItem: {
    gap: spacing.sm,
  },
  prescriptionItemBorder: {
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  prescriptionDetails: {
    paddingLeft: spacing.lg,
    gap: 4,
  },
  sessionItem: {
    gap: spacing.xs,
  },
  sessionItemBorder: {
    paddingTop: spacing.md,
    marginTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  sessionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sessionNotes: {
    marginTop: spacing.xs,
  },
  procedures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  procedureTag: {
    backgroundColor: colors.primary.main + '15',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
  },
  procedureText: {
    color: colors.primary.main,
    fontSize: 11,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

