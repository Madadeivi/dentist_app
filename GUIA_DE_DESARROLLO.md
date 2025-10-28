# Guía de Desarrollo - DentalFlow

Esta guía establece los estándares, mejores prácticas y convenciones que deben seguirse durante el desarrollo de DentalFlow.

---

## 📑 Índice

1. [Principios de Desarrollo](#principios-de-desarrollo)
2. [Estructura de Componentes](#estructura-de-componentes)
3. [Gestión de Estado](#gestión-de-estado)
4. [Manejo de Errores](#manejo-de-errores)
5. [Performance](#performance)
6. [Accesibilidad](#accesibilidad)
7. [Seguridad](#seguridad)
8. [Testing](#testing)
9. [Git Workflow](#git-workflow)

---

## 🎯 Principios de Desarrollo

### 1. Código Limpio

El código debe ser autoexplicativo. Evitar comentarios innecesarios.

**❌ Mal**
```typescript
const calculateTotal = (items: Item[]) => {
  let t = 0
  for (let i = 0; i < items.length; i++) {
    t += items[i].p * items[i].q
  }
  return t
}
```

**✅ Bien**
```typescript
const calculateTotal = (items: Item[]) => {
  return items.reduce((total, item) => {
    return total + (item.price * item.quantity)
  }, 0)
}
```

### 2. Single Responsibility Principle

Cada función/componente debe tener una única responsabilidad.

**❌ Mal**
```typescript
const UserProfile = ({ userId }) => {
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [friends, setFriends] = useState([])
  
  useEffect(() => {
    fetchUser(userId).then(setUser)
    fetchPosts(userId).then(setPosts)
    fetchFriends(userId).then(setFriends)
  }, [userId])

  return (
    <View>
      <UserInfo user={user} />
      <PostsList posts={posts} />
      <FriendsList friends={friends} />
    </View>
  )
}
```

**✅ Bien**
```typescript
const UserProfile = ({ userId }: UserProfileProps) => {
  const { user } = useUser(userId)
  
  return (
    <View>
      <UserInfo user={user} />
      <UserPosts userId={userId} />
      <UserFriends userId={userId} />
    </View>
  )
}

const UserPosts = ({ userId }: UserPostsProps) => {
  const { posts } = usePosts(userId)
  return <PostsList posts={posts} />
}

const UserFriends = ({ userId }: UserFriendsProps) => {
  const { friends } = useFriends(userId)
  return <FriendsList friends={friends} />
}
```

### 3. DRY (Don't Repeat Yourself)

Evitar duplicación de código mediante la creación de utilidades y componentes reutilizables.

**❌ Mal**
```typescript
const formatPatientName = (patient: Patient) => {
  return `${patient.profile.name} ${patient.profile.lastName}`
}

const formatDentistName = (dentist: User) => {
  return `${dentist.profile.name} ${dentist.profile.lastName}`
}
```

**✅ Bien**
```typescript
const formatFullName = (firstName: string, lastName: string) => {
  return `${firstName} ${lastName}`
}

const getPatientFullName = (patient: Patient) => {
  return formatFullName(patient.profile.name, patient.profile.lastName)
}
```

### 4. TypeScript Estricto

Usar tipos explícitos y evitar `any`.

**❌ Mal**
```typescript
const fetchData = async (id: any) => {
  const response = await api.get(`/data/${id}`)
  return response.data
}
```

**✅ Bien**
```typescript
const fetchPatient = async (patientId: string): Promise<Patient> => {
  const response = await api.get<Patient>(`/patients/${patientId}`)
  return response.data
}
```

---

## 🧩 Estructura de Componentes

### Anatomía de un Componente

```typescript
import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { Button } from '@/shared/components/atoms'
import { Card } from '@/shared/components/molecules'

import { usePatients } from '../hooks/usePatients'
import type { Patient } from '@/shared/types'

interface PatientCardProps {
  patient: Patient
  onPress?: (patientId: string) => void
  showDetails?: boolean
}

export const PatientCard = ({ 
  patient, 
  onPress,
  showDetails = false 
}: PatientCardProps) => {
  const navigation = useNavigation()
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    if (showDetails) {
      setIsExpanded(true)
    }
  }, [showDetails])

  const handlePress = useCallback(() => {
    onPress?.(patient.id)
  }, [onPress, patient.id])

  const fullName = `${patient.profile.name} ${patient.profile.lastName}`

  return (
    <Card onPress={handlePress}>
      <View style={styles.container}>
        <Text style={styles.name}>{fullName}</Text>
        {isExpanded && (
          <View style={styles.details}>
            <Text>{patient.profile.phone}</Text>
          </View>
        )}
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  details: {
    marginTop: 8,
  },
})
```

### Componentes Funcionales vs Clases

**Usar siempre componentes funcionales con hooks**

**❌ Mal**
```typescript
class MyComponent extends React.Component {
  state = { count: 0 }
  
  increment = () => {
    this.setState({ count: this.state.count + 1 })
  }
  
  render() {
    return <Button onPress={this.increment}>{this.state.count}</Button>
  }
}
```

**✅ Bien**
```typescript
const MyComponent = () => {
  const [count, setCount] = useState(0)
  
  const increment = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])
  
  return <Button onPress={increment}>{count}</Button>
}
```

### Props Destructuring

Siempre destructurar props en la firma de la función.

**❌ Mal**
```typescript
const Button = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Text>{props.children}</Text>
    </TouchableOpacity>
  )
}
```

**✅ Bien**
```typescript
interface ButtonProps {
  onPress: () => void
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

const Button = ({ onPress, children, variant = 'primary' }: ButtonProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  )
}
```

### Custom Hooks

Extraer lógica compleja a custom hooks reutilizables.

```typescript
const usePatients = (filters?: PatientsFilter) => {
  const [patients, setPatients] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const fetchPatients = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const data = await patientsService.getAll(filters)
      setPatients(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }, [filters])

  useEffect(() => {
    fetchPatients()
  }, [fetchPatients])

  return {
    patients,
    isLoading,
    error,
    refetch: fetchPatients,
  }
}
```

---

## 💾 Gestión de Estado

### Zustand Store Pattern

```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  setUser: (user: User) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: async (credentials) => {
        try {
          const { user, accessToken } = await authService.login(credentials)
          set({
            user,
            token: accessToken,
            isAuthenticated: true,
          })
        } catch (error) {
          throw error
        }
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        })
      },

      setUser: (user) => {
        set({ user })
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)
```

### React Query Pattern

```typescript
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const usePatient = (patientId: string) => {
  return useQuery({
    queryKey: ['patient', patientId],
    queryFn: () => patientsService.getById(patientId),
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000,
  })
}

export const useUpdatePatient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<PatientData> }) =>
      patientsService.update(id, data),
    onSuccess: (updatedPatient) => {
      queryClient.setQueryData(['patient', updatedPatient.id], updatedPatient)
      queryClient.invalidateQueries({ queryKey: ['patients'] })
    },
  })
}
```

### Estado Local vs Global

**Estado Local**: Usar `useState` para estado específico del componente

```typescript
const [isExpanded, setIsExpanded] = useState(false)
const [inputValue, setInputValue] = useState('')
```

**Estado Global**: Usar Zustand para estado compartido entre múltiples componentes

```typescript
const { user, isAuthenticated } = useAuthStore()
const { theme, toggleTheme } = useThemeStore()
```

---

## ⚠️ Manejo de Errores

### Try-Catch en Operaciones Async

```typescript
const handleSubmit = async (data: FormData) => {
  try {
    setIsLoading(true)
    await submitData(data)
    showSuccessMessage('Datos guardados correctamente')
  } catch (error) {
    if (error instanceof ValidationError) {
      showErrorMessage(error.message)
    } else if (error instanceof NetworkError) {
      showErrorMessage('Error de conexión. Intenta nuevamente.')
    } else {
      showErrorMessage('Ocurrió un error inesperado')
      logError(error)
    }
  } finally {
    setIsLoading(false)
  }
}
```

### Error Boundaries

```typescript
import React, { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logErrorToService(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} />
    }

    return this.props.children
  }
}
```

### Validación de Formularios

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const LoginForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data)
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <View>
      <Input
        control={control}
        name="email"
        error={errors.email?.message}
      />
      <Input
        control={control}
        name="password"
        error={errors.password?.message}
        secureTextEntry
      />
      <Button onPress={handleSubmit(onSubmit)} loading={isSubmitting}>
        Iniciar Sesión
      </Button>
    </View>
  )
}
```

---

## ⚡ Performance

### Optimización de Re-renders

#### React.memo

```typescript
export const PatientCard = React.memo(({ patient, onPress }: PatientCardProps) => {
  return (
    <Card onPress={() => onPress(patient.id)}>
      <Text>{patient.profile.name}</Text>
    </Card>
  )
}, (prevProps, nextProps) => {
  return prevProps.patient.id === nextProps.patient.id
})
```

#### useCallback

```typescript
const PatientsList = ({ patients }: PatientsListProps) => {
  const navigation = useNavigation()

  const handlePatientPress = useCallback((patientId: string) => {
    navigation.navigate('PatientDetail', { patientId })
  }, [navigation])

  return (
    <FlatList
      data={patients}
      renderItem={({ item }) => (
        <PatientCard patient={item} onPress={handlePatientPress} />
      )}
      keyExtractor={(item) => item.id}
    />
  )
}
```

#### useMemo

```typescript
const PatientDetail = ({ patient }: PatientDetailProps) => {
  const treatmentsSummary = useMemo(() => {
    return calculateTreatmentsSummary(patient.treatments)
  }, [patient.treatments])

  return (
    <View>
      <Text>{treatmentsSummary.total} tratamientos</Text>
    </View>
  )
}
```

### Optimización de Listas

```typescript
const PatientsList = ({ patients }: PatientsListProps) => {
  const renderItem = useCallback(({ item }: { item: Patient }) => (
    <PatientCard patient={item} />
  ), [])

  const keyExtractor = useCallback((item: Patient) => item.id, [])

  const getItemLayout = useCallback(
    (_: any, index: number) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  )

  return (
    <FlatList
      data={patients}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      getItemLayout={getItemLayout}
      removeClippedSubviews
      maxToRenderPerBatch={10}
      updateCellsBatchingPeriod={50}
      initialNumToRender={10}
      windowSize={5}
    />
  )
}
```

### Lazy Loading de Imágenes

```typescript
import FastImage from 'react-native-fast-image'

const Avatar = ({ source, size = 'md' }: AvatarProps) => {
  return (
    <FastImage
      source={{ uri: source, priority: FastImage.priority.normal }}
      style={[styles.avatar, styles[size]]}
      resizeMode={FastImage.resizeMode.cover}
    />
  )
}
```

---

## ♿ Accesibilidad

### Labels y Hints

```typescript
const Button = ({ label, onPress }: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      accessible={true}
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityHint="Toca para continuar"
    >
      <Text>{label}</Text>
    </TouchableOpacity>
  )
}
```

### Tamaños de Touch Target

```typescript
const styles = StyleSheet.create({
  button: {
    minHeight: 44,
    minWidth: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
```

### Contraste de Colores

```typescript
const colors = {
  text: {
    primary: '#212529',
    onPrimary: '#FFFFFF',
  },
  background: {
    primary: '#138aec',
  },
}
```

---

## 🔒 Seguridad

### Almacenamiento Seguro

```typescript
import { MMKV } from 'react-native-mmkv'

const storage = new MMKV({
  id: 'secure-storage',
  encryptionKey: 'your-encryption-key',
})

export const secureStorage = {
  set: (key: string, value: string) => {
    storage.set(key, value)
  },
  get: (key: string) => {
    return storage.getString(key)
  },
  delete: (key: string) => {
    storage.delete(key)
  },
}
```

### Sanitización de Inputs

```typescript
const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 1000)
}

const handleInput = (value: string) => {
  const sanitized = sanitizeInput(value)
  setValue(sanitized)
}
```

### Validación de URLs

```typescript
const isValidUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}
```

---

## 🧪 Testing

### Unit Tests (Ejemplo - No implementar)

```typescript
import { renderHook, act } from '@testing-library/react-hooks'
import { usePatients } from '../usePatients'

describe('usePatients', () => {
  it('should fetch patients on mount', async () => {
    const { result, waitForNextUpdate } = renderHook(() => usePatients())

    expect(result.current.isLoading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.isLoading).toBe(false)
    expect(result.current.patients).toHaveLength(3)
  })
})
```

---

## 🌿 Git Workflow

### Branch Naming

```
feature/nombre-de-la-funcionalidad
bugfix/descripcion-del-bug
hotfix/descripcion-del-hotfix
refactor/descripcion-del-refactor
```

### Commit Messages

```
feat: agregar calendario mensual
fix: corregir scroll en lista de pacientes
refactor: extraer lógica de autenticación a hook
style: ajustar espaciado en dashboard
docs: actualizar README con instrucciones
perf: optimizar renderizado de lista
```

### Pull Request Template

```markdown
## Descripción
Breve descripción de los cambios realizados.

## Tipo de Cambio
- [ ] Nueva funcionalidad
- [ ] Corrección de bug
- [ ] Refactorización
- [ ] Actualización de documentación

## Checklist
- [ ] El código sigue las guías de estilo
- [ ] He realizado una auto-revisión
- [ ] He actualizado la documentación
- [ ] Los cambios no generan warnings
- [ ] He probado en iOS y Android
```

---

## 📏 Métricas de Calidad

### Code Coverage (Objetivo)
- Líneas: > 80%
- Funciones: > 80%
- Branches: > 75%

### Performance Benchmarks
- Tiempo de inicio: < 3s
- FPS: > 60
- Memoria: < 200MB
- Bundle size: < 50MB

### Accesibilidad
- Contraste AAA
- Touch targets >= 44px
- Screen reader compatible
- Keyboard navigation

---

Esta guía debe ser seguida por todos los desarrolladores del proyecto. Se actualizará conforme evolucione el proyecto y se identifiquen nuevas mejores prácticas.

**Última actualización**: 28 de Octubre, 2025

