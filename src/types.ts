interface Author {
  username: string;
  image: string;
}

export interface Article {
  title: string;
  description: string;
  createdAt: string;
  author: Author;
  favoritesCount: number;
  slug: string;
}
