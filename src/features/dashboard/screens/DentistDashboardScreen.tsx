import React from 'react'
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { MainTabParamList } from '@/shared/types'
import { Text } from '@/shared/components/atoms/Text'
import { Icon } from '@/shared/components/atoms/Icon'
import { Avatar } from '@/shared/components/atoms/Avatar'
import { StatsCard, AppointmentCard, QuickActionsGrid } from '@/shared/components/organisms'
import { useAuthStore } from '@/store'
import { mockDashboardStats, mockQuickActions } from '@/mock/dashboard.mock'
import { mockAppointments } from '@/mock/appointments.mock'
import { colors, spacing } from '@/theme'

type DentistDashboardScreenProps = {
  navigation: BottomTabNavigationProp<MainTabParamList, 'Dashboard'>
}

export const DentistDashboardScreen = ({ navigation }: DentistDashboardScreenProps) => {
  const { user } = useAuthStore()
  
  const todayAppointments = mockAppointments.filter((apt) => {
    const today = new Date()
    return (
      apt.date.toDateString() === today.toDateString() &&
      (apt.status === 'scheduled' || apt.status === 'confirmed')
    )
  })

  const userName = user?.type === 'dentist' ? `Dr. ${user.profile.name} ${user.profile.lastName}` : 'Usuario'

  const handleActionPress = (action: any) => {
    if (action.route === 'Calendar') {
      navigation.navigate('Calendar')
    } else if (action.route === 'Messages') {
      navigation.navigate('Messages')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Avatar
              src={user?.profile.avatar}
              fallback={user?.profile.name[0]}
              size="lg"
            />
            <View style={styles.greeting}>
              <Text variant="caption" color="secondary">
                Bienvenido de nuevo
              </Text>
              <Text variant="h3" weight="bold">
                {userName}
              </Text>
            </View>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Icon name="notifications" size={24} color={colors.text.primary} />
            <View style={styles.badge} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text variant="h3" weight="semibold" style={styles.sectionTitle}>
            Estadísticas de Hoy
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsContainer}>
            <StatsCard
              title="Pacientes Totales"
              value={mockDashboardStats.totalPatients}
              change={mockDashboardStats.patientsChange}
              icon="group"
              color={colors.primary.main}
            />
            <StatsCard
              title="Citas Hoy"
              value={mockDashboardStats.todayAppointments}
              change={mockDashboardStats.appointmentsChange}
              icon="event"
              color={colors.status.info}
            />
            <StatsCard
              title="Tratamientos"
              value={mockDashboardStats.pendingTreatments}
              change={mockDashboardStats.treatmentsChange}
              icon="medical-services"
              color={colors.status.success}
            />
            <StatsCard
              title="Ingresos Mes"
              value={`$${(mockDashboardStats.monthRevenue / 1000).toFixed(1)}k`}
              change={mockDashboardStats.revenueChange}
              icon="attach-money"
              color={colors.status.warning}
            />
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text variant="h3" weight="semibold" style={styles.sectionTitle}>
            Acciones Rápidas
          </Text>
          <QuickActionsGrid actions={mockQuickActions} onActionPress={handleActionPress} />
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h3" weight="semibold">
              Citas de Hoy
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Calendar')}>
              <Text variant="caption" color="info" weight="semibold">
                Ver Todas
              </Text>
            </TouchableOpacity>
          </View>
          {todayAppointments.length > 0 ? (
            todayAppointments.map((appointment) => (
              <AppointmentCard key={appointment.id} appointment={appointment} />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="event-available" size={48} color={colors.text.disabled} />
              <Text variant="body" color="secondary" align="center">
                No tienes citas programadas para hoy
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  greeting: {
    flex: 1,
  },
  notificationButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background.white,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.status.error,
    borderWidth: 2,
    borderColor: colors.background.light,
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing['2xl'],
    backgroundColor: colors.background.white,
    borderRadius: 12,
    gap: spacing.md,
  },
})

