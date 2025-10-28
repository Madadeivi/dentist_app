import { mockUsers } from '@/mock/users.mock'
import { simulateDelay } from '@/shared/utils/simulateDelay'
import {
  LoginCredentials,
  RegisterDentistData,
  RegisterPatientData,
  AuthResponse,
  User,
} from '@/shared/types'

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await simulateDelay()

    const user = mockUsers.find((u) => u.email === credentials.email)

    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    if (credentials.password.length < 6) {
      throw new Error('Contraseña incorrecta')
    }

    return {
      user,
      accessToken: `mock-token-${user.id}-${Date.now()}`,
      refreshToken: `mock-refresh-${user.id}-${Date.now()}`,
      expiresIn: 3600,
    }
  }

  async register(
    data: RegisterDentistData | RegisterPatientData,
    type: 'dentist' | 'patient'
  ): Promise<AuthResponse> {
    await simulateDelay()

    const existingUser = mockUsers.find((u) => u.email === data.email)
    if (existingUser) {
      throw new Error('El email ya está registrado')
    }

    const newUser: User = {
      id: `user-${Date.now()}`,
      email: data.email,
      type,
      profile:
        type === 'dentist'
          ? {
              name: (data as RegisterDentistData).name,
              lastName: (data as RegisterDentistData).lastName,
              phone: (data as RegisterDentistData).phone,
              licenseNumber: (data as RegisterDentistData).licenseNumber,
              specialization: (data as RegisterDentistData).specialization,
            }
          : {
              name: (data as RegisterPatientData).name,
              lastName: (data as RegisterPatientData).lastName,
              phone: (data as RegisterPatientData).phone,
              dateOfBirth: (data as RegisterPatientData).dateOfBirth,
              dni: (data as RegisterPatientData).dni,
            },
      createdAt: new Date(),
      updatedAt: new Date(),
      isVerified: false,
      isActive: true,
    }

    mockUsers.push(newUser)

    return {
      user: newUser,
      accessToken: `mock-token-${newUser.id}-${Date.now()}`,
      refreshToken: `mock-refresh-${newUser.id}-${Date.now()}`,
      expiresIn: 3600,
    }
  }

  async verifyEmail(code: string): Promise<boolean> {
    await simulateDelay(500, 1000)
    return code.length === 6
  }

  async resetPassword(email: string): Promise<void> {
    await simulateDelay()
    const user = mockUsers.find((u) => u.email === email)
    if (!user) {
      throw new Error('Email no encontrado')
    }
  }

  async logout(): Promise<void> {
    await simulateDelay(200, 400)
  }
}

export const authService = new AuthService()

