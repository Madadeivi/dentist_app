export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderAvatar?: string
  content: string
  type: 'text' | 'image' | 'file'
  imageUrl?: string
  fileUrl?: string
  fileName?: string
  timestamp: Date
  read: boolean
}

export interface Conversation {
  id: string
  participantId: string
  participantName: string
  participantAvatar?: string
  participantRole: 'dentist' | 'patient'
  lastMessage?: Message
  unreadCount: number
  updatedAt: Date
  createdAt: Date
}

export interface ConversationWithMessages extends Conversation {
  messages: Message[]
}

