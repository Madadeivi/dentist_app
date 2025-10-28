import { User } from '@/shared/types'

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'dr.martinez@dentalflow.com',
    type: 'dentist',
    profile: {
      name: 'Elena',
      lastName: 'Martínez',
      phone: '+34 666 123 456',
      avatar: 'https://i.pravatar.cc/150?img=1',
      licenseNumber: 'DEN12345',
      specialization: ['Ortodoncia', 'Endodoncia'],
      clinicName: 'Clínica Dental Martínez',
      bio: 'Especialista en ortodoncia con 10 años de experiencia',
    },
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date('2024-10-01'),
    isVerified: true,
    isActive: true,
  },
  {
    id: '2',
    email: 'paciente@example.com',
    type: 'patient',
    profile: {
      name: 'Carlos',
      lastName: 'García',
      phone: '+34 666 789 012',
      avatar: 'https://i.pravatar.cc/150?img=12',
      dateOfBirth: new Date('1990-05-20'),
      dni: '12345678A',
      bloodType: 'A+' as const,
      allergies: ['Penicilina'],
      medicalConditions: [],
    },
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-10-20'),
    isVerified: true,
    isActive: true,
  },
]

