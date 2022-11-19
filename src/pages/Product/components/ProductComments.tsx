import React from "react";
import { Avatar, Button, Card, Form, Input, List } from "antd";
import "../product.css";
import ReviewScore from "../../../components/ReviewScore/ReviewScore";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../App";
import { AddComment } from "../../../store/product";
import { CommentFormProps, ProductDTO } from "../../../models/productModel";
const { TextArea } = Input;

type Props = {
  product: ProductDTO;
  callback: () => void;
};

const ProductComments: React.FC<Props> = ({ product, callback }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { comments, id } = product;
  const [form] = Form.useForm();
  const ratingValue = Form.useWatch("rating", form);

  const onHandleSave = (values: CommentFormProps) => {
    dispatch(
      AddComment({
        ...values,
        productId: id,
      })
    ).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        callback();
        form.resetFields();
      }
    });
  };

  return (
    <>
      <Card>
        <Avatar src="https://joeschmoe.io/api/v1/random" />
        <Form
          name="normal_login"
          form={form}
          className="login-form"
          initialValues={{
            rating: 0,
            body: "",
          }}
          onFinish={(values) => onHandleSave(values)}
        >
          <Form.Item name="rating">
            <ReviewScore
              score={ratingValue || 0}
              onChangeRating={(value) => form.setFieldsValue({ rating: value })}
            />
          </Form.Item>
          <Form.Item name="body">
            <TextArea placeholder="Comment" size="large" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Send
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card>
        <List
          itemLayout="horizontal"
          dataSource={comments}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={
                  <>
                    <p>{item.user.username}</p>
                    <ReviewScore score={item.rating} />
                  </>
                }
                description={item.body}
              />
            </List.Item>
          )}
        />
      </Card>
    </>
  );
};

export default ProductComments;
