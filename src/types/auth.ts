// types/auth.ts

export interface LoginInput {
    email: string;
    password: string;
  }
  
  export interface SignupInput extends LoginInput {
    firstName: string;
    lastName: string;
  }
  
  export interface User {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface LoginResponse {
    access_token: string;
    user: User;
  }
  
  export type SignupResponse = User