export interface AuthenticationModel {
  email: string
  password: string
}

export type AuthenticationViewModel = {
  accessToken: string
  userId: string
}

export interface Authentication {
  auth: (authentication: AuthenticationModel) => Promise<AuthenticationViewModel>
}
