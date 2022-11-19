import React from "react";
import { Card, Image } from "antd";
import "../product.css";
import ReviewScore from "../../../components/ReviewScore/ReviewScore";
import { parseDate } from "../../../helpers/utils";
import { ProductDTO } from "../../../models/productModel";

type Props = {
  product: ProductDTO;
};

const ProductInformation: React.FC<Props> = ({ product }) => {
  const { images, title, description, price, rating, arrivalDate } = product;
  return (
    <div className="row">
      <Image width={400} style={{ maxHeight: 400 }} src={images[0]} />
      <div className="product-info">
        <Card title={title}>
          <p>{description}</p>
          <div className="row price-row">
            <h2>{price}₺</h2>
            <ReviewScore score={rating} />
          </div>
          <p>Arrival Date: {parseDate(arrivalDate)}</p>
        </Card>
      </div>
    </div>
  );
};

export default ProductInformation;
