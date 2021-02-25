export interface EditUserPassword {
  edit: (userId: string, oldPassword: string, newPassword: string) => Promise<boolean>
}
