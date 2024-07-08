export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  stock: number;
  category: string;
  subcategory: string;
  tags: string[];
  suggestedQueries: string[];
};

export type ClientIds = string[];
