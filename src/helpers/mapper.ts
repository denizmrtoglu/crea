import { ProductDTO } from "../models/productModel";

export const productMapper = (item: ProductDTO) => {
  return {
    ...item,
    rating:
      item.comments?.length > 0
        ? item.comments.reduce((a, b) => {
            return a + b.rating;
          }, 0) / item.comments.length
        : 0,
  };
};

export const productListMapper = (data: ProductDTO[]) => {
  return data.map((item) => {
    return productMapper(item);
  });
};
