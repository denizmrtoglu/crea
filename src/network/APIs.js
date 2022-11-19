/* eslint-disable import/no-anonymous-default-export */
import { axiosInstance } from "./index";
import Cookie from "js-cookie";

const handlerEnabled = false;

const Login = async (data) => {
  try {
    const response = await axiosInstance.post(`auth/login`, data, {
      handlerEnabled,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const GetAllProducts = async () => {
  const response = await axiosInstance.get(`products?_embed=comments`, {
    handlerEnabled,
    headers: { Authorization: `Bearer ${Cookie.get("jwt")}` },
  });
  return response;
};

const GetProductDetail = async (data) => {
  try {
    const response = await axiosInstance.get(
      `/products/${data.id}?_embed=comments`,
      {
        handlerEnabled,
        headers: { Authorization: `Bearer ${Cookie.get("jwt")}` },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

const SaveComment = async (data) => {
  try {
    const response = await axiosInstance.post(`/comment/add`, data, {
      handlerEnabled,
      headers: { Authorization: `Bearer ${Cookie.get("jwt")}` },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export default {
  Login,
  GetAllProducts,
  GetProductDetail,
  SaveComment,
};
