export interface LoadCategoriesTree {
  load: () => Promise<CategoriesTreeModel[]>
}

export type CategoriesTreeModel = {
  id: string
  name: string
  description: string
  imageUrl?: string
  categoryParentId?: string
  children?: CategoriesTreeModel[]
}
