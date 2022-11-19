/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "antd/dist/antd.min.css";
import "./home.css";
import { AppDispatch } from "../../App";
import { GetAllProductsRequest } from "../../store/product";
import Table from "../../components/Table/Table";
import { IStore } from "../../models/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { productList } = useSelector((state: IStore) => state.product);

  useEffect(() => {
    dispatch(GetAllProductsRequest());
  }, []);

  return <Table data={productList} />;
}
