import { CategoryModel } from '@/domain/entities/category'

export interface LoadCategories {
  load: (categoryParentId?: string) => Promise<CategoryModel[]>
}
