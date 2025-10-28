import React, { memo } from 'react'
import { Text as RNText, StyleSheet, TextProps as RNTextProps } from 'react-native'
import { colors, typography } from '@/theme'

interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label'
  color?: keyof typeof textColors
  weight?: keyof typeof typography.fontWeight
  align?: 'left' | 'center' | 'right'
}

const textColors = {
  primary: colors.text.primary,
  secondary: colors.text.secondary,
  light: colors.text.light,
  disabled: colors.text.disabled,
  success: colors.status.success,
  warning: colors.status.warning,
  error: colors.status.error,
  info: colors.status.info,
  white: '#fff',
}

const TextComponent = ({
  variant = 'body',
  color = 'primary',
  weight = 'regular',
  align = 'left',
  style,
  ...props
}: TextProps) => {
  return (
    <RNText
      style={[
        styles[variant],
        { color: textColors[color] },
        { fontWeight: typography.fontWeight[weight] },
        { textAlign: align },
        style,
      ]}
      {...props}
    />
  )
}

export const Text = memo(TextComponent)

const styles = StyleSheet.create({
  h1: {
    fontSize: typography.fontSize['4xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.fontSize['4xl'] * typography.lineHeight.tight,
  },
  h2: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
  },
  h3: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight,
  },
  body: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  caption: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.regular,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
})

