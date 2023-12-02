import TableHeader from './TableHeader';
import './styles.css';
import deleteIcon from '../../assets/deleteIcon.svg';
import editeIcon from '../../assets/editeIcon.svg';
import {formatToMoney, formatToDate, capitalizeWord} from '../../../src/utils/formatters';
import ConfirmChoose from '../confirmChoose';
import { useState } from 'react';



function TransactionList ({
  transactions, 
  setCurrentTransaction, 
  reload, 
  setReload, 
  handleOrderTransaction 

})
 {
  const[idItemDelete, setIdItemDelete] = useState(false);
  
  

   async function handleDeleteItem( ){
     await fetch(`http://localhost:3333/transactions/${idItemDelete}`,{
     method: 'DELETE'
    });
    
    
    setReload(!reload);
   }

  

return (
    <div className='table'>
     <TableHeader
     transactions = {transactions}
     handleOrderTransaction = {handleOrderTransaction}
     />
     <div className='table-body'> 

       {transactions.map ((item)=> (
          <div className='table-line' key= {item.id}>
          <div className='line-itens'>
            {formatToDate(item.date)}
            </div>
          <div className='line-itens'>{capitalizeWord(item.week_day)}</div>
          <div className='line-itens'>{item.description}</div>
          <div className='line-itens'>{item.category}</div>
          <div
           className='line-itens value-item'
           style={{color:item.type === 'credit'? '#7B61FF' : '#FA8C10'
         }}
           >
            {formatToMoney(item.value)}
            </div>
          <div className='line-itens'>
            
             <img 
             src={editeIcon} 
             alt= 'delete Icon' 
             className='action-button'
             onClick={()=>  setCurrentTransaction(item)}
             />
              <img 
             src={deleteIcon} 
             alt= 'edite Icon' 
             className='action-button'
             onClick={()=> handleDeleteItem(setIdItemDelete(item.id))}
             />
             <ConfirmChoose
             show={item.id === idItemDelete}
             setClose={()=>setIdItemDelete (null)}
             message= 'Apagar item ?'
             handleConfirm={()=>handleDeleteItem()}


             />
          </div>
       </div>
       ))}
    
     </div>
    </div>
);
}

export default TransactionList;