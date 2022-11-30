import { instance } from ".";
import { IProduct } from "../action";

export const productApi = {
  getProducts: (signal: any) => {
    return instance.get<IProduct[]>("/product", {
      signal,
    });
  },
};
