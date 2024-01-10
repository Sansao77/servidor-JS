"use client";

import { useState, useEffect, useContext } from "react";
import { api } from "../../services/api";
import {
  Input,
  Button,
  Card,
  CardBody,
  Skeleton,
  Image,
  CardFooter,
} from "@nextui-org/react";
import { BsCart3 } from "react-icons/bs";
import { useShoppingCartDispatch } from "@/contexts/ShoppingCartContext";

export interface Product {
  id: number;
  title: string;
  price: number;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [itens, setItens] = useState<Product[]>([]);
  const [textInput, setTextInput] = useState("");
  const dispatch = useShoppingCartDispatch();

  useEffect(() => {
    loadItems();
  }, []); // O array defini quais efeitos devem ser feitos para atualizar a página

  useEffect(() => {
    console.log("O código está passando por aqui");
  }, [textInput]);

  /**
   * Esta função serve para carregar a página depois de suas alterações, sendo a adição
   */
  function loadItems() {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await api.get("/produtos");
        console.log(response);
        setItens(response.data);
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    }, 2000);
  }

  return (
    <div className="px-80 flex flex-col gap-5 mt-5">
      <p>numero de produtos: </p>
      <div className="flex items-center gap-2">
        <Input
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Digite o seu texto aqui..."
        />
        <Button color="primary">Enviar</Button>
      </div>

      {/* {loading && <p>Carregando...</p>} */}

      {loading && (
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
          </Skeleton>
        </div>
      )}

      <ul className="gap-6 grid grid-cols-[repeat(auto-fill,max(150px))] justify-between">
        {itens.map((item) => (
          <li key={item.id}>
            <Card
              shadow="sm"
              isPressable
              onPress={() => {
                console.log("item pressionado");
              }}
            >
              <CardBody className="overflow-visible p-0">
                <Image
                  shadow="sm"
                  radius="lg"
                  alt={item.title}
                  className="object-cover h-[140px] w-[200px]"
                  src="https://picsum.photos/400/300"
                />
              </CardBody>
              <CardFooter className="text-medium justify-between">
                <b>{item.title}</b>
                <p className=" mx-2 text-default-500">{item.price}</p>
                <Button
                  onClick={() => {
                    dispatch({
                      type: "added",
                      ...item,
                    });
                  }}
                  isIconOnly
                  startContent={<BsCart3 />}
                >
                  {/*Comprar*/}
                </Button>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
