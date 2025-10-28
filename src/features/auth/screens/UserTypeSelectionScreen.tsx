import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { AuthStackParamList } from '@/shared/types'
import { Button, Text, Icon } from '@/shared/components/atoms'
import { colors, spacing } from '@/theme'

type UserTypeSelectionScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'UserTypeSelection'>
}

export const UserTypeSelectionScreen = ({ navigation }: UserTypeSelectionScreenProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Icon name="local-hospital" size={48} color={colors.primary.main} />
          </View>
          <Text variant="h1" weight="bold" align="center" style={styles.title}>
            DentalFlow
          </Text>
          <Text variant="h3" weight="semibold" align="center" style={styles.subtitle}>
            Crea tu cuenta
          </Text>
          <Text variant="body" color="secondary" align="center" style={styles.description}>
            Selecciona tu tipo de perfil para comenzar
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            onPress={() => navigation.navigate('RegisterDentist')}
            fullWidth
            size="lg"
            icon={<Icon name="medical-services" size={24} color="#fff" />}
          >
            Soy Dentista
          </Button>

          <Button
            onPress={() => navigation.navigate('RegisterPatient')}
            variant="outline"
            fullWidth
            size="lg"
            icon={<Icon name="person" size={24} color={colors.primary.main} />}
          >
            Soy Paciente
          </Button>
        </View>

        <View style={styles.footer}>
          <Text variant="caption" color="secondary" align="center">
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
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.light,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.primary.main + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.sm,
  },
  subtitle: {
    marginBottom: spacing.sm,
  },
  description: {
    marginTop: spacing.sm,
    maxWidth: 280,
  },
  buttonsContainer: {
    gap: spacing.md,
  },
  footer: {
    marginTop: spacing.lg,
  },
})

