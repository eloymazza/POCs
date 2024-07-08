import { ClientIds, Product } from "@/types/types";

type ClientProducts = {
  clientID: number;
  products: Product[];
};

type ProductResponse = {
  data: ClientProducts;
  message: string;
  code: number;
  error: string | null;
};

export const getClientProducts = async (clientId: string) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products?clientid=${clientId}`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const productResponse: ProductResponse = await response.json();
    return productResponse;
  } catch (error) {
    return {
      data: {
        clientID: 0,
        products: [],
      },
      message: "",
      code: 500,
      error: "Internal Server Error",
    };
  }
};

type AllClientroductsResponse = {
  data: ClientIds;
  message: string;
  code: number;
  error: string | null;
};

export const getAllClientsId = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/products/clientids`,
      {
        headers: {
          "content-type": "application/json",
        },
      }
    );

    const clientIds: AllClientroductsResponse = await response.json();
    return clientIds;
  } catch (error) {
    return {
      data: [],
      message: "",
      code: 500,
      error: "Internal Server Error",
    };
  }
};
