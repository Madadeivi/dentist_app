# 🔧 EAS Build Configuration - DentalFlow

## ✅ **EAS CLI Instalado y Configurado**

### **Versión instalada**: `eas-cli/16.25.0`

### **Configuración completada**:
- ✅ `eas.json` actualizado con 3 perfiles de build
- ✅ Configuración para iOS y Android
- ✅ Configuración de submit para App Store y Google Play

---

## 📱 **Perfiles de Build Configurados**

### 🔧 **Development**
```bash
eas build --profile development --platform ios
eas build --profile development --platform android
```
- **Propósito**: Desarrollo con Expo Dev Client
- **iOS**: Resource class m-medium
- **Android**: APK para testing rápido

### 👀 **Preview**
```bash
eas build --profile preview --platform ios
eas build --profile preview --platform android
```
- **Propósito**: Testing interno y demos
- **iOS**: Simulador + dispositivo físico
- **Android**: APK para distribución interna

### 🚀 **Production**
```bash
eas build --profile production --platform ios
eas build --profile production --platform android
```
- **Propósito**: App Store y Google Play
- **iOS**: App Store Connect
- **Android**: App Bundle para Google Play

---

## 🔑 **Próximos Pasos para Configurar Credenciales**

### **1. Login en EAS**
```bash
eas login
# Ingresar credenciales de Expo
```

### **2. Inicializar Proyecto**
```bash
eas project:init
# Seleccionar cuenta de Expo
# Crear proyecto en Expo Dashboard
```

### **3. Configurar Credenciales iOS**
```bash
eas credentials
# Seleccionar iOS
# Configurar certificados automáticamente
```

### **4. Configurar Credenciales Android**
```bash
eas credentials
# Seleccionar Android
# Generar keystore automáticamente
```

---

## 📋 **Configuración Manual Requerida**

### **Para Submit a Stores:**

#### **iOS (App Store Connect)**
1. Crear app en App Store Connect
2. Actualizar `eas.json` con:
   - `appleId`: Tu Apple ID
   - `ascAppId`: ID de la app en App Store Connect
   - `appleTeamId`: ID de tu equipo de desarrollo

#### **Android (Google Play Console)**
1. Crear app en Google Play Console
2. Crear Service Account en Google Cloud
3. Descargar `google-service-account.json`
4. Actualizar `eas.json` con la ruta del archivo

---

## 🎯 **Comandos Útiles**

```bash
# Ver información del proyecto
eas project:info

# Ver builds disponibles
eas build:list

# Ver credenciales configuradas
eas credentials

# Build para todas las plataformas
eas build --profile production --platform all

# Submit a stores
eas submit --platform ios
eas submit --platform android
```

---

## ⚠️ **Notas Importantes**

1. **Primera configuración**: Requiere login manual en EAS
2. **Apple Developer**: Necesita cuenta de pago ($99/año)
3. **Google Play**: Necesita cuenta de desarrollador ($25 una vez)
4. **Builds**: Tiempo estimado 10-20 minutos cada uno
5. **Credenciales**: EAS puede generar automáticamente la mayoría

---

## 🚀 **Estado Actual**

**EAS está configurado y listo para usar** ✅

**Solo falta**:
- Login en EAS (`eas login`)
- Inicializar proyecto (`eas project:init`)
- Configurar credenciales (`eas credentials`)

Una vez completados estos pasos, podrás hacer builds de producción para iOS y Android.
