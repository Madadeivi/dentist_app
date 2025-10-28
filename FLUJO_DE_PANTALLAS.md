# Flujo de Pantallas - DentalFlow

Este documento describe el orden de implementación de las pantallas según el flujo de usuario.

---

## 📱 Mapa de Pantallas

```
┌─────────────────────────────────────────────────────────────┐
│                    DENTALFLOW APP                           │
└─────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────┐
│  1. SELECCIÓN DE TIPO DE USUARIO                            │
│  - Soy Dentista                                             │
│  - Soy Paciente                                             │
│  - ¿Ya tienes cuenta? → Inicio de Sesión                   │
└─────────────────────────────────────────────────────────────┘
                    │                  │
         ┌──────────┘                  └──────────┐
         ▼                                        ▼
┌──────────────────────┐              ┌──────────────────────┐
│  2a. REGISTRO        │              │  2b. INICIO DE       │
│      DENTISTA        │              │      SESIÓN          │
│                      │              │                      │
│  - Email             │◄─────────────│  - Email             │
│  - Contraseña        │              │  - Contraseña        │
│  - Nombre            │              │  - Olvidé contraseña │
│  - Licencia          │              └──────────────────────┘
│  - Especialización   │                         │
└──────────────────────┘                         │
         │                                        │
         ▼                                        │
┌──────────────────────┐                         │
│  2c. REGISTRO        │                         │
│      PACIENTE        │                         │
│                      │                         │
│  - Email             │                         │
│  - Contraseña        │                         │
│  - Nombre            │                         │
│  - DNI               │                         │
│  - Fecha Nacimiento  │                         │
└──────────────────────┘                         │
         │                                        │
         └────────────┬───────────────────────────┘
                      ▼
         ┌────────────────────────┐
         │  3. CONFIRMACIÓN DE    │
         │     CUENTA             │
         │                        │
         │  - ¡Cuenta Creada!     │
         │  - Verificación email  │
         └────────────────────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │  4. PANEL DE CONTROL   │
         │     DEL DENTISTA       │
         │                        │
         │  - Estadísticas        │
         │  - Próximas Citas      │
         │  - Recordatorios       │
         │  - FAB (+)             │
         └────────────────────────┘
                      │
         ┌────────────┼────────────┬────────────┬────────────┐
         ▼            ▼            ▼            ▼            ▼
    ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐  ┌────────┐
    │ Panel  │  │Pacien- │  │Calenda-│  │Mensajes│  │Ajustes │
    │        │  │tes     │  │rio     │  │        │  │        │
    └────────┘  └────────┘  └────────┘  └────────┘  └────────┘
                     │            │            │
                     ▼            ▼            ▼
```

---

## 🔄 Flujo Detallado por Módulo

### MÓDULO 1: Autenticación

#### 1.1 Selección de Tipo de Usuario
**Archivo**: `diseno/stitch_panel_de_control_del_dentista/selección_de_tipo_de_usuario/`

**Componentes**:
- Logo DentalFlow
- Título "Crea tu cuenta"
- Botón "Soy Dentista" (primario)
- Botón "Soy Paciente" (secundario)
- Link "¿Ya tienes cuenta? Inicia sesión"

**Navegación**:
- Soy Dentista → Formulario de Registro (Dentista)
- Soy Paciente → Formulario de Registro (Paciente)
- Inicia sesión → Pantalla de Inicio de Sesión

---

#### 1.2 Inicio de Sesión
**Archivo**: `diseno/stitch_panel_de_control_del_dentista/inicio_de_sesión/registro/`

**Componentes**:
- Campo Email
- Campo Contraseña
- Checkbox "Recuérdame"
- Botón "Iniciar Sesión"
- Link "¿Olvidaste tu contraseña?"
- Link "¿No tienes cuenta? Regístrate"

**Validaciones**:
- Email válido
- Contraseña mínimo 6 caracteres

**Navegación**:
- Exitoso → Panel de Control
- Registro → Selección de Tipo de Usuario

---

