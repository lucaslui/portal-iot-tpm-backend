import { AccountModel } from '@/domain/entities/account'

export interface LoadAccountByIdRepository {
  loadById: (accountId: string) => Promise<AccountModel>
}
