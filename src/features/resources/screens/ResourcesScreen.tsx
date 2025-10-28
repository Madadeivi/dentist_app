import React, { useState } from 'react'
import { View, StyleSheet, FlatList, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/shared/types'
import { Text } from '@/shared/components/atoms/Text'
import { Icon } from '@/shared/components/atoms/Icon'
import { SearchBar } from '@/shared/components/molecules/SearchBar'
import { ResourceCard } from '@/shared/components/organisms/ResourceCard'
import { mockResources, mockResourceCategories } from '@/mock/resources.mock'
import { colors, spacing, borderRadius } from '@/theme'

type ResourcesScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Resources'>
}

export const ResourcesScreen = ({ navigation }: ResourcesScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch =
      searchQuery === '' ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesCategory = !selectedCategory || resource.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text variant="h2" weight="bold">
            Recursos Educativos
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="close" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>
        <Text variant="caption" color="secondary">
          Material educativo sobre salud dental
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          placeholder="Buscar recursos..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesScroll}
        contentContainerStyle={styles.categories}
      >
        <TouchableOpacity
          style={[
            styles.categoryChip,
            !selectedCategory && styles.categoryChipActive,
          ]}
          onPress={() => setSelectedCategory(null)}
        >
          <Text
            variant="caption"
            weight="semibold"
            style={[
              styles.categoryText,
              !selectedCategory && styles.categoryTextActive,
            ]}
          >
            Todos ({mockResources.length})
          </Text>
        </TouchableOpacity>
        {mockResourceCategories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.name.toLowerCase() && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category.name.toLowerCase())}
          >
            <Icon
              name={category.icon as any}
              size={16}
              color={selectedCategory === category.name.toLowerCase() ? '#fff' : category.color}
            />
            <Text
              variant="caption"
              weight="semibold"
              style={[
                styles.categoryText,
                selectedCategory === category.name.toLowerCase() && styles.categoryTextActive,
              ]}
            >
              {category.name} ({category.count})
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredResources}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ResourceCard
            resource={item}
            onPress={() => navigation.navigate('ResourceDetail', { resourceId: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Icon name="search-off" size={64} color={colors.text.disabled} />
            <Text variant="body" color="secondary" align="center">
              No se encontraron recursos
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.xs,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  categoriesScroll: {
    maxHeight: 50,
  },
  categories: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.background.white,
    borderWidth: 1,
    borderColor: colors.border.light,
  },
  categoryChipActive: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  categoryText: {
    color: colors.text.secondary,
  },
  categoryTextActive: {
    color: '#fff',
  },
  list: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['2xl'],
    gap: spacing.md,
  },
})

