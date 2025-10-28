# Configuración de desarrollo para DentalFlow

## Scripts disponibles

```bash
# Desarrollo
npm start                    # Inicia Expo Dev Server
npm run android             # Ejecuta en Android
npm run ios                 # Ejecuta en iOS
npm run web                 # Ejecuta en web

# Calidad de código
npm run lint                # Ejecuta ESLint
npm run format              # Formatea código con Prettier
npm run typecheck           # Verifica tipos TypeScript

# Build (requiere EAS CLI)
npx eas build --platform android
npx eas build --platform ios
```

## Configuración inicial

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar variables de entorno**:
   ```bash
   cp .env.example .env
   # Editar .env con tus valores
   ```

3. **Ejecutar en desarrollo**:
   ```bash
   npm start
   ```

## Estructura del proyecto

- `src/app/navigation/` - Navegación de la app
- `src/features/` - Pantallas organizadas por funcionalidad
- `src/shared/` - Componentes y utilidades compartidas
- `src/store/` - Estado global con Zustand
- `src/theme/` - Sistema de diseño
- `src/mock/` - Datos simulados

## Comandos útiles

```bash
# Limpiar cache
npx expo start --clear

# Verificar configuración
npx expo doctor

# Generar iconos automáticamente
npx expo install @expo/image-utils
```
