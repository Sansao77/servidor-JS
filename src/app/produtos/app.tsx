"use client";

import { useShoppingCart } from "@/contexts/ShoppingCartContext";

export function App() {
  const products = useShoppingCart();

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
}
