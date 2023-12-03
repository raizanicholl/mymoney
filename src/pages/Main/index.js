
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import ModalStorageTransaction from '../../components/ModalStorageTransaction';
import Resume from '../../components/Resume';
import TransactionList from '../../components/TransactionList';
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import useAuth from "../../hooks/useAuth";
import * as C from "./styles";
import './styles.css';

function Main() {
  const [open,setOpen]= useState(false);
  const [transactions, setTransactions]= useState([]);
  const [currentTransaction, setCurrentTransaction]= useState(false)
  const [reload, setReload] = useState (false)
  const { signout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() =>{
    handleLoadTransactions()
  },[reload])

  useEffect(() => {
   if (currentTransaction){
    return setOpen(true);
   }
  }, [currentTransaction]);
  
  useEffect(() => {
    if(!open){
    handleLoadTransactions();
    }
    if(!open && currentTransaction){
      setCurrentTransaction(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function handleOrderTransaction(newTransactions){
    setTransactions(newTransactions);

  }

  async function handleLoadTransactions (){
    const response = await fetch('http://localhost:3333/transactions',{
        method:'GET'
        });
        const data = await response.json();
        setTransactions(data);
  }

  return (

   

    <div className="App">
      <Header/>
      <main>
      <C.Container>
      <Button Text="Sair" onClick={() => [signout(), navigate("/")]}>
        Sair
      </Button>
    </C.Container>

      <TransactionList  
      transactions = {transactions}
      setCurrentTransaction = {setCurrentTransaction}
      setReload = {setReload}
      reload = {reload}
      handleOrderTransaction= {handleOrderTransaction}
      />

      <div>
      <Resume
      transactions ={transactions}
      />
      <button 
      className='btn-insert-register'
      onClick={() => setOpen(true)}
      >
        Adicionar registro
      </button>
      </div>
      </main>
      
      <ModalStorageTransaction
      open={open}
      setOpen={setOpen}
      currentTransaction={currentTransaction}
      />
    </div>
  );
}


export default Main;
