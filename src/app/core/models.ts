export interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

export interface Category {
  id: number;
  name: string;
  image: string;
}

export interface Product {
  id: number;
  title: string;
  slug?: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export interface CanComponentDeactivate {
  canDeactivate: () => boolean;
}
