import React from "react";
import { Card } from "antd";
import "../product.css";
import { ProductDTO } from "../../../models/productModel";

type Props = {
  product: ProductDTO;
};

const ProductSummary: React.FC<Props> = ({ product }) => {
  const { category, brand, stock } = product;
  return (
    <Card>
      <p>Brand: {brand}</p>
      <p>Category: {category}</p>
      <p>Stock Count: {stock}</p>
    </Card>
  );
};

export default ProductSummary;
