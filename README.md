# DentalFlow 🦷

<div align="center">

![DentalFlow Logo](https://via.placeholder.com/150x150.png?text=DentalFlow)

**Aplicación móvil multiplataforma para gestión de consultorios dentales**

[![React Native](https://img.shields.io/badge/React%20Native-0.74-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[Características](#características) •
[Instalación](#instalación) •
[Uso](#uso) •
[Arquitectura](#arquitectura) •
[Documentación](#documentación)

</div>

---

## 📖 Descripción

**DentalFlow** es una solución móvil integral diseñada para optimizar la gestión de consultorios dentales y mejorar la comunicación entre profesionales de la salud dental y sus pacientes. La aplicación ofrece dos experiencias diferenciadas: una para dentistas con herramientas completas de gestión, y otra para pacientes que facilita el seguimiento de su salud dental.

### 🎯 Propósito

- Digitalizar la gestión de consultorios dentales
- Facilitar el acceso a información médica para pacientes
- Mejorar la comunicación dentista-paciente
- Optimizar la gestión de citas y tratamientos
- Proporcionar recursos educativos sobre salud dental

---

## ✨ Características

### 👨‍⚕️ Para Dentistas

#### 📊 Panel de Control
- Vista rápida de estadísticas clave (pacientes activos, citas del día, tratamientos pendientes, ingresos)
- Resumen de próximas citas con información del paciente
- Sistema de recordatorios y tareas pendientes
- Notificaciones en tiempo real

#### 👥 Gestión de Pacientes
- Lista completa de pacientes con búsqueda y filtros avanzados
- Perfil detallado de cada paciente con:
  - Información personal y de contacto
  - Historial médico completo
  - Tratamientos actuales y pasados
  - Radiografías y documentación
  - Notas y observaciones

#### 📅 Sistema de Calendario
- Vista mensual, semanal y diaria de citas
- Código de colores por tipo de tratamiento o estado
- Creación rápida de citas con selección de paciente
- Reprogramación mediante drag & drop
- Recordatorios automáticos
- Gestión de cancelaciones y ausencias

#### 💊 Gestión de Tratamientos
- Registro de diagnósticos
- Plan de tratamiento con fases
- Seguimiento de progreso
- Presupuestos y pagos
- Historial de procedimientos

#### 💬 Mensajería Interna
- Chat directo con pacientes
- Envío de instrucciones post-tratamiento
- Compartir recursos educativos
- Adjuntar imágenes y documentos
- Indicadores de lectura

#### 📚 Recursos y Apoyo Visual
- Biblioteca de recursos educativos (artículos, videos, guías)
- 7 categorías temáticas
- Sistema de búsqueda y filtros
- Material de referencia sobre procedimientos
- Guías de cuidado dental
- Videos explicativos
- Sistema de likes y favoritos

#### ⚙️ Configuración y Perfil
- Editar información personal (nombre, apellido, teléfono, email)
- Cambiar contraseña con validación
- Toggle tema claro/oscuro
- Configuración de notificaciones
- Gestión de horarios de trabajo
- Ajustes de idioma
- Centro de ayuda y soporte
- Cerrar sesión segura

### 👤 Para Pacientes

#### 🏠 Panel Personal
- Próxima cita programada
- Recordatorios de tratamientos
- Acceso rápido a mensajes del dentista
- Estado de tratamientos activos

#### 📆 Gestión de Citas
- Solicitar nueva cita
- Ver historial de citas
- Recibir recordatorios
- Reprogramar o cancelar citas

#### 💬 Comunicación Directa
- Chat con el dentista
- Consultas rápidas
- Recibir instrucciones de cuidado
- Acceso a recursos educativos

#### 📋 Historial Médico
- Ver tratamientos realizados
- Descargar documentación
- Seguimiento de tratamientos en curso
- Acceso a radiografías e imágenes

---

## 📈 Estado del Proyecto

### ✅ Completado (Sprints 1-9) - 100% FUNCIONAL

**Sprint 1: Autenticación** - 5 pantallas + validación + persistencia

**Sprint 2: Dashboard** - Estadísticas + métricas + acciones rápidas

**Sprint 3: Gestión de Pacientes** - Lista búsqueda + detalle + historial médico

**Sprint 4: Calendario** - Calendario mensual + crear/editar citas + filtros

**Sprint 5: Mensajería** - Conversaciones + chat en tiempo real + búsqueda

**Sprint 6: Tratamientos** - Historial + sesiones + prescripciones + pagos + diagnósticos

**Sprint 7: Recursos** - Biblioteca educativa + 8 recursos + 7 categorías + búsqueda

**Sprint 8: Configuración** - Editar perfil + cambiar contraseña + tema oscuro

**Sprint 9: Dark Mode + App Paciente** - Modo oscuro completo + 3 pantallas paciente + navegación dual

**Sprint 10: Performance** - React.memo + FlatList optimizado + lazy loading + hooks personalizados

### 🎉 Proyecto Completado

La aplicación está **100% funcional** con:
- ✅ Aplicación completa para **Dentistas**
- ✅ Aplicación completa para **Pacientes**
- ✅ **Dark Mode** persistente
- ✅ **Performance optimizado** (memoización, listas eficientes)
- ✅ **22 pantallas** totales
- ✅ **92+ archivos** de código
- ✅ **0 errores** de linting

**Ver progreso detallado**: [PROGRESO_SPRINTS.md](./PROGRESO_SPRINTS.md)

---

## 🚀 Instalación

### Prerrequisitos

Asegúrate de tener instalado lo siguiente en tu sistema:

- **Node.js** >= 18.x ([Descargar](https://nodejs.org/))
- **npm** >= 9.x o **yarn** >= 1.22.x
- **Expo CLI**: `npm install -g expo-cli`
- **Git**: ([Descargar](https://git-scm.com/))

#### Para desarrollo iOS (opcional)
- **macOS** con Xcode >= 14.x
- **CocoaPods**: `sudo gem install cocoapods`

#### Para desarrollo Android (opcional)
- **Android Studio** con Android SDK >= 33
- **JDK** >= 17

### Pasos de Instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/tu-usuario/dentist_app.git
cd dentist_app
```

2. **Instalar dependencias**

```bash
npm install
```

o si prefieres yarn:

```bash
yarn install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus configuraciones:

```env
API_URL=http://localhost:3000
ENV=development
```

4. **Iniciar Metro Bundler**

```bash
npm start
```

o

```bash
expo start
```

---

## 🎮 Uso

### Ejecutar en Expo Go (Recomendado para desarrollo)

1. Instala **Expo Go** en tu dispositivo móvil:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. Escanea el código QR que aparece en la terminal con:
   - **iOS**: App de Cámara
   - **Android**: App Expo Go

### Ejecutar en Emulador iOS

```bash
npm run ios
```

o

```bash
expo run:ios
```

### Ejecutar en Emulador Android

```bash
npm run android
```

o

```bash
expo run:android
```

### Ejecutar en Web (Desarrollo)

```bash
npm run web
```

---

## 📱 Scripts Disponibles

```bash
npm start          # Inicia Expo Dev Server
npm run ios        # Ejecuta en simulador iOS
npm run android    # Ejecuta en emulador Android
npm run web        # Ejecuta en navegador web
npm run lint       # Ejecuta ESLint
npm run format     # Formatea código con Prettier
npm run typecheck  # Verifica tipos TypeScript
```

---

## 🏗️ Arquitectura

### Stack Tecnológico

- **Framework**: React Native 0.74.x
- **Lenguaje**: TypeScript 5.x
- **Plataforma**: Expo 51.x
- **Navegación**: React Navigation 6.x
- **Estado Global**: Zustand 4.x
- **Estado del Servidor**: React Query 5.x
- **Estilos**: NativeWind 4.x (Tailwind CSS)
- **Componentes UI**: React Native Paper 5.x
- **Formularios**: React Hook Form 7.x
- **Validación**: Zod 3.x
- **HTTP Client**: Axios
- **Almacenamiento**: React Native MMKV
- **Animaciones**: React Native Reanimated 3.x

### Patrón Arquitectónico

El proyecto sigue una arquitectura **Feature-First** combinada con **Atomic Design**:

```
src/
├── app/              # Navegación y configuración
├── features/         # Módulos por funcionalidad
├── shared/           # Componentes y utilidades compartidas
├── services/         # Servicios y API
├── store/            # Estado global
├── theme/            # Sistema de diseño
└── mock/             # Datos de prueba
```

Para más detalles, consulta [PLAN_DE_ACCION.md](./PLAN_DE_ACCION.md)

---

## 📂 Estructura del Proyecto

```
dentist_app/
├── src/
│   ├── app/                    # Navegación principal
│   ├── features/               # Características por módulo
│   │   ├── auth/              # Autenticación
│   │   ├── dashboard/         # Panel de control
│   │   ├── patients/          # Gestión de pacientes
│   │   ├── appointments/      # Sistema de citas
│   │   ├── treatments/        # Tratamientos
│   │   ├── messaging/         # Mensajería
│   │   └── resources/         # Recursos educativos
│   ├── shared/                # Código compartido
│   │   ├── components/        # Componentes reutilizables
│   │   ├── hooks/             # Custom hooks
│   │   ├── utils/             # Utilidades
│   │   └── types/             # Tipos TypeScript
│   ├── services/              # Servicios API
│   ├── store/                 # Estado global
│   ├── theme/                 # Sistema de diseño
│   └── mock/                  # Datos mock
├── assets/                    # Recursos estáticos
├── diseno/                    # Diseños de referencia
├── .eslintrc.js              # Configuración ESLint
├── .prettierrc               # Configuración Prettier
├── tsconfig.json             # Configuración TypeScript
├── package.json              # Dependencias
├── app.json                  # Configuración Expo
├── PLAN_DE_ACCION.md         # Plan detallado
└── README.md                 # Este archivo
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores

- **Primary**: `#138aec` - Azul principal
- **Background Light**: `#f6f7f8` - Fondo claro
- **Background Dark**: `#101a22` - Fondo oscuro
- **Success**: `#10b981` - Verde
- **Warning**: `#f59e0b` - Naranja
- **Error**: `#ef4444` - Rojo

### Tipografía

- **Familia**: Inter
- **Tamaños**: 12px - 36px
- **Pesos**: Regular, Medium, SemiBold, Bold

---

## 🔐 Autenticación y Seguridad

### Flujo de Autenticación

1. Selección de tipo de usuario (Dentista/Paciente)
2. Inicio de sesión o registro
3. Verificación de cuenta (email)
4. Acceso al dashboard correspondiente

### Medidas de Seguridad

- Token-based authentication
- Validación de esquemas con Zod
- Almacenamiento seguro con MMKV
- Sanitización de inputs
- Manejo centralizado de errores
- Timeout en peticiones
- Auto-logout en sesiones expiradas

---

## 🧪 Datos de Prueba

La aplicación funciona con datos mock para facilitar el desarrollo. Los servicios simulan latencia de red y respuestas reales.

### Usuarios de Prueba

#### Dentista
```
Email: dr.martinez@dentalflow.com
Password: dentista123
```

#### Paciente
```
Email: paciente@example.com
Password: paciente123
```

---

## 📝 Convenciones de Código

### Nomenclatura

- **Componentes**: PascalCase (`PatientCard.tsx`)
- **Hooks**: camelCase con prefijo 'use' (`useAuth.ts`)
- **Utilidades**: camelCase (`formatDate.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`API_URL`)
- **Tipos**: PascalCase con sufijo opcional (`User`, `UserData`)

### Organización de Imports

```typescript
// 1. Imports de React
import React, { useState, useEffect } from 'react'

// 2. Imports de librerías externas
import { View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'

// 3. Imports de componentes compartidos
import { Button, Card } from '@/shared/components'

// 4. Imports de servicios y stores
import { useAuthStore } from '@/store/authStore'
import { patientsService } from '@/services/patientsService'

// 5. Imports de tipos
import type { Patient } from '@/shared/types'

// 6. Imports de estilos (si aplica)
```

### Componentes Funcionales

```typescript
interface ComponentProps {
  title: string
  onPress?: () => void
}

export const Component = ({ title, onPress }: ComponentProps) => {
  const [state, setState] = useState('')

  useEffect(() => {
    // Effect logic
  }, [])

  const handlePress = () => {
    onPress?.()
  }

  return (
    <View>
      <Text>{title}</Text>
    </View>
  )
}
```

---

## 🤝 Contribución

### Flujo de Trabajo

1. Fork el repositorio
2. Crea una rama feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'feat: agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Convenciones de Commits

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Cambios en documentación
- `style:` Formateo, punto y coma faltantes, etc
- `refactor:` Refactorización de código
- `perf:` Mejoras de rendimiento
- `test:` Agregar tests
- `chore:` Mantenimiento

---

## 🐛 Solución de Problemas

### Error: Metro Bundler no inicia

```bash
# Limpiar cache
npm start -- --clear
# o
expo start -c
```

### Error: Dependencias no encontradas

```bash
# Eliminar node_modules y reinstalar
rm -rf node_modules
npm install
```

### Error en iOS: CocoaPods

```bash
cd ios
pod install
cd ..
npm run ios
```

### Error en Android: SDK no encontrado

Asegúrate de tener configurada la variable de entorno `ANDROID_HOME`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

---

## 📚 Documentación Adicional

- [Plan de Acción Detallado](./PLAN_DE_ACCION.md)
- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Expo Documentation](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [NativeWind](https://www.nativewind.dev/)

---

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## 👥 Autores

**Equipo DentalFlow**

- Desarrollo: [@Madadeivi](https://github.com/Madadeivi)
- Diseño UI/UX: Basado en diseños de Stitch

---

## 🙏 Agradecimientos

- Diseños base proporcionados por la herramienta Stitch
- Iconografía de Material Symbols
- Comunidad de React Native y Expo

---

## 📞 Contacto

Para preguntas, sugerencias o reportar problemas:

- **Email**: contacto@dentalflow.com
- **Issues**: [GitHub Issues](https://github.com/tu-usuario/dentist_app/issues)
- **Discussions**: [GitHub Discussions](https://github.com/tu-usuario/dentist_app/discussions)

---

<div align="center">

**Desarrollado con ❤️ para mejorar la salud dental**

[⬆ Volver arriba](#dentalflow-)

</div>

