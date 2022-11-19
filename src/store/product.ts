import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { productListMapper, productMapper } from "../helpers/mapper";
import {
  CommentRequestBody,
  ProductDTO,
  ProductDetailRequestBody,
  ProductListDTO,
} from "../models/productModel";
import API from "../network/APIs";

export type IProductState = {
  productList: ProductListDTO;
  product: ProductDTO | null;
  loading: boolean;
  error: any;
};

const initialState: IProductState = {
  productList: [],
  product: null,
  loading: false,
  error: null,
};

export const GetAllProductsRequest = createAsyncThunk(
  "product/getAllProduct",
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.GetAllProducts();
      return response?.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const GetProductDetailRequest = createAsyncThunk(
  "product/getProductDetail",
  async (arg: ProductDetailRequestBody, { rejectWithValue }) => {
    try {
      const response = await API.GetProductDetail({ ...arg });
      return response?.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

export const AddComment = createAsyncThunk(
  "comment/add",
  async (arg: CommentRequestBody, { rejectWithValue }) => {
    try {
      const response = await API.SaveComment({ ...arg });
      return response?.data;
    } catch (err: any) {
      if (!err.response) {
        throw err;
      }
      return rejectWithValue(err.response);
    }
  }
);

const slice = createSlice({
  name: "product",
  initialState: { ...initialState },
  reducers: {
    clearProductDetail: (state, action) => {
      state.product = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(GetAllProductsRequest.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(GetAllProductsRequest.fulfilled, (state, { payload }) => {
      productListMapper(payload);
      state.productList = productListMapper(payload);
      state.error = null;
      state.loading = false;
    });

    builder.addCase(
      GetAllProductsRequest.rejected,
      (state, { payload }: any) => {
        state.error = payload.data.message;
        state.loading = false;
      }
    );

    builder.addCase(GetProductDetailRequest.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(GetProductDetailRequest.fulfilled, (state, { payload }) => {
      state.product = productMapper(payload);
      state.error = null;
      state.loading = false;
    });

    builder.addCase(
      GetProductDetailRequest.rejected,
      (state, { payload }: any) => {
        state.error = payload.data.message;
        state.loading = false;
      }
    );
  },
});

export default slice.reducer;

export const { clearProductDetail } = slice.actions;
