"use client"
import {useState, useEffect} from 'react';
import { api } from '../../services/api';

interface Product{
  id: number;
  nome: string;
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
    const data: Omit<Product, "id"> = {nome: textInput, isEditing: false};
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
          if(item.nome === '') throw Error;
          //Permite atualizar o elemento na lista
          await api.put(`/produtos/${itemId}`,{nome: item.nome});
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
   <main>
      <div style={{marginBottom: 10}}>
        {/**Esse 'onChange' permite pegar o texto do input*/}
        <input onChange={e=>setTextInput(e.target.value)} value={textInput} type="text" placeholder='Digite seu texto aqui'/>
        <button type='button' onClick={handleCLickAddItem}>Enviar</button>
      </div>

      <span>{loading && "Carregando..."}</span>

      {/*<button type='button' onClick={handleClick}>
        Buscar informações no servidor </button>*/}

      <button type='button' onClick={handleClickFilter}>
        Filtrar os elementos
      </button>

      <ul>
      {itens.map(item =>(
        <li key={item.id} style={{marginTop: 5}}> 
        {item.isEditing? (<input onChange={e =>{handleChangeItem(item.id, e.target.value)}} value={item.nome}/>) : item.nome}

        {item.isEditing?(
        <button type="button" style={{marginLeft: 6}} onClick={()=>{handleClickUpdateItem(item.id)}}>Save</button>
        ):(
          <button type="button" style={{marginLeft: 6}} onClick={()=>{handleClickEditItem(item.id)}}>Edit</button>
        )}

        
        <button type='button' style={{marginLeft: 6}} onClick={()=>{handleClickDeleteItem(item.id)}}> Delete </button>
        </li>
      ))}
      </ul>
   </main>
  )
}