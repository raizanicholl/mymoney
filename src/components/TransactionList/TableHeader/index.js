/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import { useState } from 'react';
import ArrowDown from '../../../assets/arrow-down.svg';
import ArrowUp from '../../../assets/arrow-up.svg';
import './styles.css';
import { useEffect } from 'react';
import { orderColumnAsc, orderColumnDesc } from './utils';


function TableHeader ({transactions, handleOrderTransaction}){
    const [filter, setFilter] = useState('date');
    const [order, setOrder] = useState('asc');

    useEffect(()=>{
        console.log(filter)
        console.log(order)
     if (order === 'desc'){
        orderAllTransactionsByDesc();
        return
     }
        orderAllTransactionsByAsc ();
    },[filter,order]);

    function orderAllTransactionsByAsc(){
        const localTransactions= [...transactions]
        localTransactions.sort((a, b)=> orderColumnAsc(a, b, filter));

        handleOrderTransaction(localTransactions)

    }

    function orderAllTransactionsByDesc(){
        const localTransactions= [...transactions]
        localTransactions.sort((a, b) => orderColumnDesc(a, b, filter));

        handleOrderTransaction(localTransactions)
        
    }
    
    //ascendente, descendente;
function handlerChangeFilter (type){
    if (filter === type){
        setOrder(order === 'asc'? 'desc': 'asc');
        return;
    }

    setFilter(type);

}
return (
<div className='table-head'>

    <div className='column-title cursor-pointer'
    onClick={() => handlerChangeFilter ('date')}
    >
        <span className='bold'>Data</span>
        {filter === 'date' && <img 
        src= {order === 'asc' ? ArrowUp : ArrowDown} 
        alt='apply filter'
        />
     }
    </div>
    <div className='column-title cursor-pointer'
    onClick={() => handlerChangeFilter ('weekDay')}
    >
        <span className='bold'>Dia da semana</span>
        {filter === 'weekDay' && <img 
        src={order === 'asc' ? ArrowUp : ArrowDown} 
        alt='apply filter'
        />
    }
    </div>
    <div className='column-title'>
        <span className='bold'>Descrição</span>
    </div>
    <div className='column-title'>
        <span className='bold'>Categoria</span>
    </div>
    <div className='column-title cursor-pointer'
    onClick={() => handlerChangeFilter ('value')}
    >
        <span className='bold'>Valor</span>
        {filter === 'value' && <img 
        src={order === 'asc' ? ArrowUp : ArrowDown} 
        alt='apply filter'
        />
}
    </div>
    <div className='column-title'></div>
</div>
);
}

export default TableHeader;