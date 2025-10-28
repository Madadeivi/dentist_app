import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '@/shared/types'
import { Input } from '@/shared/components/atoms/Input'
import { Button } from '@/shared/components/atoms/Button'
import { Icon } from '@/shared/components/atoms/Icon'
import { Text } from '@/shared/components/atoms/Text'
import { Header } from '@/shared/components/molecules/Header'
import { Card } from '@/shared/components/molecules/Card'
import { colors, spacing } from '@/theme'

type ChangePasswordScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'ChangePassword'>
}

export const ChangePasswordScreen = ({ navigation }: ChangePasswordScreenProps) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value })
    setErrors({ ...errors, [field]: undefined })
  }

  const toggleShowPassword = (field: keyof typeof showPassword) => {
    setShowPassword({ ...showPassword, [field]: !showPassword[field] })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.currentPassword) {
      newErrors.currentPassword = 'La contraseña actual es requerida'
    }

    if (!formData.newPassword) {
      newErrors.newPassword = 'La nueva contraseña es requerida'
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = 'La contraseña debe tener al menos 6 caracteres'
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Debes confirmar la contraseña'
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) return

    Alert.alert('Éxito', 'Contraseña actualizada correctamente', [
      {
        text: 'OK',
        onPress: () => {
          setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' })
          navigation.goBack()
        },
      },
    ])
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Cambiar Contraseña"
        leftAction={{ icon: 'arrow-back', onPress: () => navigation.goBack() }}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text variant="body" color="secondary" style={styles.description}>
            Por seguridad, necesitamos verificar tu contraseña actual antes de establecer una nueva.
          </Text>

          <Card>
            <Input
              label="Contraseña Actual"
              value={formData.currentPassword}
              onChangeText={(text) => updateField('currentPassword', text)}
              placeholder="Tu contraseña actual"
              error={errors.currentPassword}
              secureTextEntry={!showPassword.current}
              leftIcon={<Icon name="lock" size={20} color={colors.text.secondary} />}
              rightIcon={
                <Icon
                  name={showPassword.current ? 'visibility-off' : 'visibility'}
                  size={20}
                  color={colors.text.secondary}
                />
              }
              onRightIconPress={() => toggleShowPassword('current')}
            />

            <View style={styles.divider} />

            <Input
              label="Nueva Contraseña"
              value={formData.newPassword}
              onChangeText={(text) => updateField('newPassword', text)}
              placeholder="Mínimo 6 caracteres"
              error={errors.newPassword}
              secureTextEntry={!showPassword.new}
              leftIcon={<Icon name="lock-outline" size={20} color={colors.text.secondary} />}
              rightIcon={
                <Icon
                  name={showPassword.new ? 'visibility-off' : 'visibility'}
                  size={20}
                  color={colors.text.secondary}
                />
              }
              onRightIconPress={() => toggleShowPassword('new')}
            />

            <Input
              label="Confirmar Nueva Contraseña"
              value={formData.confirmPassword}
              onChangeText={(text) => updateField('confirmPassword', text)}
              placeholder="Repite la nueva contraseña"
              error={errors.confirmPassword}
              secureTextEntry={!showPassword.confirm}
              leftIcon={<Icon name="lock-outline" size={20} color={colors.text.secondary} />}
              rightIcon={
                <Icon
                  name={showPassword.confirm ? 'visibility-off' : 'visibility'}
                  size={20}
                  color={colors.text.secondary}
                />
              }
              onRightIconPress={() => toggleShowPassword('confirm')}
            />
          </Card>

          <View style={styles.tips}>
            <Text variant="caption" weight="semibold">
              Consejos para una contraseña segura:
            </Text>
            <View style={styles.tipsList}>
              <Text variant="caption" color="secondary">
                • Al menos 6 caracteres de longitud
              </Text>
              <Text variant="caption" color="secondary">
                • Combina letras mayúsculas y minúsculas
              </Text>
              <Text variant="caption" color="secondary">
                • Incluye números y símbolos
              </Text>
              <Text variant="caption" color="secondary">
                • Evita información personal obvia
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button variant="outline" onPress={() => navigation.goBack()} style={styles.button}>
          Cancelar
        </Button>
        <Button onPress={handleSave} style={styles.button}>
          Actualizar Contraseña
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
  description: {
    lineHeight: 22,
  },
  divider: {
    height: spacing.md,
  },
  tips: {
    padding: spacing.md,
    backgroundColor: colors.primary.main + '10',
    borderRadius: 8,
    gap: spacing.sm,
  },
  tipsList: {
    gap: 4,
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

