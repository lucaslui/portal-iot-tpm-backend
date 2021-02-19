import { ArticleModel } from '@/domain/entities/article'

export interface LoadArticles {
  load: (page: number) => Promise<ArticleModel[]>
}
