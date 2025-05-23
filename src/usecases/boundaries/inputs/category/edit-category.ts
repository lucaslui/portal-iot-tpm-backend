export interface EditCategory {
  edit: (categoryId: string, category: EditCategoryModel) => Promise<boolean>
}

export interface EditCategoryModel {
  name: string
  description: string
  imageUrl?: string
  categoryParentId?: string
}
