import React from 'react'
import { TouchableOpacity, StyleSheet, View } from 'react-native'
import { Icon } from '../atoms'
import { colors, borderRadius, shadows } from '@/theme'

interface FloatingActionButtonProps {
  onPress: () => void
  icon?: keyof typeof import('@expo/vector-icons/MaterialIcons').default.glyphMap
  position?: 'bottom-right' | 'bottom-left' | 'bottom-center'
}

export const FloatingActionButton = ({
  onPress,
  icon = 'add',
  position = 'bottom-right',
}: FloatingActionButtonProps) => {
  return (
    <View style={[styles.container, styles[position]]}>
      <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
        <Icon name={icon} size={28} color="#fff" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 999,
  },
  'bottom-right': {
    bottom: 100,
    right: 20,
  },
  'bottom-left': {
    bottom: 100,
    left: 20,
  },
  'bottom-center': {
    bottom: 100,
    alignSelf: 'center',
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    backgroundColor: colors.primary.main,
    justifyContent: 'center',
    alignItems: 'center',
    ...shadows.lg,
  },
})

