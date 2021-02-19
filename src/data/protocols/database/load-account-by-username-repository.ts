import { AccountModel } from '@/domain/entities/account'

export interface LoadAccountByUsernameRepository {
  loadByUsername: (username: string) => Promise<AccountModel>
}
