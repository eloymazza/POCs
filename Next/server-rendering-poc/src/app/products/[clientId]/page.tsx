import { getAllClientsId, getClientProducts } from "@/app/services/products";
import React from "react";

type ProductsProps = {
  params: {
    clientId: string;
  };
};

export async function generateStaticParams() {
  const { data: allClientIds } = await getAllClientsId();
  return allClientIds;
}

const Products = async ({ params }: ProductsProps) => {
  const { clientId } = params;
  const clientProducts = await getClientProducts(clientId);

  if (clientProducts.error) {
    return <div>Error: {clientProducts.error}</div>;
  }

  const { clientID, products } = clientProducts.data;
  return (
    <div>
      <h1>Products for client: {clientID}</h1>
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>{product.price}</p>
            <p>{product.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
