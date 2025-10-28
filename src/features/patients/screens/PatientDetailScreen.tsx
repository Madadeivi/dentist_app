import React from 'react'
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { PatientsStackParamList } from '@/shared/types'
import { Text } from '@/shared/components/atoms/Text'
import { Icon } from '@/shared/components/atoms/Icon'
import { Avatar } from '@/shared/components/atoms/Avatar'
import { Button } from '@/shared/components/atoms/Button'
import { Card } from '@/shared/components/molecules/Card'
import { Header } from '@/shared/components/molecules/Header'
import { mockPatients, mockPatientStats, mockMedicalHistories } from '@/mock/patients.mock'
import { colors, spacing, borderRadius } from '@/theme'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

type PatientDetailScreenProps = {
  navigation: StackNavigationProp<PatientsStackParamList, 'PatientDetail'>
  route: RouteProp<PatientsStackParamList, 'PatientDetail'>
}

export const PatientDetailScreen = ({ navigation, route }: PatientDetailScreenProps) => {
  const { patientId } = route.params
  const patient = mockPatients.find((p) => p.id === patientId)
  const stats = mockPatientStats[patientId]
  const medicalHistory = mockMedicalHistories[patientId]

  if (!patient) {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          title="Paciente"
          leftAction={{ icon: 'arrow-back', onPress: () => navigation.goBack() }}
        />
        <View style={styles.emptyState}>
          <Text variant="body" color="secondary">
            Paciente no encontrado
          </Text>
        </View>
      </SafeAreaView>
    )
  }

  const { profile } = patient
  const fullName = `${profile.name} ${profile.lastName}`
  const age = new Date().getFullYear() - profile.dateOfBirth.getFullYear()

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Perfil del Paciente"
        leftAction={{ icon: 'arrow-back', onPress: () => navigation.goBack() }}
        rightAction={{ icon: 'edit', onPress: () => console.log('Edit') }}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Avatar src={profile.avatar} fallback={profile.name[0]} size="xl" />
          <Text variant="h2" weight="bold" align="center" style={styles.name}>
            {fullName}
          </Text>
          <Text variant="body" color="secondary" align="center">
            {age} años • {profile.bloodType || 'Sin tipo de sangre'}
          </Text>
          
          <View style={styles.actions}>
            <Button variant="primary" size="md" icon={<Icon name="phone" size={20} color="#fff" />}>
              Llamar
            </Button>
            <Button
              variant="outline"
              size="md"
              icon={<Icon name="chat" size={20} color={colors.primary.main} />}
            >
              Mensaje
            </Button>
          </View>
        </View>

        {stats && (
          <View style={styles.section}>
            <Text variant="h3" weight="semibold" style={styles.sectionTitle}>
              Estadísticas
            </Text>
            <View style={styles.statsGrid}>
              <StatCard icon="event" label="Visitas" value={stats.totalVisits.toString()} />
              <StatCard icon="pending" label="Pendientes" value={stats.pendingTreatments.toString()} />
              <StatCard icon="check-circle" label="Completados" value={stats.completedTreatments.toString()} />
              <StatCard icon="attach-money" label="Gastado" value={`$${stats.totalSpent}`} />
            </View>
          </View>
        )}

        <View style={styles.section}>
          <Text variant="h3" weight="semibold" style={styles.sectionTitle}>
            Información Personal
          </Text>
          <Card>
            <InfoRow icon="email" label="Email" value={patient.email} />
            <InfoRow icon="phone" label="Teléfono" value={profile.phone} />
            <InfoRow icon="badge" label="DNI" value={profile.dni || 'No registrado'} />
            <InfoRow
              icon="cake"
              label="Fecha de Nacimiento"
              value={format(profile.dateOfBirth, 'd MMMM yyyy', { locale: es })}
            />
            {profile.address && (
              <InfoRow
                icon="location-on"
                label="Dirección"
                value={`${profile.address.street} ${profile.address.number}, ${profile.address.city}`}
              />
            )}
          </Card>
        </View>

        {medicalHistory && (
          <View style={styles.section}>
            <Text variant="h3" weight="semibold" style={styles.sectionTitle}>
              Historial Médico
            </Text>
            <Card>
              {medicalHistory.allergies.length > 0 && (
                <InfoRow
                  icon="warning"
                  label="Alergias"
                  value={medicalHistory.allergies.join(', ')}
                  iconColor={colors.status.warning}
                />
              )}
              {medicalHistory.medications.length > 0 && (
                <InfoRow
                  icon="medication"
                  label="Medicamentos"
                  value={medicalHistory.medications.join(', ')}
                />
              )}
              {medicalHistory.conditions.length > 0 && (
                <InfoRow
                  icon="local-hospital"
                  label="Condiciones"
                  value={medicalHistory.conditions.join(', ')}
                />
              )}
              <InfoRow
                icon="smoking-rooms"
                label="Fumador"
                value={medicalHistory.habits.smoking ? 'Sí' : 'No'}
              />
            </Card>
          </View>
        )}

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h3" weight="semibold">
              Próximas Citas
            </Text>
            <TouchableOpacity>
              <Text variant="caption" color="info" weight="semibold">
                Ver Todas
              </Text>
            </TouchableOpacity>
          </View>
          <Card>
            <View style={styles.emptyCard}>
              <Icon name="event-available" size={48} color={colors.text.disabled} />
              <Text variant="caption" color="secondary">
                No hay citas programadas
              </Text>
            </View>
          </Card>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text variant="h3" weight="semibold">
              Tratamientos
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Treatments', { patientId: patient.id })}
            >
              <Text variant="caption" color="info" weight="semibold">
                Ver Historial
              </Text>
            </TouchableOpacity>
          </View>
          <Card>
            <View style={styles.emptyCard}>
              <Icon name="medical-services" size={48} color={colors.text.disabled} />
              <Text variant="caption" color="secondary">
                No hay tratamientos registrados
              </Text>
            </View>
          </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

interface StatCardProps {
  icon: string
  label: string
  value: string
}

const StatCard = ({ icon, label, value }: StatCardProps) => (
  <View style={styles.statCard}>
    <Icon name={icon as any} size={24} color={colors.primary.main} />
    <Text variant="h3" weight="bold">
      {value}
    </Text>
    <Text variant="caption" color="secondary">
      {label}
    </Text>
  </View>
)

interface InfoRowProps {
  icon: string
  label: string
  value: string
  iconColor?: string
}

const InfoRow = ({ icon, label, value, iconColor = colors.text.secondary }: InfoRowProps) => (
  <View style={styles.infoRow}>
    <Icon name={icon as any} size={20} color={iconColor} />
    <View style={styles.infoContent}>
      <Text variant="caption" color="secondary">
        {label}
      </Text>
      <Text variant="body" weight="medium">
        {value}
      </Text>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  header: {
    padding: spacing.lg,
    alignItems: 'center',
    gap: spacing.sm,
  },
  name: {
    marginTop: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
    width: '100%',
  },
  section: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
    backgroundColor: colors.background.white,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.border.light,
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
  emptyCard: {
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.sm,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

