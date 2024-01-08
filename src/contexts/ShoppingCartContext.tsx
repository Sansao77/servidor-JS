"use client";

import { Product } from "@/app/page";
import { createContext, useContext } from "react";
//Permite compartilhar informações entre componentes não conectados
export const ShoppingCartContext = createContext<Product[]>([]);

const initialData: Product[] = [
  { id: 1, title: "Banana", price: 10 },
  { id: 2, title: "Uva", price: 5 },
  { id: 3, title: "Banana", price: 10 },
];

export function ShoppingCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ShoppingCartContext.Provider value={initialData}>
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}
