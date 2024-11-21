export interface Post {
  _id: number;
  createdAt: string;
  images: [];
  options: {
    title: string;
    content: string;
    city: string;
    price: number;
  };
}

interface ApiResponse {
  posts: Post[];
}
