import { CategoryModel } from '@/domain/entities/category'

export interface LoadCategoriesByParentRepository {
  loadByParent: (categoryParentId: string, page?: number) => Promise<CategoryModel[]>
}
