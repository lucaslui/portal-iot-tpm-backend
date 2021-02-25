export interface ChangeUserPasswordRepository {
  changePassword: (hashedPassword: string) => Promise<boolean>
}