#### 1.3 Registro Dentista
**Archivo**: `diseno/stitch_panel_de_control_del_dentista/formulario_de_registro_(dentista)_/`

**Componentes**:
- Título "Crear Nueva Cuenta" / "Crear Cuenta Profesional"
- Campo Nombre
- Campo Apellido
- Campo Email
- Campo Contraseña
- Campo Confirmar Contraseña
- Campo N° de Licencia Profesional
- Campo Especialización
- Botón "Registrarse"
- Link "¿Ya tienes una cuenta? Inicia sesión"

**Validaciones**:
- Todos los campos requeridos
- Email único
- Contraseña segura (min 8 caracteres, mayúscula, número)
- Contraseñas coinciden
- Número de licencia válido

**Navegación**:
- Exitoso → Confirmación de Cuenta

---

#### 1.4 Registro Paciente
**Archivo**: `diseno/stitch_panel_de_control_del_dentista/formulario_de_registro_(paciente)_/`

**Componentes**:
- Título "Crear Nueva Cuenta"
- Campo Nombre
- Campo Apellido
- Campo Email
- Campo Contraseña
- Campo Confirmar Contraseña
- Campo Fecha de Nacimiento
- Campo DNI
- Botón "Registrarse"
- Link "¿Ya tienes una cuenta? Inicia sesión"

**Validaciones**:
- Todos los campos requeridos
- Email único
- Mayor de edad (18 años)
- DNI válido

**Navegación**:
- Exitoso → Confirmación de Cuenta

---

#### 1.5 Confirmación de Cuenta
**Archivo**: `diseno/stitch_panel_de_control_del_dentista/confirmación_de_cuenta/`

**Componentes**:
- Icono de éxito
- Título "¡Cuenta Creada!"
- Mensaje de confirmación
- Botón "Iniciar Sesión"

**Navegación**:
- Iniciar Sesión → Panel de Control

---

### MÓDULO 2: Panel de Control

#### 2.1 Dashboard del Dentista
**Archivo**: `diseno/stitch_panel_de_control_del_dentista/panel_de_control_del_dentista/`

**Componentes**:
- Header con foto de perfil y notificaciones
- Cards de estadísticas:
  - Pacientes Activos (124)
  - Citas de Hoy (8)
  - Tratamientos Pend. (5)
  - Ingresos del Mes (€12k)
- Sección "Próximas Citas"
  - Lista de citas con hora y paciente
  - Link "Ver agenda"
- Sección "Recordatorios"
  - Checkboxes de tareas
- FAB (+) para agregar
- Bottom Tab Bar

**Navegación**:
- Click en cita → Detalle de Cita
- Ver agenda → Calendario
- Bottom Tabs → Otras secciones
- FAB → Crear nueva cita/paciente

---

### MÓDULO 3: Gestión de Pacientes

#### 3.1 Lista de Pacientes (Versión 1)
**Archivo**: `diseno/stitch_panel_de_control_del_dentista/lista_de_pacientes_1/`

**Componentes**:
- Header "Pacientes" con botón agregar
- Barra de búsqueda
- Filtros horizontales:
  - Filtros
  - Tratamiento pendiente
  - Última visita
- Lista de pacientes:
  - Avatar
  - Nombre completo
  - Info adicional (próxima cita, última visita, etc.)
  - Chevron derecho
  - Badge de alerta (si aplica)

**Funcionalidad**:
- Búsqueda en tiempo real
- Filtros múltiples
- Scroll infinito
- Pull to refresh

**Navegación**:
- Click en paciente → Perfil Detallado del Paciente
- Botón (+) → Nuevo Paciente

---

#### 3.2 Lista de Pacientes (Versión 2)
**Archivo**: `diseno/stitch_panel_de_control_del_dentista/lista_de_pacientes_2/`

**Diferencias con versión 1**:
- Diseño de cards diferente
- Información destacada diferente
- Vista con más espaciado

---

#### 3.3 Perfil Detallado del Paciente (Versión 1)
**Archivo**: `diseno/stitch_panel_de_control_del_dentista/perfil_detallado_del_paciente_1/`

