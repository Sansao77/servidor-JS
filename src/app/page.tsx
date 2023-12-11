"use client"
import {useState, useEffect} from 'react';
import { api } from '../../services/api';

interface Product{
  id: number;
  nome: string;
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

  function handleClickFilter(){
    // filtra todos os elementos que tem index impar (só esses ficam guardados no array)
    setItens(itens.filter(n=>(n.id%2) !== 0));
    console.log(itens);
  }

  useEffect(()=>{
    loadItems();
  }, []);// O array defini quais efeitos devem ser feitos para atualizar a página

  useEffect(()=>{
    console.log("O código está passando por aqui");
  }, []);

  /**
   * Esta função serve para carregar a página depois de suas alterações, sendo a adição
   */
  async function loadItems(){
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
   * 
   */
  async function handleCLickAddItem(){
    console.log(textInput);
    const data = {nome: textInput};
    loadItems();
    try{
      if(textInput === "") throw Error;
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
   * Essa função deleta o elemento ao lado dele e retorna a lista sem o elemento
   * @param itemId representa o Id do elemento que sera deletado
   */
  function handleClickDeleteItem(itemId:number){
    console.log("Deletar elemento de ID: ", itemId);
    setTimeout(async() => {
      try{
        const response = await api.delete(`/produtos/${itemId}`);
        console.log(response);
      }
      catch(error){
        console.error("Error: ", error);
      }
      finally{
        setLoading(false);
      }
    }, 1000);
    loadItems();
  }

  return (
   <main>
      <div style={{marginBottom: 10}}>
        {/**Esse 'onChange' permite pegar o texto do input*/}
        <input onChange={e=>setTextInput(e.target.value)} type="text" placeholder='Digite seu texto aqui'/>
        <button onClick={handleCLickAddItem}>Enviar</button>
      </div>

      <span>{loading && "Carregando..."}</span>

      {/*<button type='button' onClick={handleClick}>
        Buscar informações no servidor </button>*/}

      <button type='button' onClick={handleClickFilter}>
        Filtrar os elementos
      </button>

      <ul>
      {itens.map(item =>(
        <li key={item.id}> 
        {item.nome}
        <button style={{marginLeft: 10}}onClick={()=>{handleClickDeleteItem(item.id)}}> Delete </button>
        </li>
      ))}
      </ul>
   </main>
  )
}