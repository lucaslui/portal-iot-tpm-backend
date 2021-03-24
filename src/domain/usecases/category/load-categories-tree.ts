export interface LoadCategoriesTree {
  load: (query?: LoadCategoriesTreeQueryModel) => Promise<CategoriesTreeModel[]>
}

export type LoadCategoriesTreeQueryModel = {
  categoryId?: string
}

export type CategoriesTreeModel = {
  id: string
  name: string
  description: string
  imageUrl?: string
  categoryParentId?: string
  children?: CategoriesTreeModel[]
}
