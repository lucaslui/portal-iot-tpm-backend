export interface ChangeUserPassword {
  changePassword: (userId: string, oldPassword: string, newPassword: string) => Promise<boolean>
}
