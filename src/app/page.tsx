"use client"
import {useState, useEffect} from 'react';
import { api } from '../../services/api';
import { Button, Card, CardBody, Skeleton, Image, CardFooter } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

interface Product{
  id: number;
  title: string;
  price: number;
  isEditing: boolean;
}

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [itens, setItens] = useState<Product[]>([]);
  const [textInput, setTextInput] = useState('');

  /*async function handleClick(){
    const response = await api.get("/produtos");
    console.log(response);
    setItens(response.data);

    //const response = await fetch("http://192.168.68.153:3000/produtos");
    //const produtos = await response.json();
  }*/

  /*function handleClickFilter(){
    // filtra todos os elementos que tem index impar (só esses ficam guardados no array)
    setItens(itens.filter(n=>(n.id%2) !== 0));
    console.log(itens)Update*/

  useEffect(()=>{
    loadItems();
  }, []);// O array defini quais efeitos devem ser feitos para atualizar a página

  useEffect(()=>{
    console.log("O código está passando por aqui");
  }, [textInput]);

  /**
   * Esta função serve para carregar a página depois de suas alterações, sendo a adição
   */
  function loadItems(){
    setLoading(true);
    setTimeout(async() => {
      try{
        const response = await api.get("/produtos");
        console.log(response);
        setItens(response.data);
      }
      catch(error){
        console.error("Error: ", error);
      }
      finally{
        setLoading(false);
      }
    }, 2000);
  }
  /**
   * Essa função serve para adicionar um elemento novo na lista do servidor web
   */
  async function handleCLickAddItem(){
    console.log(textInput);
    const data: Omit<Product, "id"> = {title: textInput, isEditing: false, price: 0};
    setTextInput('');
    loadItems();
    try{
      if(textInput === '') throw Error;
      await api.post("/produtos", data);
    }
    catch(error){
      console.error("Error: ", error);
    }
    /*try{
      const response = await fetch("http://192.168.68.153:3000/produtos",{
        method: "Post", //or Put
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log("Sucess: ", result);
    }
    catch(error){
      console.error("Error: ", error);
      alert("Ocorreu um erro");
    }*/
  }
  /**
   * Essa função deleta o elemento ao lado dele e o retira da lista do servidor
   * @param itemId representa o Id do elemento que sera deletado
   */
  async function handleClickDeleteItem(itemId:number){
    console.log("Deletar elemento de ID: ", itemId);
    
    try{
      const response = await api.delete(`/produtos/${itemId}`);
      console.log(response);
      // Serve para filtrar o elemento da tela do usuário
      const filteredItens = itens.filter(item=>item.id !== itemId);
      setItens(filteredItens);
    }
    catch(error){
      console.error("Error: ", error);
    }
  }

  function handleClickEditItem(itemId:number){
    console.log("Editar elemento de Id:", itemId);

    const changedItens = itens.map(item=>{
      // Se o elemento tiver o Id que foi mensionado,  então ele deve alterar o booleano do isEditing
      if(item.id === itemId) return {...item, isEditing:true};
      return item;
    });
    setItens(changedItens);
  }

  async function handleClickUpdateItem(itemId:number){
    console.log("Editar elemento de Id:", itemId);

    itens.map(async item=>{
      if(item.id === itemId) {
        try{
          if(item.title === '') throw Error;
          //Permite atualizar o elemento na lista
          await api.put(`/produtos/${itemId}`,{nome: item.title});
        }
        catch(error){
          console.error("Error: ", error)
        }
      }
    });

    const changedItens = itens.map(item =>{
      // Se o elemento tiver o Id que foi mensionado,  então ele deve alterar o booleano do isEditing
      if(item.id === itemId) {
        return {...item, isEditing:false}
      };
      return item;
    });
    setItens(changedItens);
  }

  function handleChangeItem(itemId: number, textValue: string){
    const changedItens = itens.map(item =>{
      if(item.id === itemId) return {...item, nome:textValue}
      
      return item;
    });

    setItens(changedItens);
  }

  return (
    <div className="px-80 flex flex-col gap-5 mt-5">

      <div className="flex items-center gap-2">
        <Input
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          placeholder="Digite o seu texto aqui..."
        />
        <Button color="primary" onClick={handleCLickAddItem}>
          Enviar
        </Button>
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

      <ul className='gap-6 grid grid-cols-[repeat(auto-fill,min(200px))] justify-between'>
        {itens.map((item) => (
          <li key={item.id}>
            <Card
            shadow='sm'
            isPressable
            onPress={()=>{console.log('item pressionado')}}>
              <CardBody className='overflow-visible p-0'>
                <Image 
                shadow='sm'
                radius='lg'
                width='100%'
                alt={item.title}
                className='object-cover h-[140px] w-[200px]'
                src='https://picsum.photos/seed/picsum/200/300'
                />

              </CardBody>
              <CardFooter className='text-small justify-between'>
                <b>{item.title}</b>
                <p className='text-default-500'>{item.price}</p>
              </CardFooter>
            </Card>
          </li>
        ))}
      </ul>
    </div>
);
}