
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import ModalStorageTransaction from '../../components/ModalStorageTransaction';
import Resume from '../../components/Resume';
import TransactionList from '../../components/TransactionList';
import './styles.css';


function Main() {
  const [open,setOpen]= useState(false);
  const [transactions, setTransactions]= useState([]);
  const [currentTransaction, setCurrentTransaction]= useState(false)
  const [reload, setReload] = useState (false)
  
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
