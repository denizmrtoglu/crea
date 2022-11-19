import { IAuthState } from "../store/auth";
import { IProductState } from "../store/product";

export interface IStore {
  product: IProductState;
  auth: IAuthState;
}
