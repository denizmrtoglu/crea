import React from "react";
import { Image } from "antd";
import "./table.css";

type Props = {
  url: string;
};

const TableImageRow: React.FC<Props> = ({ url }) => {
  return (
    <div className="image-row">
      <Image height={60} src={url} preview={false} />
    </div>
  );
};

export default TableImageRow;
