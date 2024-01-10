"use client";

import { Product } from "@/app/page";
import { Dispatch, createContext, useContext, useReducer } from "react";

//Permite compartilhar informações entre componentes não conectados
const ShoppingCartContext = createContext<Product[]>([]);
const ShoppingCartDispatchContext = createContext<Dispatch<Action>>(() => {});

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
  const [products, dispatch] = useReducer(shoppingCartReducer, initialData);
  return (
    <ShoppingCartContext.Provider value={products}>
      <ShoppingCartDispatchContext.Provider value={dispatch}>
        {children}
      </ShoppingCartDispatchContext.Provider>
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function useShoppingCartDispatch() {
  return useContext(ShoppingCartDispatchContext);
}

interface Action {
  type: "added"; //"adicionado"
  id: number;
  title: string;
  price: number;
}

function shoppingCartReducer(products: Product[], action: Action): Product[] {
  switch (action.type) {
    case "added":
      return [
        ...products,
        { id: action.id, title: action.title, price: action.price },
      ];

    default:
      throw Error("Unkwon action: ", action.type);
  }
}
