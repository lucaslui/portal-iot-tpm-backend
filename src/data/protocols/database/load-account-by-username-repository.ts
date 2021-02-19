import { AccountModel } from '@/domain/entities/account'

export interface LoadAccountByEmailRepository {
  loadByEmail: (username: string) => Promise<AccountModel>
}
