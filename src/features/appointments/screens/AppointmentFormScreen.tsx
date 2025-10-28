import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { RootStackParamList } from '@/shared/types'
import { Text } from '@/shared/components/atoms/Text'
import { Input } from '@/shared/components/atoms/Input'
import { Button } from '@/shared/components/atoms/Button'
import { Icon } from '@/shared/components/atoms/Icon'
import { Header } from '@/shared/components/molecules/Header'
import { Card } from '@/shared/components/molecules/Card'
import { colors, spacing } from '@/theme'

type AppointmentFormScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'AppointmentForm'>
  route: RouteProp<RootStackParamList, 'AppointmentForm'>
}

export const AppointmentFormScreen = ({ navigation, route }: AppointmentFormScreenProps) => {
  const appointmentId = route.params?.appointmentId
  const isEditing = !!appointmentId

  const [formData, setFormData] = useState({
    patientName: '',
    date: '',
    time: '',
    duration: '30',
    type: '',
    reason: '',
    notes: '',
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData({ ...formData, [field]: value })
    setErrors({ ...errors, [field]: undefined })
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.patientName) newErrors.patientName = 'El paciente es requerido'
    if (!formData.date) newErrors.date = 'La fecha es requerida'
    if (!formData.time) newErrors.time = 'La hora es requerida'
    if (!formData.type) newErrors.type = 'El tipo de cita es requerido'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = () => {
    if (!validateForm()) return

    Alert.alert(
      'Éxito',
      isEditing ? 'Cita actualizada correctamente' : 'Cita creada correctamente',
      [{ text: 'OK', onPress: () => navigation.goBack() }]
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={isEditing ? 'Editar Cita' : 'Nueva Cita'}
        leftAction={{ icon: 'close', onPress: () => navigation.goBack() }}
      />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Card>
            <Text variant="h3" weight="semibold" style={styles.sectionTitle}>
              Información del Paciente
            </Text>
            <Input
              label="Paciente"
              value={formData.patientName}
              onChangeText={(text) => updateField('patientName', text)}
              placeholder="Seleccionar paciente"
              error={errors.patientName}
              leftIcon={<Icon name="person" size={20} color={colors.text.secondary} />}
            />
          </Card>

          <Card>
            <Text variant="h3" weight="semibold" style={styles.sectionTitle}>
              Fecha y Hora
            </Text>
            <Input
              label="Fecha"
              value={formData.date}
              onChangeText={(text) => updateField('date', text)}
              placeholder="DD/MM/AAAA"
              error={errors.date}
              leftIcon={<Icon name="calendar-today" size={20} color={colors.text.secondary} />}
            />
            <Input
              label="Hora"
              value={formData.time}
              onChangeText={(text) => updateField('time', text)}
              placeholder="HH:MM"
              error={errors.time}
              leftIcon={<Icon name="schedule" size={20} color={colors.text.secondary} />}
            />
            <Input
              label="Duración (minutos)"
              value={formData.duration}
              onChangeText={(text) => updateField('duration', text)}
              placeholder="30"
              keyboardType="numeric"
              leftIcon={<Icon name="timer" size={20} color={colors.text.secondary} />}
            />
          </Card>

          <Card>
            <Text variant="h3" weight="semibold" style={styles.sectionTitle}>
              Detalles de la Cita
            </Text>
            <Input
              label="Tipo de Cita"
              value={formData.type}
              onChangeText={(text) => updateField('type', text)}
              placeholder="Revisión, Limpieza, etc."
              error={errors.type}
              leftIcon={<Icon name="medical-services" size={20} color={colors.text.secondary} />}
            />
            <Input
              label="Motivo"
              value={formData.reason}
              onChangeText={(text) => updateField('reason', text)}
              placeholder="Motivo de la cita"
              leftIcon={<Icon name="description" size={20} color={colors.text.secondary} />}
            />
            <Input
              label="Notas Adicionales"
              value={formData.notes}
              onChangeText={(text) => updateField('notes', text)}
              placeholder="Notas o comentarios"
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />
          </Card>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button variant="outline" onPress={() => navigation.goBack()} style={styles.button}>
          Cancelar
        </Button>
        <Button onPress={handleSave} style={styles.button}>
          {isEditing ? 'Guardar Cambios' : 'Crear Cita'}
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
    gap: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.md,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
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

