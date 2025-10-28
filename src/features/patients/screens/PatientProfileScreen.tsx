import React from 'react'
import { View, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/shared/types'
import { Text } from '@/shared/components/atoms/Text'
import { Icon } from '@/shared/components/atoms/Icon'
import { Avatar } from '@/shared/components/atoms/Avatar'
import { Card } from '@/shared/components/molecules/Card'
import { useAuthStore } from '@/store'
import { useThemeColors, spacing, borderRadius } from '@/theme'
import { mockTreatments } from '@/mock/treatments.mock'
import { mockPatients } from '@/mock/patients.mock'

type PatientProfileScreenProps = {
  navigation: StackNavigationProp<RootStackParamList>
}

export const PatientProfileScreen = ({ navigation }: PatientProfileScreenProps) => {
  const { user } = useAuthStore()
  const colors = useThemeColors()
  
  const patient = mockPatients[0]
  const treatments = mockTreatments.filter((t) => t.patientId === patient.id)

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background.primary }]}>
      <View style={[styles.header, { backgroundColor: colors.background.secondary }]}>
        <Text variant="h2" weight="bold" style={{ color: colors.text.primary }}>
          Mi Perfil
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Card style={[styles.profileCard, { backgroundColor: colors.background.card }]}>
            <View style={styles.profileHeader}>
              <Avatar src={user?.profile.avatar} fallback={user?.profile.name[0]} size="xl" />
              <View style={{ flex: 1 }}>
                <Text variant="h3" weight="bold" style={{ color: colors.text.primary }}>
                  {user?.profile.name} {user?.profile.lastName}
                </Text>
                <View style={styles.infoRow}>
                  <Icon name="email" size={16} color={colors.text.secondary} />
                  <Text variant="caption" style={{ color: colors.text.secondary }}>
                    {user?.email}
                  </Text>
                </View>
                <View style={styles.infoRow}>
                  <Icon name="phone" size={16} color={colors.text.secondary} />
                  <Text variant="caption" style={{ color: colors.text.secondary }}>
                    {user?.profile.phone}
                  </Text>
                </View>
              </View>
            </View>
          </Card>

          <View style={styles.section}>
            <Text variant="h3" weight="bold" style={{ color: colors.text.primary }}>
              Información Médica
            </Text>
            <Card style={{ backgroundColor: colors.background.card }}>
              <InfoItem
                icon="person"
                label="Edad"
                value={`${patient.age} años`}
                colors={colors}
              />
              <InfoItem
                icon="wc"
                label="Género"
                value={patient.gender === 'male' ? 'Masculino' : 'Femenino'}
                colors={colors}
              />
              <InfoItem
                icon="local-hospital"
                label="Grupo Sanguíneo"
                value={patient.medicalHistory.bloodType}
                colors={colors}
              />
              <InfoItem
                icon="medical-services"
                label="Alergias"
                value={patient.medicalHistory.allergies.join(', ') || 'Ninguna'}
                colors={colors}
              />
            </Card>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text variant="h3" weight="bold" style={{ color: colors.text.primary }}>
                Historial de Tratamientos
              </Text>
              <Text variant="caption" style={{ color: colors.text.secondary }}>
                {treatments.length} tratamientos
              </Text>
            </View>
            {treatments.map((treatment) => (
              <Card key={treatment.id} style={[styles.treatmentCard, { backgroundColor: colors.background.card }]}>
                <View style={styles.treatmentHeader}>
                  <View style={[styles.treatmentIcon, { backgroundColor: colors.primary.main + '15' }]}>
                    <Icon name="medical-services" size={20} color={colors.primary.main} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text variant="body" weight="semibold" style={{ color: colors.text.primary }}>
                      {treatment.diagnosis}
                    </Text>
                    <Text variant="caption" style={{ color: colors.text.secondary }}>
                      {treatment.tooth} • {new Date(treatment.startDate).toLocaleDateString('es-ES')}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          treatment.status === 'completed'
                            ? colors.status.success + '20'
                            : treatment.status === 'in_progress'
                            ? colors.status.warning + '20'
                            : colors.text.disabled + '20',
                      },
                    ]}
                  >
                    <Text
                      variant="caption"
                      weight="semibold"
                      style={{
                        color:
                          treatment.status === 'completed'
                            ? colors.status.success
                            : treatment.status === 'in_progress'
                            ? colors.status.warning
                            : colors.text.disabled,
                      }}
                    >
                      {treatment.status === 'completed'
                        ? 'Completado'
                        : treatment.status === 'in_progress'
                        ? 'En Progreso'
                        : 'Pendiente'}
                    </Text>
                  </View>
                </View>
                <Text variant="caption" style={{ color: colors.text.secondary }}>
                  {treatment.description}
                </Text>
              </Card>
            ))}
          </View>

          <View style={styles.section}>
            <Text variant="h3" weight="bold" style={{ color: colors.text.primary }}>
              Odontograma
            </Text>
            <Card style={[styles.dentalChart, { backgroundColor: colors.background.card }]}>
              <View style={styles.chartPlaceholder}>
                <Icon name="grid-on" size={64} color={colors.text.disabled} />
                <Text variant="body" style={{ color: colors.text.secondary }}>
                  Mapa Dental
                </Text>
                <Text variant="caption" align="center" style={{ color: colors.text.tertiary }}>
                  Visualización del estado de tus dientes
                </Text>
              </View>
            </Card>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

interface InfoItemProps {
  icon: string
  label: string
  value: string
  colors: any
}

const InfoItem = ({ icon, label, value, colors }: InfoItemProps) => (
  <View style={styles.infoItem}>
    <View style={styles.infoItemLeft}>
      <Icon name={icon as any} size={20} color={colors.text.secondary} />
      <Text variant="body" style={{ color: colors.text.secondary }}>
        {label}
      </Text>
    </View>
    <Text variant="body" weight="semibold" style={{ color: colors.text.primary }}>
      {value}
    </Text>
  </View>
)

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
  content: {
    padding: spacing.lg,
    gap: spacing.xl,
  },
  profileCard: {
    padding: spacing.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginTop: spacing.xs,
  },
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  infoItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
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
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  dentalChart: {
    padding: spacing.lg,
  },
  chartPlaceholder: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xl,
  },
})

