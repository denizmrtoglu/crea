import React from "react";
import { Table as AntTable } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useNavigate } from "react-router-dom";
import ReviewScore from "../ReviewScore/ReviewScore";
import TableImageRow from "./TableImageRow";
import { ProductDTO, ProductListDTO } from "../../models/productModel";

interface DataType {
  data: ProductListDTO;
}

const columns: ColumnsType<ProductDTO> = [
  {
    title: "Product",
    dataIndex: "thumbnail",
    width: 120,
    render: (item) => <TableImageRow url={item} />,
  },
  {
    title: "Name",
    dataIndex: "title",
  },
  {
    title: "Price",
    dataIndex: "price",
  },
  {
    title: "Score",
    dataIndex: "rating",
    render: (rating) => {
      return <ReviewScore score={rating} />;
    },
  },
];

const Table: React.FC<DataType> = ({ data }) => {
  const navigate = useNavigate();
  return (
    <AntTable
      columns={columns}
      dataSource={data}
      rowKey="id"
      onRow={(record, i) => {
        return {
          onClick: (e) => {
            navigate("/product", { state: { id: record.id } });
          },
        };
      }}
    />
  );
};

export default Table;
