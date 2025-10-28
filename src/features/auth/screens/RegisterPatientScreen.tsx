import React, { useState } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackParamList } from '@/shared/types'
import { Button, Text, Input, Icon } from '@/shared/components/atoms'
import { Header } from '@/shared/components/molecules'
import { useAuthStore } from '@/store'
import { colors, spacing } from '@/theme'

type RegisterPatientScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'RegisterPatient'>
}

export const RegisterPatientScreen = ({ navigation }: RegisterPatientScreenProps) => {
  const { register, isLoading } = useAuthStore()
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    dni: '',
    dateOfBirth: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value })
    setErrors({ ...errors, [field]: undefined })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name) newErrors.name = 'El nombre es requerido'
    if (!formData.lastName) newErrors.lastName = 'El apellido es requerido'
    if (!formData.email) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido'
    }
    if (!formData.phone) newErrors.phone = 'El teléfono es requerido'
    if (!formData.dni) newErrors.dni = 'El DNI es requerido'
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'La fecha de nacimiento es requerida'
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres'
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegister = async () => {
    if (!validateForm()) return

    try {
      await register(
        {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          lastName: formData.lastName,
          phone: formData.phone,
          dni: formData.dni,
          dateOfBirth: new Date(formData.dateOfBirth || Date.now()),
        },
        'patient'
      )
      navigation.navigate('AccountConfirmation', { email: formData.email })
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Error al registrarse')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Crear Nueva Cuenta"
        leftAction={{
          icon: 'arrow-back',
          onPress: () => navigation.goBack(),
        }}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Text variant="body" color="secondary" style={styles.description}>
          Bienvenido. Completa tus datos para crear una cuenta.
        </Text>

        <View style={styles.form}>
          <Input
            label="Nombre"
            value={formData.name}
            onChangeText={(text) => updateField('name', text)}
            placeholder="Ingresa tu nombre"
            error={errors.name}
          />

          <Input
            label="Apellido"
            value={formData.lastName}
            onChangeText={(text) => updateField('lastName', text)}
            placeholder="Ingresa tu apellido"
            error={errors.lastName}
          />

          <Input
            label="Correo Electrónico"
            value={formData.email}
            onChangeText={(text) => updateField('email', text)}
            placeholder="ejemplo@correo.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
          />

          <Input
            label="Teléfono"
            value={formData.phone}
            onChangeText={(text) => updateField('phone', text)}
            placeholder="+34 666 123 456"
            keyboardType="phone-pad"
            error={errors.phone}
          />

          <Input
            label="DNI"
            value={formData.dni}
            onChangeText={(text) => updateField('dni', text)}
            placeholder="12345678A"
            autoCapitalize="characters"
            error={errors.dni}
          />

          <Input
            label="Fecha de Nacimiento"
            value={formData.dateOfBirth}
            onChangeText={(text) => updateField('dateOfBirth', text)}
            placeholder="DD/MM/AAAA"
            error={errors.dateOfBirth}
            leftIcon={<Icon name="calendar-today" size={20} color={colors.text.secondary} />}
          />

          <Input
            label="Contraseña"
            value={formData.password}
            onChangeText={(text) => updateField('password', text)}
            placeholder="Crea una contraseña segura"
            secureTextEntry={!showPassword}
            error={errors.password}
            rightIcon={
              <Icon
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={20}
                color={colors.text.secondary}
              />
            }
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <Input
            label="Confirmar Contraseña"
            value={formData.confirmPassword}
            onChangeText={(text) => updateField('confirmPassword', text)}
            placeholder="Vuelve a escribir la contraseña"
            secureTextEntry={!showConfirmPassword}
            error={errors.confirmPassword}
            rightIcon={
              <Icon
                name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                size={20}
                color={colors.text.secondary}
              />
            }
            onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </View>

        <View style={styles.footer}>
          <Button onPress={handleRegister} fullWidth loading={isLoading} size="lg">
            Registrarse
          </Button>

          <Text variant="caption" color="secondary" align="center" style={styles.loginLink}>
            ¿Ya tienes una cuenta?{' '}
            <Text
              variant="caption"
              color="info"
              weight="semibold"
              onPress={() => navigation.navigate('Login')}
            >
              Inicia sesión
            </Text>
          </Text>
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
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
  },
  description: {
    marginBottom: spacing.lg,
  },
  form: {
    gap: spacing.md,
  },
  footer: {
    marginTop: spacing.xl,
    gap: spacing.lg,
  },
  loginLink: {
    marginTop: spacing.md,
  },
})

