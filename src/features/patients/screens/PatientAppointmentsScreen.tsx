import React, { useState } from 'react'
import { View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/shared/types'
import { Text } from '@/shared/components/atoms/Text'
import { Icon } from '@/shared/components/atoms/Icon'
import { Button } from '@/shared/components/atoms/Button'
import { Card } from '@/shared/components/molecules/Card'
import { FloatingActionButton } from '@/shared/components/molecules/FloatingActionButton'
import { useThemeColors, spacing, borderRadius } from '@/theme'
import { mockAppointments } from '@/mock/appointments.mock'

type PatientAppointmentsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList>
}

type TabType = 'upcoming' | 'past'

export const PatientAppointmentsScreen = ({ navigation }: PatientAppointmentsScreenProps) => {
  const colors = useThemeColors()
  const [activeTab, setActiveTab] = useState<TabType>('upcoming')

  const now = new Date()
  const upcomingAppointments = mockAppointments
    .filter((apt) => new Date(apt.date) > now)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const pastAppointments = mockAppointments
    .filter((apt) => new Date(apt.date) <= now)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const appointments = activeTab === 'upcoming' ? upcomingAppointments : pastAppointments

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return colors.status.success
      case 'pending':
        return colors.status.warning
      case 'cancelled':
        return colors.status.error
      case 'completed':
        return colors.text.secondary
      default:
        return colors.text.disabled
    }
  }

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      confirmed: 'Confirmada',
      pending: 'Pendiente',
      cancelled: 'Cancelada',
      completed: 'Completada',
    }
    return labels[status] || status
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={[styles.header, { backgroundColor: colors.background.secondary }]}>
        <Text variant="h2" weight="bold" style={{ color: colors.text.primary }}>
          Mis Citas
        </Text>
      </View>

      <View style={[styles.tabs, { backgroundColor: colors.background.secondary }]}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'upcoming' && { borderBottomColor: colors.primary.main, borderBottomWidth: 2 },
          ]}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text
            variant="body"
            weight={activeTab === 'upcoming' ? 'semibold' : 'regular'}
            style={{ color: activeTab === 'upcoming' ? colors.primary.main : colors.text.secondary }}
          >
            Próximas ({upcomingAppointments.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'past' && { borderBottomColor: colors.primary.main, borderBottomWidth: 2 },
          ]}
          onPress={() => setActiveTab('past')}
        >
          <Text
            variant="body"
            weight={activeTab === 'past' ? 'semibold' : 'regular'}
            style={{ color: activeTab === 'past' ? colors.primary.main : colors.text.secondary }}
          >
            Pasadas ({pastAppointments.length})
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Card style={[styles.appointmentCard, { backgroundColor: colors.background.card }]}>
            <View style={styles.cardHeader}>
              <View style={styles.dateBox}>
                <Text variant="h3" weight="bold" style={{ color: colors.primary.main }}>
                  {new Date(item.date).getDate()}
                </Text>
                <Text variant="caption" style={{ color: colors.text.secondary }}>
                  {new Date(item.date).toLocaleDateString('es-ES', { month: 'short' }).toUpperCase()}
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text variant="body" weight="semibold" style={{ color: colors.text.primary }}>
                  {item.type}
                </Text>
                <View style={styles.timeRow}>
                  <Icon name="schedule" size={16} color={colors.text.secondary} />
                  <Text variant="caption" style={{ color: colors.text.secondary }}>
                    {item.time}
                  </Text>
                </View>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
                <Text variant="caption" weight="semibold" style={{ color: getStatusColor(item.status) }}>
                  {getStatusLabel(item.status)}
                </Text>
              </View>
            </View>

            {item.notes && (
              <View style={[styles.notes, { backgroundColor: colors.background.elevated }]}>
                <Icon name="info-outline" size={16} color={colors.text.secondary} />
                <Text variant="caption" style={{ color: colors.text.secondary, flex: 1 }}>
                  {item.notes}
                </Text>
              </View>
            )}

            {activeTab === 'upcoming' && item.status !== 'cancelled' && (
              <View style={styles.actions}>
                <Button
                  variant="outline"
                  size="sm"
                  onPress={() => console.log('Reprogramar')}
                  style={{ flex: 1 }}
                >
                  Reprogramar
                </Button>
                <Button variant="ghost" size="sm" onPress={() => console.log('Cancelar')} style={{ flex: 1 }}>
                  Cancelar
                </Button>
              </View>
            )}
          </Card>
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="event-busy" size={64} color={colors.text.disabled} />
            <Text variant="h3" style={{ color: colors.text.secondary }}>
              No hay citas {activeTab === 'upcoming' ? 'próximas' : 'pasadas'}
            </Text>
            <Text variant="body" align="center" style={{ color: colors.text.tertiary }}>
              {activeTab === 'upcoming'
                ? 'Solicita una nueva cita con tu dentista'
                : 'Tu historial de citas aparecerá aquí'}
            </Text>
          </View>
        }
      />

      <FloatingActionButton
        icon="add"
        onPress={() => console.log('Nueva cita')}
        label="Nueva Cita"
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  list: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  appointmentCard: {
    padding: spacing.md,
    gap: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  dateBox: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(19, 138, 236, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  notes: {
    flexDirection: 'row',
    gap: spacing.sm,
    padding: spacing.sm,
    borderRadius: borderRadius.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing['4xl'],
    gap: spacing.md,
  },
})

