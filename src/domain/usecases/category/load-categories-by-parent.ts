import { CategoryModel } from '@/domain/entities/category'

export interface LoadCategoriesByParent {
  loadByParent: (categoryParentId: string, page?: number) => Promise<CategoryModel[]>
}
