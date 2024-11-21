export interface CategoryResponse {
  _id: string;
  name: string;
  icon: string;
  slug: string;
  parents: [];
  children: [];
}

export interface AddCategory {
  name: string;
  slug: string;
  icon: string;
}

export interface DeleteCategory {
  _id: string;
}
