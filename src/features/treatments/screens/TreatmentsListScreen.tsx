import React, { useState } from 'react'
import { View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { PatientsStackParamList } from '@/shared/types'
import { Text } from '@/shared/components/atoms/Text'
import { Icon } from '@/shared/components/atoms/Icon'
import { Header } from '@/shared/components/molecules/Header'
import { FloatingActionButton } from '@/shared/components/molecules/FloatingActionButton'
import { TreatmentCard } from '@/shared/components/organisms/TreatmentCard'
import { mockTreatments } from '@/mock/treatments.mock'
import { mockPatients } from '@/mock/patients.mock'
import { colors, spacing } from '@/theme'

type TreatmentsListScreenProps = {
  navigation: StackNavigationProp<PatientsStackParamList, 'Treatments'>
  route: RouteProp<PatientsStackParamList, 'Treatments'>
}

type FilterType = 'all' | 'in-progress' | 'completed' | 'planned'

export const TreatmentsListScreen = ({ navigation, route }: TreatmentsListScreenProps) => {
  const { patientId } = route.params
  const [filter, setFilter] = useState<FilterType>('all')

  const patient = mockPatients.find((p) => p.id === patientId)
  const patientTreatments = mockTreatments.filter((t) => t.patientId === patientId)

  const filteredTreatments = patientTreatments.filter((treatment) => {
    if (filter === 'all') return true
    return treatment.status === filter
  })

  const counts = {
    all: patientTreatments.length,
    'in-progress': patientTreatments.filter((t) => t.status === 'in-progress').length,
    completed: patientTreatments.filter((t) => t.status === 'completed').length,
    planned: patientTreatments.filter((t) => t.status === 'planned').length,
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Tratamientos"
        subtitle={patient ? `${patient.profile.name} ${patient.profile.lastName}` : ''}
        leftAction={{ icon: 'arrow-back', onPress: () => navigation.goBack() }}
      />

      <View style={styles.filters}>
        <FilterChip
          label="Todos"
          count={counts.all}
          isActive={filter === 'all'}
          onPress={() => setFilter('all')}
        />
        <FilterChip
          label="En Progreso"
          count={counts['in-progress']}
          isActive={filter === 'in-progress'}
          onPress={() => setFilter('in-progress')}
        />
        <FilterChip
          label="Completados"
          count={counts.completed}
          isActive={filter === 'completed'}
          onPress={() => setFilter('completed')}
        />
        <FilterChip
          label="Planificados"
          count={counts.planned}
          isActive={filter === 'planned'}
          onPress={() => setFilter('planned')}
        />
      </View>

      <FlatList
        data={filteredTreatments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TreatmentCard
            treatment={item}
            onPress={() => navigation.navigate('TreatmentDetail', { treatmentId: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="medical-services" size={64} color={colors.text.disabled} />
            <Text variant="body" color="secondary" align="center">
              No hay tratamientos registrados
            </Text>
          </View>
        }
      />

      <FloatingActionButton
        iconName="add"
        onPress={() => console.log('Nuevo tratamiento')}
        style={styles.fab}
      />
    </SafeAreaView>
  )
}

interface FilterChipProps {
  label: string
  count: number
  isActive: boolean
  onPress: () => void
}

const FilterChip = ({ label, count, isActive, onPress }: FilterChipProps) => (
  <TouchableOpacity
    style={[styles.filterChip, isActive && styles.filterChipActive]}
    onPress={onPress}
  >
    <Text
      variant="caption"
      weight="semibold"
      style={[styles.filterChipText, isActive && styles.filterChipTextActive]}
    >
      {label} ({count})
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  filterChip: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  filterChipActive: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  filterChipText: {
    color: colors.text.secondary,
    fontSize: 12,
  },
  filterChipTextActive: {
    color: '#fff',
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 80,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['2xl'],
    gap: spacing.md,
  },
  fab: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
  },
})

