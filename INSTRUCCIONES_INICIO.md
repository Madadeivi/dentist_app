# Instrucciones de Inicio - DentalFlow

Esta guía te ayudará a comenzar el desarrollo de DentalFlow desde cero.

---

## 📋 Pre-requisitos

Antes de comenzar, asegúrate de tener instalado:

### Obligatorios
- **Node.js** >= 18.x ([Descargar](https://nodejs.org/))
- **npm** >= 9.x o **yarn** >= 1.22.x
- **Git** ([Descargar](https://git-scm.com/))

### Para iOS (Solo macOS)
- **Xcode** >= 14.x (desde App Store)
- **CocoaPods**: `sudo gem install cocoapods`

### Para Android
- **Android Studio** con Android SDK >= 33
- **JDK** >= 17
- Configurar variables de entorno ANDROID_HOME

### Opcional pero Recomendado
- **VS Code** con extensiones:
  - ESLint
  - Prettier
  - React Native Tools
  - TypeScript and JavaScript Language Features

---

## 🚀 Paso 1: Inicializar Proyecto

### Opción A: Crear desde cero con Expo

```bash
cd /Users/madadeivi/Developer/MobileProjects

npx create-expo-app@latest dentist_app --template blank-typescript

cd dentist_app
```

### Opción B: Usar el directorio actual

Si ya estás en el directorio del proyecto:

```bash
npx expo init . --template blank-typescript
```

---

## 📦 Paso 2: Instalar Dependencias

```bash
npm install react-navigation @react-navigation/native @react-navigation/stack @react-navigation/bottom-tabs

npm install react-native-safe-area-context react-native-screens

npm install zustand @tanstack/react-query

npm install axios react-hook-form @hookform/resolvers zod

npm install nativewind tailwindcss

npm install react-native-paper react-native-vector-icons

npm install react-native-reanimated react-native-gesture-handler

npm install react-native-mmkv date-fns

npm install expo-linear-gradient expo-font expo-splash-screen
```

### Instalar dependencias de desarrollo

```bash
npm install -D @types/react @types/react-native

npm install -D @typescript-eslint/eslint-plugin @typescript-eslint/parser

npm install -D eslint eslint-config-prettier eslint-plugin-react eslint-plugin-react-hooks

npm install -D prettier typescript
```

---

## ⚙️ Paso 3: Configurar Proyecto

### 3.1 Crear estructura de carpetas

```bash
mkdir -p src/{app,features,shared,services,store,theme,mock}
mkdir -p src/app/navigation
mkdir -p src/features/{auth,dashboard,patients,appointments,treatments,messaging,resources}
mkdir -p src/shared/{components,hooks,utils,types}
mkdir -p src/shared/components/{atoms,molecules,organisms}
mkdir -p src/services/{api,storage}
mkdir -p assets/{images,icons,fonts}
```

### 3.2 Configurar NativeWind

Crear `tailwind.config.js`:

```bash
npx tailwindcss init
```

Editar `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#138aec',
          light: '#4da3f0',
          dark: '#0d6bc4',
        },
        background: {
          light: '#f6f7f8',
          dark: '#101a22',
        },
      },
      fontFamily: {
        regular: ['Inter-Regular'],
        medium: ['Inter-Medium'],
        semibold: ['Inter-SemiBold'],
        bold: ['Inter-Bold'],
      },
    },
  },
  plugins: [],
}
```

### 3.3 Configurar babel.config.js

Editar `babel.config.js`:

```javascript
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
    ],
  };
};
```

### 3.4 Copiar archivos de configuración

Los siguientes archivos ya están creados:
- ✅ `.gitignore`
- ✅ `.eslintrc.js`
- ✅ `.prettierrc`
- ✅ `tsconfig.json`
- ✅ `package.json`

---

## 🎨 Paso 4: Configurar Sistema de Diseño

### 4.1 Crear archivo de tema

Crear `src/theme/colors.ts`:

```typescript
export const colors = {
  primary: {
    main: '#138aec',
    light: '#4da3f0',
    dark: '#0d6bc4',
  },
  background: {
    light: '#f6f7f8',
    dark: '#101a22',
    white: '#ffffff',
  },
  text: {
    primary: '#212529',
    secondary: '#6c757d',
    light: '#f8f9fa',
  },
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
}
```

### 4.2 Crear archivo de tipografía

Crear `src/theme/typography.ts`:

```typescript
export const typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semibold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
}
```

### 4.3 Crear archivo de espaciado

Crear `src/theme/spacing.ts`:

```typescript
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
}
```

---

## 🔧 Paso 5: Configurar Navegación Base

### 5.1 Crear tipos de navegación

Crear `src/shared/types/navigation.types.ts`:

```typescript
export type RootStackParamList = {
  Auth: undefined
  Main: undefined
}

export type AuthStackParamList = {
  UserTypeSelection: undefined
  Login: undefined
  RegisterDentist: undefined
  RegisterPatient: undefined
  AccountConfirmation: { email: string }
}

export type MainTabParamList = {
  Dashboard: undefined
  Patients: undefined
  Calendar: undefined
  Messages: undefined
  Settings: undefined
}
```

### 5.2 Crear App.tsx base

Crear/editar `App.tsx`:

```typescript
import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const queryClient = new QueryClient()

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="auto" />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
```

---

## 🏗️ Paso 6: Crear Componentes Base (Atoms)

### 6.1 Button Component

Crear `src/shared/components/atoms/Button.tsx`:

```typescript
import React from 'react'
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { colors } from '@/theme/colors'

interface ButtonProps {
  onPress: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  loading?: boolean
  disabled?: boolean
}

export const Button = ({
  onPress,
  children,
  variant = 'primary',
  loading = false,
  disabled = false,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      style={[styles.button, styles[variant], (disabled || loading) && styles.disabled]}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={styles.text}>{children}</Text>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  primary: {
    backgroundColor: colors.primary.main,
  },
  secondary: {
    backgroundColor: colors.text.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary.main,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
})
```

### 6.2 Input Component

Crear `src/shared/components/atoms/Input.tsx`:

```typescript
import React from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'
import { colors } from '@/theme/colors'

interface InputProps {
  label?: string
  value: string
  onChangeText: (text: string) => void
  placeholder?: string
  error?: string
  secureTextEntry?: boolean
}

export const Input = ({
  label,
  value,
  onChangeText,
  placeholder,
  error,
  secureTextEntry = false,
}: InputProps) => {
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={[styles.input, error && styles.inputError]}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: colors.text.primary,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.status.error,
  },
  error: {
    fontSize: 12,
    color: colors.status.error,
    marginTop: 4,
  },
})
```

---

## 🎬 Paso 7: Ejecutar Proyecto

```bash
npm start
```

Luego:
- Presiona `i` para iOS simulator
- Presiona `a` para Android emulator
- Escanea QR con Expo Go para dispositivo físico

---

## ✅ Verificar Instalación

### Checklist

- [ ] Proyecto se ejecuta sin errores
- [ ] Hot reload funciona correctamente
- [ ] No hay warnings de TypeScript
- [ ] ESLint no muestra errores
- [ ] Estructura de carpetas creada
- [ ] Archivos de configuración presentes
- [ ] Git inicializado

### Comandos de Verificación

```bash
npm run typecheck

npm run lint

npm run format
```

---

## 📚 Próximos Pasos

Una vez completada la configuración inicial:

1. **Revisar documentación**:
   - [PLAN_DE_ACCION.md](./PLAN_DE_ACCION.md)
   - [MODELOS_DE_DATOS.md](./MODELOS_DE_DATOS.md)
   - [GUIA_DE_DESARROLLO.md](./GUIA_DE_DESARROLLO.md)

2. **Comenzar Sprint 1**:
   - Implementar pantallas de autenticación
   - Crear servicios mock
   - Desarrollar componentes reutilizables

3. **Configurar Git**:
   ```bash
   git init
   git add .
   git commit -m "feat: configuración inicial del proyecto"
   ```

---

## 🆘 Solución de Problemas

### Error: Module not found

```bash
rm -rf node_modules
npm install
```

### Error: Metro Bundler

```bash
npm start -- --clear
```

### Error: Expo no inicia

```bash
npm install -g expo-cli
expo whoami
expo login
```

---

## 📞 Soporte

Si encuentras problemas durante la configuración:

1. Revisa la [documentación oficial de Expo](https://docs.expo.dev/)
2. Consulta los issues del proyecto
3. Revisa la guía de desarrollo

---

**¡Listo para comenzar! 🚀**

Una vez completados estos pasos, estarás listo para comenzar el desarrollo de DentalFlow.

