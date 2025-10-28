export type ResourceType = 'article' | 'video' | 'guide' | 'infographic' | 'tip'

export type ResourceCategory = 
  | 'hygiene'
  | 'prevention'
  | 'treatments'
  | 'post-care'
  | 'nutrition'
  | 'pediatric'
  | 'emergency'

export interface Resource {
  id: string
  type: ResourceType
  category: ResourceCategory
  title: string
  description: string
  content?: string
  imageUrl?: string
  videoUrl?: string
  thumbnailUrl?: string
  duration?: number
  readTime?: number
  author?: string
  publishedAt: Date
  tags: string[]
  views: number
  likes: number
  isFavorite?: boolean
}

export interface ResourceCategory {
  id: string
  name: string
  icon: string
  color: string
  count: number
}

