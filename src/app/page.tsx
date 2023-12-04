"use client"
import {useState} from 'react';

const initialItems = [
  {id: 1, nome: "Maça"},
  {id: 2, nome: "Uva"},
]

export default function Home() {
  const [itens, setItems] = useState(initialItems);

  async function handleClick(){
    const response = await fetch("http://192.168.68.154:3000/produtos");
    const produtos = await response.json();
    setItems(produtos);
    console.log(itens);
  }
  function handleClickFilter(){
    setItems(
      itens.filter(n=>(n.id)%3 !== 0)
        //if((n.id-1)%3 === 0){
          //console.log(n.id);
          //itens.slice(n.id-1,1);
        //}
        //return itens;
    );
    console.log(itens);
  }

  return (
   <main>
      <button type='button' onClick={handleClick}>
        Buscar informações no servidor
      </button>
      <button type='button' onClick={handleClickFilter}>
        Filtrar os elementos
      </button>

      <ol>
      {itens.map(item =>(
        <li key={item.id}> {item.nome}</li>
      ))}
      </ol>
   </main>
  )
}
