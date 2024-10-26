export interface Author {
  username: string;
  image: string;
  bio: string;
  following: boolean;
  token: string;
}

export interface Article {
  title: string;
  body: string;
  description: string;
  createdAt: string;
  author: Author;
  favoritesCount: number;
  slug: string;
  following: boolean;
}
