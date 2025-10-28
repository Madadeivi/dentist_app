import React, { useState, useMemo, useCallback } from 'react'
import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { PatientsStackParamList, Patient } from '@/shared/types'
import { Text } from '@/shared/components/atoms/Text'
import { SearchBar } from '@/shared/components/molecules/SearchBar'
import { FloatingActionButton } from '@/shared/components/molecules/FloatingActionButton'
import { PatientListItem } from '@/shared/components/organisms/PatientListItem'
import { mockPatients } from '@/mock/patients.mock'
import { colors, spacing } from '@/theme'

type PatientsListScreenProps = {
  navigation: StackNavigationProp<PatientsStackParamList, 'PatientsList'>
}

const ITEM_HEIGHT = 88

export const PatientsListScreen = ({ navigation }: PatientsListScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('active')

  const filteredPatients = useMemo(() => {
    return mockPatients.filter((patient) => {
      const matchesSearch =
        searchQuery === '' ||
        `${patient.profile.name} ${patient.profile.lastName}`
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        patient.profile.dni?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        patient.email.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFilter = filter === 'all' || patient.status === filter

      return matchesSearch && matchesFilter
    })
  }, [searchQuery, filter])

  const activeCount = mockPatients.filter((p) => p.status === 'active').length
  const inactiveCount = mockPatients.filter((p) => p.status === 'inactive').length

  const renderItem = useCallback(
    ({ item }: { item: Patient }) => (
      <PatientListItem
        patient={item}
        onPress={() => navigation.navigate('PatientDetail', { patientId: item.id })}
      />
    ),
    [navigation]
  )

  const keyExtractor = useCallback((item: Patient) => item.id, [])

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  )

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" weight="bold">
          Pacientes
        </Text>
        <View style={styles.stats}>
          <Text variant="caption" color="secondary">
            {activeCount} activos • {inactiveCount} inactivos
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Buscar por nombre, DNI o email..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.filters}>
        <FilterButton
          label="Todos"
          count={mockPatients.length}
          isActive={filter === 'all'}
          onPress={() => setFilter('all')}
        />
        <FilterButton
          label="Activos"
          count={activeCount}
          isActive={filter === 'active'}
          onPress={() => setFilter('active')}
        />
        <FilterButton
          label="Inactivos"
          count={inactiveCount}
          isActive={filter === 'inactive'}
          onPress={() => setFilter('inactive')}
        />
      </View>

      <FlatList
        data={filteredPatients}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        initialNumToRender={10}
        windowSize={5}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text variant="body" color="secondary" align="center">
              No se encontraron pacientes
            </Text>
          </View>
        }
      />

      <FloatingActionButton
        iconName="person-add"
        onPress={() => console.log('Agregar paciente')}
        style={styles.fab}
      />
    </SafeAreaView>
  )
}

interface FilterButtonProps {
  label: string
  count: number
  isActive: boolean
  onPress: () => void
}

const FilterButton = ({ label, count, isActive, onPress }: FilterButtonProps) => (
  <View
    style={[
      styles.filterButton,
      isActive && styles.filterButtonActive,
    ]}
  >
    <Text
      variant="caption"
      weight="semibold"
      style={[styles.filterText, isActive && styles.filterTextActive]}
      onPress={onPress}
    >
      {label} ({count})
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  stats: {
    marginTop: spacing.xs,
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  filters: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  filterButtonActive: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  filterText: {
    color: colors.text.secondary,
  },
  filterTextActive: {
    color: '#fff',
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 80,
  },
  emptyState: {
    paddingVertical: spacing['2xl'],
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.lg,
    right: spacing.lg,
  },
})

