import { CategoryModel } from '@/domain/entities/category'

export interface LoadCategories {
  load: (page?: number) => Promise<CategoryModel[]>
}
