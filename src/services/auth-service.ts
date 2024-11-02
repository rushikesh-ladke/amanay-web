// services/auth-service.ts

import { LoginInput, LoginResponse, SignupInput, SignupResponse } from '@/types/auth';

export const authService = {
  async login(input: LoginInput): Promise<LoginResponse> {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return response.json();
  },

  async signup(input: SignupInput): Promise<SignupResponse> {
    const response = await fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error('Signup failed');
    }

    return response.json();
  },
};