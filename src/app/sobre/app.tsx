"use client"

import { ProductContext } from "@/contexts/ProductContext";
import React from "react";

interface AppProps{
    children: React.ReactNode;
}

export function App({children}:AppProps){
    return(
        <ProductContext.Provider value={55}>{children}</ProductContext.Provider>
    );
}