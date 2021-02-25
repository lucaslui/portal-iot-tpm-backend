export interface ChangeUserPassword {
  edit: (userId: string, oldPassword: string, newPassword: string) => Promise<boolean>
}
