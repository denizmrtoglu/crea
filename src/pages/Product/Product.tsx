/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { Tabs } from "antd";
import {
  clearProductDetail,
  GetProductDetailRequest,
} from "../../store/product";
import { AppDispatch } from "../../App";
import "./product.css";
import {
  ProductComments,
  ProductInformation,
  ProductSummary,
} from "./components";
import { IStore } from "../../models/store";

const Product: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { state } = useLocation();
  const { product } = useSelector((state: IStore) => state.product);

  const getProductDetail = () => {
    dispatch(GetProductDetailRequest({ id: state?.id }));
  };

  useEffect(() => {
    state?.id && getProductDetail();
  }, [state?.id]);

  useEffect(() => {
    return () => {
      dispatch(clearProductDetail(null));
    };
  }, []);

  return !state?.id ? (
    <Navigate to="/" />
  ) : !!product ? (
    <>
      <ProductInformation product={product} />
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Product Information" key="1">
          <ProductSummary product={product} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Comments" key="2">
          <ProductComments
            product={product}
            callback={() => getProductDetail()}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  ) : null;
};

export default Product;