**Componentes**:
- Header con foto, nombre y edad
- Tabs de navegación:
  - Información General
  - Notas
- Sección "Problema":
  - Lista de diagnósticos/problemas
- Sección "Estadísticas":
  - Exámenes realizados
  - Citas completadas
  - Pagos pendientes
- Sección "Recordatorios":
  - Lista de próximas citas/recordatorios
- Botón flotante de edición

**Navegación**:
- Click en problema → Detalle de Tratamiento
- Click en recordatorio → Calendario
- Botón editar → Formulario de edición

---

#### 3.4 Perfil Detallado del Paciente (Versión 2)
**Archivo**: `diseno/stitch_panel_de_control_del_dentista/perfil_detallado_del_paciente_2/`

**Diferencias con versión 1**:
- Layout alternativo
- Información organizada diferente
- Más énfasis en historial médico

---

### MÓDULO 4: Sistema de Calendario

#### 4.1 Calendario (Versión 1)
**Archivo**: `diseno/stitch_panel_de_control_del_dentista/calendario_de_citas_del_dentista_1/`

**Componentes**:
- Header con mes/año y navegación
- Toggle de vista: Mes / Semana / Día
- Calendario mensual:
  - Grid de días
  - Día seleccionado (azul)
  - Días con citas (dot indicator)
- Lista de citas del día seleccionado:
  - Card por cita
  - Hora de inicio/fin
  - Nombre del paciente
  - Tipo de tratamiento
  - Color por estado
  - Menú de opciones
- FAB (+) para nueva cita

**Funcionalidad**:
- Cambiar entre vistas
- Navegar entre meses
- Seleccionar día
- Ver/editar/cancelar citas
- Crear nueva cita

**Navegación**:
- Click en cita → Detalle de Cita
- FAB → Crear Cita

---

#### 4.2 Calendario (Versión 2)
**Archivo**: `diseno/stitch_panel_de_control_del_dentista/calendario_de_citas_del_dentista_2/`

**Diferencias con versión 1**:
- Vista de semana implementada
- Diseño de timeline
- Bloques de tiempo visuales

---

### MÓDULO 5: Mensajería

#### 5.1 Lista de Mensajes (Versión 1)
**Archivo**: `diseno/stitch_panel_de_control_del_dentista/mensajería_interna_(dentista)_1/`

**Componentes**:
- Header "Mensajes"
- Barra de búsqueda
- Lista de conversaciones:
  - Avatar del paciente
  - Nombre
  - Último mensaje (preview)
  - Timestamp
  - Badge de mensajes no leídos
  - Estado online/offline

**Funcionalidad**:
- Búsqueda de conversaciones
- Ordenar por reciente
- Filtrar por no leídos
- Pull to refresh

**Navegación**:
- Click en conversación → Chat Individual

---

#### 5.2 Chat Individual (Versión 2)
**Archivo**: `diseno/stitch_panel_de_control_del_dentista/mensajería_interna_(dentista)_2/`

**Componentes**:
- Header con info del paciente
- Área de mensajes:
  - Burbujas de chat
  - Timestamp
  - Estado de entrega/lectura
  - Separadores de fecha
- Barra de input:
  - Campo de texto
  - Botón adjuntar
  - Botón enviar

**Funcionalidad**:
- Enviar mensajes
- Adjuntar archivos/imágenes
- Ver historial completo
- Auto-scroll a nuevo mensaje
- Indicador de escritura

---

### MÓDULO 6: Recursos y Tratamientos

#### 6.1 Recursos y Apoyo Visual
**Archivo**: `diseno/stitch_panel_de_control_del_dentista/recursos_y_apoyo_visual/`

**Componentes**:
- Header "Apoyo al Paciente"
- Tabs de categorías
- Grid de recursos:
  - Imagen de preview
  - Título del recurso
  - Descripción breve
  - Tipo de recurso (artículo, video, etc.)
- Navegación inferior

**Funcionalidad**:
- Filtrar por categoría
- Buscar recursos
- Compartir con pacientes
- Marcar favoritos

**Navegación**:
- Click en recurso → Detalle del Recurso
- Botón compartir → Seleccionar paciente

