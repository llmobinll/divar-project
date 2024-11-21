export interface AddCategory {
  name: string;
  slug: string;
  icon: string;
}
export interface CategoryResponse {
  _id: string;
  name: string;
  icon: string;
  slug: string;
  parents: [];
  children: [];
}
