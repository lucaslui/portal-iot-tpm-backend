import { CategoryModel } from '@/domain/entities/category'

export interface LoadCategories {
  load: () => Promise<CategoryModel[]>
}
