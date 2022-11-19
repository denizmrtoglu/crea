export type ProductDetailRequestBody = {
  id: number;
};

export interface CommentFormProps {
  rating: number;
  body: string;
}

export interface CommentRequestBody extends CommentFormProps {
  productId: number;
}

export type CommentDTO = {
  rating: number;
  body: string;
  productId: number;
  user: {
    username: string;
  };
};

export interface ProductDTO {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  deliveryPrice: number;
  stock: number;
  brand: string;
  arrivalDate: string;
  rating: number;
  category: string;
  thumbnail: string;
  images: string[];
  comments: CommentDTO[];
}

export type ProductListDTO = ProductDTO[];
