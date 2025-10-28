# Configuración EAS para DentalFlow

## 📱 Builds Configurados

### 🔧 **Development Build**
```bash
eas build --profile development --platform ios
eas build --profile development --platform android
```
- **Propósito**: Desarrollo con Expo Dev Client
- **Distribución**: Internal (solo tu equipo)
- **iOS**: Resource class m-medium
- **Android**: APK para testing

### 👀 **Preview Build**
```bash
eas build --profile preview --platform ios
eas build --profile preview --platform android
```
- **Propósito**: Testing interno y demos
- **Distribución**: Internal
- **iOS**: Simulador + dispositivo físico
- **Android**: APK para testing

### 🚀 **Production Build**
```bash
eas build --profile production --platform ios
eas build --profile production --platform android
```
- **Propósito**: App Store y Google Play
- **iOS**: App Store Connect
- **Android**: AAB para Google Play

---

## 🔑 **Configuración de Credenciales**

### **iOS (App Store Connect)**
1. **Apple ID**: Tu Apple Developer ID
2. **App Store Connect App ID**: ID de tu app
3. **Apple Team ID**: ID de tu equipo de desarrollo

### **Android (Google Play Console)**
1. **Service Account Key**: Archivo JSON de Google Cloud
2. **Track**: production, beta, alpha

---

## 📋 **Pasos para Configurar**

### **1. Inicializar EAS**
```bash
eas login
eas project:init
```

### **2. Configurar iOS**
```bash
eas credentials
# Seleccionar iOS
# Configurar certificados y provisioning profiles
```

### **3. Configurar Android**
```bash
eas credentials
# Seleccionar Android
# Configurar keystore
```

### **4. Actualizar eas.json**
- Reemplazar placeholders con valores reales
- Configurar Apple ID y Google Service Account

---

## 🎯 **Comandos Útiles**

```bash
# Ver builds disponibles
eas build:list

# Ver credenciales
eas credentials

# Ver configuración del proyecto
eas project:info

# Build específico
eas build --profile production --platform all

# Submit a stores
eas submit --platform ios
eas submit --platform android
```

---

## ⚠️ **Notas Importantes**

1. **Primera vez**: Necesitas configurar credenciales manualmente
2. **Apple Developer**: Requiere cuenta de pago ($99/año)
3. **Google Play**: Requiere cuenta de desarrollador ($25 una vez)
4. **Builds**: Pueden tomar 10-20 minutos cada uno

---

## 🔄 **Flujo Recomendado**

1. **Development** → Testing interno
2. **Preview** → Testing con stakeholders
3. **Production** → App Store / Google Play
