import { Resource } from '@/shared/types'

export const mockResources: Resource[] = [
  {
    id: 'res-1',
    type: 'article',
    category: 'hygiene',
    title: 'Técnica correcta de cepillado dental',
    description: 'Aprende la forma adecuada de cepillarte los dientes para una higiene óptima',
    content: `El cepillado dental correcto es fundamental para mantener una buena salud bucal. Aquí te presentamos la técnica recomendada:

1. Coloca el cepillo en un ángulo de 45 grados con respecto a la encía
2. Realiza movimientos suaves y circulares
3. Cepilla todas las superficies de cada diente
4. No olvides cepillar la lengua
5. Dedica al menos 2 minutos al cepillado

Recuerda cambiar tu cepillo cada 3 meses o cuando las cerdas estén desgastadas.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400',
    readTime: 5,
    author: 'Dra. Elena Martínez',
    publishedAt: new Date('2024-10-15'),
    tags: ['cepillado', 'higiene', 'prevención'],
    views: 1240,
    likes: 89,
  },
  {
    id: 'res-2',
    type: 'video',
    category: 'prevention',
    title: 'Uso correcto del hilo dental',
    description: 'Video tutorial sobre cómo usar el hilo dental de manera efectiva',
    videoUrl: 'https://example.com/video-hilo-dental',
    thumbnailUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400',
    duration: 180,
    author: 'Dr. Carlos García',
    publishedAt: new Date('2024-10-10'),
    tags: ['hilo dental', 'limpieza', 'prevención'],
    views: 2150,
    likes: 156,
    isFavorite: true,
  },
  {
    id: 'res-3',
    type: 'guide',
    category: 'post-care',
    title: 'Cuidados después de una extracción dental',
    description: 'Guía completa sobre los cuidados necesarios tras una extracción',
    content: `Después de una extracción dental, es importante seguir estas recomendaciones:

**Primeras 24 horas:**
- Morder gasa por 30-45 minutos
- Aplicar hielo en la zona (15 min cada hora)
- Evitar enjuagues bucales
- No fumar ni usar popote
- Dieta blanda y fría

**Días siguientes:**
- Continuar con higiene bucal suave
- Enjuagues con agua tibia y sal
- Tomar medicamentos según prescripción
- Evitar alimentos duros
- Descansar adecuadamente

**Signos de alerta:**
- Sangrado excesivo después de 24h
- Dolor intenso no controlado
- Fiebre alta
- Hinchazón extrema

Contacta a tu dentista si presentas alguno de estos síntomas.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400',
    readTime: 8,
    author: 'Dra. Ana López',
    publishedAt: new Date('2024-09-28'),
    tags: ['extracción', 'post-operatorio', 'cuidados'],
    views: 3420,
    likes: 245,
    isFavorite: true,
  },
  {
    id: 'res-4',
    type: 'article',
    category: 'nutrition',
    title: 'Alimentos que dañan tus dientes',
    description: 'Conoce qué alimentos pueden perjudicar tu salud dental',
    content: `Ciertos alimentos y bebidas pueden dañar el esmalte dental y promover las caries:

**Alimentos a evitar o limitar:**
- Bebidas azucaradas y refrescos
- Dulces pegajosos y caramelos
- Alimentos ácidos (cítricos en exceso)
- Café y té sin moderación
- Alcohol

**Alternativas saludables:**
- Agua natural
- Lácteos bajos en azúcar
- Frutas frescas (con moderación)
- Vegetales crujientes
- Frutos secos

Recuerda que no solo importa QUÉ comes, sino también CUÁNDO. Los snacks frecuentes entre comidas aumentan el riesgo de caries.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
    readTime: 6,
    author: 'Dr. Luis Fernández',
    publishedAt: new Date('2024-10-01'),
    tags: ['nutrición', 'prevención', 'alimentación'],
    views: 1890,
    likes: 132,
  },
  {
    id: 'res-5',
    type: 'tip',
    category: 'pediatric',
    title: 'Cómo cuidar los dientes de leche',
    description: 'Consejos para el cuidado dental infantil',
    content: `Los dientes de leche son importantes aunque sean temporales:

- Comienza la higiene desde que aparece el primer diente
- Usa cepillo suave y pasta con flúor apropiada
- Evita que el bebé se duerma con biberón
- Primera visita al dentista al año de edad
- Limita jugos y bebidas azucaradas
- Supervisa el cepillado hasta los 8 años`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1629909615184-74f495363b67?w=400',
    readTime: 4,
    author: 'Dra. María Rodríguez',
    publishedAt: new Date('2024-10-20'),
    tags: ['niños', 'prevención', 'pediatría'],
    views: 956,
    likes: 78,
  },
  {
    id: 'res-6',
    type: 'infographic',
    category: 'emergency',
    title: 'Qué hacer ante una emergencia dental',
    description: 'Pasos a seguir en caso de emergencia dental',
    content: `**Diente roto o astillado:**
- Enjuagar la boca con agua tibia
- Guardar los fragmentos si es posible
- Aplicar compresa fría
- Acudir al dentista inmediatamente

**Diente avulsionado (salido completamente):**
- Tomar el diente por la corona, no la raíz
- Enjuagar suavemente sin frotar
- Intentar recolocarlo si es posible
- Si no, guardarlo en leche o saliva
- Acudir al dentista en menos de 30 minutos

**Dolor intenso:**
- Enjuagues con agua tibia y sal
- Analgésico según indicación
- Compresa fría externa
- Llamar al dentista para cita urgente`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400',
    readTime: 5,
    author: 'Dr. Pedro Sánchez',
    publishedAt: new Date('2024-10-05'),
    tags: ['emergencia', 'urgencia', 'traumatismo'],
    views: 2780,
    likes: 198,
  },
  {
    id: 'res-7',
    type: 'article',
    category: 'treatments',
    title: 'Ortodoncia: ¿Cuándo es necesaria?',
    description: 'Aprende sobre los tratamientos de ortodoncia y cuándo considerarlos',
    content: `La ortodoncia no solo mejora la estética, sino también la función dental:

**Indicaciones para ortodoncia:**
- Apiñamiento dental
- Dientes separados
- Sobremordida o submordida
- Mordida cruzada
- Problemas de ATM

**Tipos de ortodoncia:**
- Brackets metálicos
- Brackets estéticos
- Ortodoncia invisible (alineadores)
- Ortodoncia lingual

**Edad ideal:**
La evaluación puede iniciarse desde los 7 años, aunque el tratamiento completo suele comenzar en la adolescencia.`,
    thumbnailUrl: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400',
    readTime: 7,
    author: 'Dra. Carmen Ruiz',
    publishedAt: new Date('2024-09-15'),
    tags: ['ortodoncia', 'tratamiento', 'brackets'],
    views: 1650,
    likes: 115,
  },
  {
    id: 'res-8',
    type: 'video',
    category: 'hygiene',
    title: 'Enjuague bucal: ¿Sí o no?',
    description: 'Todo lo que necesitas saber sobre el uso de enjuagues bucales',
    videoUrl: 'https://example.com/video-enjuague',
    thumbnailUrl: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400',
    duration: 240,
    author: 'Dr. José Martín',
    publishedAt: new Date('2024-10-12'),
    tags: ['enjuague', 'higiene', 'complemento'],
    views: 1420,
    likes: 94,
  },
]

export const mockResourceCategories = [
  {
    id: 'cat-1',
    name: 'Higiene Dental',
    icon: 'cleaning-services',
    color: '#3b82f6',
    count: mockResources.filter((r) => r.category === 'hygiene').length,
  },
  {
    id: 'cat-2',
    name: 'Prevención',
    icon: 'shield',
    color: '#10b981',
    count: mockResources.filter((r) => r.category === 'prevention').length,
  },
  {
    id: 'cat-3',
    name: 'Tratamientos',
    icon: 'medical-services',
    color: '#8b5cf6',
    count: mockResources.filter((r) => r.category === 'treatments').length,
  },
  {
    id: 'cat-4',
    name: 'Cuidados Post-Tratamiento',
    icon: 'favorite',
    color: '#ef4444',
    count: mockResources.filter((r) => r.category === 'post-care').length,
  },
  {
    id: 'cat-5',
    name: 'Nutrición',
    icon: 'restaurant',
    color: '#f59e0b',
    count: mockResources.filter((r) => r.category === 'nutrition').length,
  },
  {
    id: 'cat-6',
    name: 'Odontopediatría',
    icon: 'child-care',
    color: '#ec4899',
    count: mockResources.filter((r) => r.category === 'pediatric').length,
  },
  {
    id: 'cat-7',
    name: 'Emergencias',
    icon: 'emergency',
    color: '#dc2626',
    count: mockResources.filter((r) => r.category === 'emergency').length,
  },
]

