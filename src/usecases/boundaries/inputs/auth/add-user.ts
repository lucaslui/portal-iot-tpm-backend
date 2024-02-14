export type AddUserParamsModel = {
  name: string
  email: string
  password: string
}

export interface AddUser {
  add (params: AddUserParamsModel): Promise<boolean>
}
