import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/shared/types'
import { Input } from '@/shared/components/atoms/Input'
import { Button } from '@/shared/components/atoms/Button'
import { Icon } from '@/shared/components/atoms/Icon'
import { Avatar } from '@/shared/components/atoms/Avatar'
import { Header } from '@/shared/components/molecules/Header'
import { Card } from '@/shared/components/molecules/Card'
import { useAuthStore } from '@/store'
import { colors, spacing } from '@/theme'

type ProfileEditScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ProfileEdit'>
}

export const ProfileEditScreen = ({ navigation }: ProfileEditScreenProps) => {
  const { user, setUser } = useAuthStore()

  const [formData, setFormData] = useState({
    name: user?.profile.name || '',
    lastName: user?.profile.lastName || '',
    phone: user?.profile.phone || '',
    email: user?.email || '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value })
    setErrors({ ...errors, [field]: undefined })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) newErrors.name = 'El nombre es requerido'
    if (!formData.lastName) newErrors.lastName = 'El apellido es requerido'
    if (!formData.phone) newErrors.phone = 'El teléfono es requerido'
    if (!formData.email) newErrors.email = 'El email es requerido'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) return

    if (user) {
      setUser({
        ...user,
        email: formData.email,
        profile: {
          ...user.profile,
          name: formData.name,
          lastName: formData.lastName,
          phone: formData.phone,
        },
      })
    }

    Alert.alert('Éxito', 'Perfil actualizado correctamente', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Editar Perfil"
        leftAction={{ icon: 'close', onPress: () => navigation.goBack() }}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.avatarSection}>
            <Avatar
              src={user?.profile.avatar}
              fallback={user?.profile.name[0]}
              size="xl"
            />
            <Button variant="outline" size="sm" style={styles.changePhotoButton}>
              Cambiar Foto
            </Button>
          </View>

          <Card>
            <Input
              label="Nombre"
              value={formData.name}
              onChangeText={(text) => updateField('name', text)}
              placeholder="Tu nombre"
              error={errors.name}
              leftIcon={<Icon name="person" size={20} color={colors.text.secondary} />}
            />
            <Input
              label="Apellido"
              value={formData.lastName}
              onChangeText={(text) => updateField('lastName', text)}
              placeholder="Tu apellido"
              error={errors.lastName}
              leftIcon={<Icon name="person-outline" size={20} color={colors.text.secondary} />}
            />
            <Input
              label="Teléfono"
              value={formData.phone}
              onChangeText={(text) => updateField('phone', text)}
              placeholder="+34 666 123 456"
              error={errors.phone}
              keyboardType="phone-pad"
              leftIcon={<Icon name="phone" size={20} color={colors.text.secondary} />}
            />
            <Input
              label="Email"
              value={formData.email}
              onChangeText={(text) => updateField('email', text)}
              placeholder="tu@email.com"
              error={errors.email}
              keyboardType="email-address"
              autoCapitalize="none"
              leftIcon={<Icon name="email" size={20} color={colors.text.secondary} />}
            />
          </Card>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button variant="outline" onPress={() => navigation.goBack()} style={styles.button}>
          Cancelar
        </Button>
        <Button onPress={handleSave} style={styles.button}>
          Guardar Cambios
        </Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  avatarSection: {
    alignItems: 'center',
    gap: spacing.md,
  },
  changePhotoButton: {
    minWidth: 150,
  },
  footer: {
    flexDirection: 'row',
    padding: spacing.lg,
    gap: spacing.md,
    backgroundColor: colors.background.white,
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
  },
  button: {
    flex: 1,
  },
})

