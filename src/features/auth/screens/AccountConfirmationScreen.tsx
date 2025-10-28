import React from 'react'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { AuthStackParamList } from '@/shared/types'
import { Button, Text, Icon } from '@/shared/components/atoms'
import { colors, spacing } from '@/theme'

type AccountConfirmationScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'AccountConfirmation'>
  route: RouteProp<AuthStackParamList, 'AccountConfirmation'>
}

export const AccountConfirmationScreen = ({ navigation, route }: AccountConfirmationScreenProps) => {
  const { email } = route.params

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name="check-circle" size={96} color={colors.status.success} />
        </View>

        <Text variant="h1" weight="bold" align="center" style={styles.title}>
          ¡Cuenta Creada!
        </Text>

        <Text variant="body" color="secondary" align="center" style={styles.description}>
          Hemos enviado un correo de verificación a{'\n'}
          <Text variant="body" weight="semibold">
            {email}
          </Text>
          {'\n\n'}
          Por favor, revisa tu bandeja de entrada.
        </Text>

        <View style={styles.footer}>
          <Button onPress={() => navigation.navigate('Login')} fullWidth size="lg">
            Iniciar Sesión
          </Button>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  iconContainer: {
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: colors.status.success + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    marginBottom: spacing.lg,
  },
  description: {
    marginBottom: spacing['2xl'],
    maxWidth: 320,
  },
  footer: {
    width: '100%',
    marginTop: spacing.xl,
  },
})

