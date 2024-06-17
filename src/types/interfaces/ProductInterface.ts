interface Category {
  id: number;
  metaTitle: string;
  metaKeywords: string;
  featured: boolean;
  featuredInNavBar: boolean;
  metaDescription: string;
  name: string;
  description: string | null; // assuming description can be null
}
export interface Product {
  id: number;
  slug: string;
  region: string;
  type: string;
  deliveryTime: string;
  createdAt: string;
  updatedAt: string | null;
  createdBy: string;
  updatedBy: string | null;
  isActive: boolean;
  name: string;
  subName: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  image: string;
  offerTitle: string;
  featured: boolean;
  featuredInNavbar: boolean;
  backgorundImage: string; // Note: There's a typo in the key name "backgorundImage", should be "backgroundImage"
  maximumRetailPrice: number;
  sellingPrice: number;
  variations: ProductVariation[];
  categories: Category[];
  faqs: FAQItem[];
  dynamicVariables: DynamicVariable[];
}
export interface FAQItem {
  id: number;
  title: string;
  summary: string;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  productID: number;
}
export interface ProductVariation {
  id: number;
  product: number;
  name: string;
  sellingPrice: number;
  maximumRetailPrice: number;
  costPrice: number;
}
export enum InputTypes {
  TEXT = 'text', // eslint-disable-line no-unused-vars
  NUMBER = 'number', // eslint-disable-line no-unused-vars
  PASSWORD = 'password', // eslint-disable-line no-unused-vars
  EMAIL = 'email', // eslint-disable-line no-unused-vars
  CHECKBOX = 'checkbox',
}

export interface DynamicVariable {
  id: number;
  title: string;
  label: string;
  hintText: string;
  type: InputTypes;
  required: boolean;
}

export interface FeaturedCategory {
  id: number;
  metaTitle: string;
  metaKeywords: string;
  featured: boolean;
  featuredInNavBar: boolean;
  metaDescription: string;
  name: string;
  description: string | null;
  products: Product[];
}
