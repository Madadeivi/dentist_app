import React, { useState } from 'react'
import { View, StyleSheet, SafeAreaView, ScrollView, Alert } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackParamList } from '@/shared/types'
import { Button, Text, Input, Icon } from '@/shared/components/atoms'
import { Header } from '@/shared/components/molecules'
import { useAuthStore } from '@/store'
import { colors, spacing } from '@/theme'

type LoginScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'Login'>
}

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { login, isLoading } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {}

    if (!email) {
      newErrors.email = 'El email es requerido'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email inválido'
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida'
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async () => {
    if (!validateForm()) return

    try {
      await login({ email, password })
    } catch (error) {
      Alert.alert('Error', error instanceof Error ? error.message : 'Error al iniciar sesión')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title=""
        leftAction={{
          icon: 'arrow-back',
          onPress: () => navigation.goBack(),
        }}
      />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Icon name="local-hospital" size={40} color={colors.primary.main} />
          <Text variant="h2" weight="bold" align="center" style={styles.title}>
            Bienvenido/a
          </Text>
          <Text variant="body" color="secondary" align="center">
            Inicia sesión en tu cuenta
          </Text>
        </View>

        <View style={styles.form}>
          <Input
            label="Correo Electrónico"
            value={email}
            onChangeText={(text) => {
              setEmail(text)
              setErrors({ ...errors, email: undefined })
            }}
            placeholder="tu@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            error={errors.email}
            leftIcon={<Icon name="mail" size={20} color={colors.text.secondary} />}
          />

          <Input
            label="Contraseña"
            value={password}
            onChangeText={(text) => {
              setPassword(text)
              setErrors({ ...errors, password: undefined })
            }}
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            error={errors.password}
            leftIcon={<Icon name="lock" size={20} color={colors.text.secondary} />}
            rightIcon={
              <Icon
                name={showPassword ? 'visibility' : 'visibility-off'}
                size={20}
                color={colors.text.secondary}
              />
            }
            onRightIconPress={() => setShowPassword(!showPassword)}
          />

          <Text
            variant="caption"
            color="info"
            weight="semibold"
            align="right"
            onPress={() => Alert.alert('Recuperar contraseña', 'Funcionalidad próximamente')}
            style={styles.forgotPassword}
          >
            ¿Olvidaste tu contraseña?
          </Text>

          <Button onPress={handleLogin} fullWidth loading={isLoading} size="lg">
            Iniciar Sesión
          </Button>
        </View>

        <View style={styles.footer}>
          <Text variant="caption" color="secondary" align="center">
            ¿No tienes una cuenta?{' '}
            <Text
              variant="caption"
              color="info"
              weight="semibold"
              onPress={() => navigation.navigate('UserTypeSelection')}
            >
              Regístrate
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
  header: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
    gap: spacing.sm,
  },
  title: {
    marginTop: spacing.md,
  },
  form: {
    gap: spacing.md,
  },
  forgotPassword: {
    marginTop: -spacing.sm,
  },
  footer: {
    marginTop: spacing['2xl'],
  },
})

