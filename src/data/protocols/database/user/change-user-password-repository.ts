export interface ChangeUserPasswordRepository {
  changePassword: (userId: string, hashedPassword: string) => Promise<void>
}
