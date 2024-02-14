import { UserProfileModel } from '@/domain/entities/user'

export type UpdateUserRepositoryParams = {
  id: string
  name: string
  email: string
  profile: UserProfileModel
}

export interface UpdateUserRepository {
  update: (params: UpdateUserRepositoryParams) => Promise<void>
}
