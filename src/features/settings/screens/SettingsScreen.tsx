import React from 'react'
import { View, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/shared/types'
import { Text } from '@/shared/components/atoms/Text'
import { Icon } from '@/shared/components/atoms/Icon'
import { Avatar } from '@/shared/components/atoms/Avatar'
import { Card } from '@/shared/components/molecules/Card'
import { useAuthStore, useThemeStore } from '@/store'
import { colors, spacing, borderRadius } from '@/theme'

type SettingsScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Settings'>
}

export const SettingsScreen = ({ navigation }: SettingsScreenProps) => {
  const { user, logout } = useAuthStore()
  const { isDarkMode, toggleTheme } = useThemeStore()

  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: logout,
        },
      ]
    )
  }

  const fullName = user?.type === 'dentist' 
    ? `Dr. ${user.profile.name} ${user.profile.lastName}`
    : `${user?.profile.name} ${user?.profile.lastName}`

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text variant="h2" weight="bold">
          Configuración
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Card style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <Avatar
                src={user?.profile.avatar}
                fallback={user?.profile.name[0]}
                size="xl"
              />
              <View style={styles.profileInfo}>
                <Text variant="h3" weight="bold">
                  {fullName}
                </Text>
                <Text variant="caption" color="secondary">
                  {user?.email}
                </Text>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => navigation.navigate('ProfileEdit')}
                >
                  <Text variant="caption" weight="semibold" style={styles.editButtonText}>
                    Editar Perfil
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>

          <View style={styles.section}>
            <Text variant="body" weight="semibold" color="secondary" style={styles.sectionTitle}>
              CUENTA
            </Text>
            <Card>
              <SettingsItem
                icon="person"
                label="Información Personal"
                onPress={() => navigation.navigate('ProfileEdit')}
              />
              <SettingsItem
                icon="lock"
                label="Cambiar Contraseña"
                onPress={() => navigation.navigate('ChangePassword')}
              />
              <SettingsItem
                icon="notifications"
                label="Notificaciones"
                onPress={() => console.log('Notificaciones')}
              />
            </Card>
          </View>

          <View style={styles.section}>
            <Text variant="body" weight="semibold" color="secondary" style={styles.sectionTitle}>
              APARIENCIA
            </Text>
            <Card>
              <SettingsItem
                icon={isDarkMode ? 'dark-mode' : 'light-mode'}
                label="Tema Oscuro"
                onPress={toggleTheme}
                showArrow={false}
                rightElement={
                  <View style={[styles.toggle, isDarkMode && styles.toggleActive]}>
                    <View style={[styles.toggleThumb, isDarkMode && styles.toggleThumbActive]} />
                  </View>
                }
              />
              <SettingsItem
                icon="language"
                label="Idioma"
                value="Español"
                onPress={() => console.log('Idioma')}
              />
            </Card>
          </View>

          <View style={styles.section}>
            <Text variant="body" weight="semibold" color="secondary" style={styles.sectionTitle}>
              SOPORTE
            </Text>
            <Card>
              <SettingsItem
                icon="help"
                label="Centro de Ayuda"
                onPress={() => console.log('Ayuda')}
              />
              <SettingsItem
                icon="description"
                label="Términos y Condiciones"
                onPress={() => console.log('Términos')}
              />
              <SettingsItem
                icon="privacy-tip"
                label="Política de Privacidad"
                onPress={() => console.log('Privacidad')}
              />
              <SettingsItem
                icon="info"
                label="Acerca de"
                value="v1.0.0"
                onPress={() => console.log('Acerca de')}
              />
            </Card>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Icon name="logout" size={20} color={colors.status.error} />
            <Text variant="body" weight="semibold" style={styles.logoutText}>
              Cerrar Sesión
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

interface SettingsItemProps {
  icon: string
  label: string
  value?: string
  onPress: () => void
  showArrow?: boolean
  rightElement?: React.ReactNode
}

const SettingsItem = ({
  icon,
  label,
  value,
  onPress,
  showArrow = true,
  rightElement,
}: SettingsItemProps) => (
  <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
    <View style={styles.settingsItemLeft}>
      <Icon name={icon as any} size={24} color={colors.text.primary} />
      <Text variant="body">{label}</Text>
    </View>
    <View style={styles.settingsItemRight}>
      {value && (
        <Text variant="caption" color="secondary">
          {value}
        </Text>
      )}
      {rightElement}
      {showArrow && !rightElement && (
        <Icon name="chevron-right" size={24} color={colors.text.disabled} />
      )}
    </View>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  profileCard: {
    padding: spacing.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  profileInfo: {
    flex: 1,
    gap: spacing.xs,
  },
  editButton: {
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
  },
  editButtonText: {
    color: colors.primary.main,
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    paddingHorizontal: spacing.xs,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.neutral[300],
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: colors.primary.main,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.background.white,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.status.error,
  },
  logoutText: {
    color: colors.status.error,
  },
})

