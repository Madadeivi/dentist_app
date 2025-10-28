import React from 'react'
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/shared/types'
import { Text } from '@/shared/components/atoms/Text'
import { Icon } from '@/shared/components/atoms/Icon'
import { Avatar } from '@/shared/components/atoms/Avatar'
import { Card } from '@/shared/components/molecules/Card'
import { useAuthStore } from '@/store'
import { useThemeColors, spacing, borderRadius } from '@/theme'
import { mockAppointments } from '@/mock/appointments.mock'
import { mockTreatments } from '@/mock/treatments.mock'

type PatientDashboardScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Main'>
}

export const PatientDashboardScreen = ({ navigation }: PatientDashboardScreenProps) => {
  const { user } = useAuthStore()
  const colors = useThemeColors()

  const nextAppointment = mockAppointments
    .filter((apt) => new Date(apt.date) > new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())[0]

  const activeTreatments = mockTreatments.filter((t) => t.status === 'in_progress')

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={[styles.header, { backgroundColor: colors.background.secondary }]}>
        <View style={styles.headerContent}>
          <View>
            <Text variant="caption" style={{ color: colors.text.secondary }}>
              Bienvenido de nuevo
            </Text>
            <Text variant="h2" weight="bold" style={{ color: colors.text.primary }}>
              {user?.profile.name}
            </Text>
          </View>
          <Avatar src={user?.profile.avatar} fallback={user?.profile.name[0]} size="lg" />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.content}>
          {nextAppointment && (
            <Card style={[styles.appointmentCard, { backgroundColor: colors.primary.main }]}>
              <View style={styles.appointmentHeader}>
                <Icon name="calendar-today" size={24} color={colors.text.inverse} />
                <Text variant="body" weight="semibold" style={{ color: colors.text.inverse }}>
                  Próxima Cita
                </Text>
              </View>
              <Text variant="h3" weight="bold" style={[styles.appointmentTime, { color: colors.text.inverse }]}>
                {new Date(nextAppointment.date).toLocaleDateString('es-ES', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                })}
              </Text>
              <View style={styles.appointmentDetails}>
                <View style={styles.detailItem}>
                  <Icon name="schedule" size={18} color={colors.text.inverse} />
                  <Text variant="body" style={{ color: colors.text.inverse }}>
                    {nextAppointment.time}
                  </Text>
                </View>
                <View style={styles.detailItem}>
                  <Icon name="local-hospital" size={18} color={colors.text.inverse} />
                  <Text variant="body" style={{ color: colors.text.inverse }}>
                    {nextAppointment.type}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={[styles.viewButton, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}
                onPress={() => console.log('Ver detalles')}
              >
                <Text variant="body" weight="semibold" style={{ color: colors.text.inverse }}>
                  Ver Detalles
                </Text>
                <Icon name="arrow-forward" size={20} color={colors.text.inverse} />
              </TouchableOpacity>
            </Card>
          )}

          <View style={styles.section}>
            <Text variant="h3" weight="bold" style={{ color: colors.text.primary }}>
              Acciones Rápidas
            </Text>
            <View style={styles.quickActions}>
              <QuickActionCard
                icon="calendar-month"
                label="Nueva Cita"
                colors={colors}
                onPress={() => console.log('Nueva cita')}
              />
              <QuickActionCard
                icon="chat"
                label="Mensajes"
                colors={colors}
                onPress={() => navigation.navigate('Main')}
              />
              <QuickActionCard
                icon="description"
                label="Historial"
                colors={colors}
                onPress={() => console.log('Historial')}
              />
              <QuickActionCard
                icon="library-books"
                label="Recursos"
                colors={colors}
                onPress={() => navigation.navigate('Resources')}
              />
            </View>
          </View>

          {activeTreatments.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text variant="h3" weight="bold" style={{ color: colors.text.primary }}>
                  Tratamientos Activos
                </Text>
                <TouchableOpacity onPress={() => console.log('Ver todos')}>
                  <Text variant="caption" style={{ color: colors.primary.main }}>
                    Ver todos
                  </Text>
                </TouchableOpacity>
              </View>
              {activeTreatments.slice(0, 2).map((treatment) => (
                <Card
                  key={treatment.id}
                  style={[styles.treatmentCard, { backgroundColor: colors.background.card }]}
                >
                  <View style={styles.treatmentHeader}>
                    <View style={styles.treatmentIcon}>
                      <Icon name="medical-services" size={20} color={colors.primary.main} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text variant="body" weight="semibold" style={{ color: colors.text.primary }}>
                        {treatment.diagnosis}
                      </Text>
                      <Text variant="caption" style={{ color: colors.text.secondary }}>
                        {treatment.tooth}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        {
                          width: `${(treatment.completedSessions / treatment.totalSessions) * 100}%`,
                          backgroundColor: colors.status.success,
                        },
                      ]}
                    />
                  </View>
                  <Text variant="caption" style={{ color: colors.text.secondary }}>
                    {treatment.completedSessions} de {treatment.totalSessions} sesiones completadas
                  </Text>
                </Card>
              ))}
            </View>
          )}

          <View style={styles.section}>
            <Text variant="h3" weight="bold" style={{ color: colors.text.primary }}>
              Salud Dental
            </Text>
            <View style={styles.healthTips}>
              <Card style={[styles.tipCard, { backgroundColor: colors.background.card }]}>
                <Icon name="lightbulb" size={32} color={colors.status.warning} />
                <Text variant="body" weight="semibold" style={[styles.tipTitle, { color: colors.text.primary }]}>
                  Consejo del Día
                </Text>
                <Text variant="caption" align="center" style={{ color: colors.text.secondary }}>
                  Cepíllate los dientes al menos dos veces al día durante dos minutos
                </Text>
              </Card>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

interface QuickActionCardProps {
  icon: string
  label: string
  colors: any
  onPress: () => void
}

const QuickActionCard = ({ icon, label, colors, onPress }: QuickActionCardProps) => (
  <TouchableOpacity
    style={[styles.actionCard, { backgroundColor: colors.background.card }]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={[styles.actionIcon, { backgroundColor: colors.primary.main + '15' }]}>
      <Icon name={icon as any} size={28} color={colors.primary.main} />
    </View>
    <Text variant="caption" weight="semibold" align="center" style={{ color: colors.text.primary }}>
      {label}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.xl,
  },
  appointmentCard: {
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
  },
  appointmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  appointmentTime: {
    marginBottom: spacing.md,
    textTransform: 'capitalize',
  },
  appointmentDetails: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginBottom: spacing.md,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  viewButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.xs,
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  actionCard: {
    width: '47%',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    gap: spacing.sm,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  treatmentCard: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  treatmentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  treatmentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(19, 138, 236, 0.1)',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  healthTips: {
    gap: spacing.md,
  },
  tipCard: {
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  tipTitle: {
    marginTop: spacing.xs,
  },
})

