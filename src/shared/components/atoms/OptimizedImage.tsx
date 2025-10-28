import React, { useState, memo } from 'react'
import { Image, ImageProps, ActivityIndicator, View, StyleSheet } from 'react-native'
import { colors } from '@/theme'

interface OptimizedImageProps extends Omit<ImageProps, 'source'> {
  source: { uri: string } | number
  placeholder?: React.ReactNode
  showLoader?: boolean
}

export const OptimizedImage = memo(({ source, placeholder, showLoader = true, style, ...props }: OptimizedImageProps) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  if (typeof source === 'number') {
    return <Image source={source} style={style} {...props} />
  }

  return (
    <View style={[styles.container, style]}>
      <Image
        source={source}
        style={[StyleSheet.absoluteFill, style]}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={() => {
          setLoading(false)
          setError(true)
        }}
        resizeMode="cover"
        {...props}
      />
      {loading && showLoader && (
        <View style={styles.loaderContainer}>
          {placeholder || <ActivityIndicator size="small" color={colors.primary.main} />}
        </View>
      )}
      {error && (
        <View style={styles.errorContainer}>
          <View style={styles.errorPlaceholder} />
        </View>
      )}
    </View>
  )
})

OptimizedImage.displayName = 'OptimizedImage'

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
  },
  errorContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
  },
  errorPlaceholder: {
    width: '50%',
    height: '50%',
    backgroundColor: colors.neutral[300],
    borderRadius: 8,
  },
})

