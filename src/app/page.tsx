"use client"
import {useState} from 'react';
import { api } from '../../services/api';

const initialItems = [
  {id: 1, nome: "Maça"},
  {id: 2, nome: "Uva"},
]

export default function Home() {
  const [itens, setItems] = useState(initialItems);
  const [textInput, setTextInput] = useState('');

  async function handleClick(){
    const response = await api.get("/produtos");
    console.log(response);
    setItems(response.data);

    //const response = await fetch("http://192.168.68.154:3000/produtos");
    //const produtos = await response.json();
  }

  function handleClickFilter(){
    // filtra todos os elementos que tem index impar (só esses ficam guardados no array)
    setItems(itens.filter(n=>(n.id-1)%2 !== 0));
    console.log(itens);
  }

  async function handleCLickItem(){
    console.log(textInput);
    const data = {nome: textInput};

    try{
      const response = await fetch("http://192.168.68.154:3000/produtos",{
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
    }
  }

  function handleClickDeleteItem(){
    console.log(textInput);
    setItems(itens.filter(x => x.nome !== textInput));
  }

  return (
   <main>
      <div style={{marginBottom: 10}}>
        {/**Esse 'onChange' permite pegar*/}
        <input onChange={(e)=> setTextInput(e.target.value)} type="text" placeholder='Digite seu texto aqui'/>
        <button onClick={handleCLickItem}>Enviar</button>
        <button onClick={handleClickDeleteItem}>Deletar</button>
      </div>

      <button type='button' onClick={handleClick}>
        Buscar informações no servidor
      </button>
      <button type='button' onClick={handleClickFilter}>
        Filtrar os elementos
      </button>

      <ul>
      {itens.map(item =>(
        <li key={item.id}> {item.nome}</li>
      ))}
      </ul>
   </main>
  )
}
