import React, { memo } from 'react'
import { ViewStyle } from 'react-native'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { colors } from '@/theme'

interface IconProps {
  name: keyof typeof MaterialIcons.glyphMap
  size?: number
  color?: string
  style?: ViewStyle
}

const IconComponent = ({ name, size = 24, color = colors.text.primary, style }: IconProps) => {
  return <MaterialIcons name={name} size={size} color={color} style={style} />
}

export const Icon = memo(IconComponent)