---

#### 6.2 Gestión de Tratamientos y Diagnósticos
**Archivo**: `diseno/stitch_panel_de_control_del_dentista/gestión_de_tratamientos_y_diagnósticos/`

**Componentes**:
- Header con info del paciente
- Formulario de diagnóstico:
  - Campo de hallazgos
  - Campo de diagnóstico
  - Campo de recomendaciones
  - Selector de urgencia
- Historial de tratamientos
- Plan de tratamiento
- Botones de acción

**Funcionalidad**:
- Crear diagnóstico
- Asignar tratamiento
- Ver historial
- Generar presupuesto

**Navegación**:
- Guardar → Perfil del Paciente
- Ver tratamiento → Detalle de Tratamiento

---

## 🎯 Orden Recomendado de Implementación

### Sprint 1: Fundamentos
1. ✅ Selección de Tipo de Usuario
2. ✅ Inicio de Sesión
3. ✅ Registro Dentista
4. ✅ Registro Paciente
5. ✅ Confirmación de Cuenta

### Sprint 2: Dashboard
6. ✅ Panel de Control del Dentista

### Sprint 3: Pacientes
7. ✅ Lista de Pacientes (v1)
8. ✅ Perfil Detallado del Paciente (v1)
9. ⬜ Lista de Pacientes (v2) - Opcional
10. ⬜ Perfil Detallado del Paciente (v2) - Opcional

### Sprint 4: Calendario
11. ✅ Calendario de Citas (v1)
12. ⬜ Calendario de Citas (v2) - Opcional

### Sprint 5: Mensajería
13. ✅ Lista de Mensajes (v1)
14. ✅ Chat Individual (v2)

### Sprint 6: Complementos
15. ✅ Recursos y Apoyo Visual
16. ✅ Gestión de Tratamientos

---

## 📊 Resumen de Pantallas

| # | Pantalla | Prioridad | Sprint | Estado |
|---|----------|-----------|--------|--------|
| 1 | Selección de Usuario | Alta | 1 | Pendiente |
| 2 | Inicio de Sesión | Alta | 1 | Pendiente |
| 3 | Registro Dentista | Alta | 1 | Pendiente |
| 4 | Registro Paciente | Alta | 1 | Pendiente |
| 5 | Confirmación Cuenta | Alta | 1 | Pendiente |
| 6 | Panel de Control | Alta | 2 | Pendiente |
| 7 | Lista Pacientes v1 | Alta | 3 | Pendiente |
| 8 | Perfil Paciente v1 | Alta | 3 | Pendiente |
| 9 | Calendario v1 | Alta | 4 | Pendiente |
| 10 | Mensajes Lista | Alta | 5 | Pendiente |
| 11 | Chat Individual | Alta | 5 | Pendiente |
| 12 | Recursos | Media | 6 | Pendiente |
| 13 | Tratamientos | Media | 6 | Pendiente |
| 14 | Lista Pacientes v2 | Baja | - | Opcional |
| 15 | Perfil Paciente v2 | Baja | - | Opcional |
| 16 | Calendario v2 | Baja | - | Opcional |

**Total Pantallas Prioritarias**: 13  
**Total Pantallas Opcionales**: 3  
**Total General**: 16

---

## 🔗 Flujos de Usuario Principales

### Flujo 1: Nuevo Dentista
```
Selección Usuario → Registro Dentista → Confirmación → Login → Dashboard
```

### Flujo 2: Dentista Existente
```
Login → Dashboard → [Pacientes | Calendario | Mensajes]
```

### Flujo 3: Gestión de Paciente
```
Dashboard → Lista Pacientes → Perfil Paciente → [Tratamientos | Citas]
```

### Flujo 4: Agendar Cita
```
Dashboard → Calendario → Nueva Cita → Seleccionar Paciente → Guardar
```

### Flujo 5: Comunicación
```
Dashboard → Mensajes → Chat → Enviar Mensaje
```

---

Este flujo será la guía para el desarrollo secuencial de las pantallas de DentalFlow.

