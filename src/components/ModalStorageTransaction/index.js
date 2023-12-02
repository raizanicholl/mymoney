import './styles.css';
import closeIcon from '../../assets/closeIcon.svg'
import { useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import {formatToWeekDay} from '../../../src/utils/formatters'
import { format } from 'date-fns';


const defaultValuesForm = {
    value: 0,
    description:'',
    date: '',
    category:''
}

function ModalStorageTransaction({
    open, 
    setOpen, 
    currentTransaction, 
}){


    const [activeButton, setActiveButton] = useState('debit');
    const[form, setForm]= useState(defaultValuesForm);

    async function updateTransaction (body){
        return await fetch(`http://localhost:3333/transactions/${currentTransaction.id}`,{
            method:'PUT', 
            headers: {'content-type':'application/json'},
            body: JSON.stringify(body)
            });

    }

    async function registerTransaction(body){
        return await fetch('http://localhost:3333/transactions',{
            method:'POST', 
            headers: {'content-type':'application/json'},
            body: JSON.stringify(body)
            });

    }

    useEffect(() => {
        if(open && !currentTransaction){
            setForm(defaultValuesForm);
        }
        if(currentTransaction){
            setActiveButton(currentTransaction.type);
            setForm({
                date: format(new Date (currentTransaction.date), 'dd/MM/yyyy'),
                category: currentTransaction.category,
                value:currentTransaction.value,
                description:currentTransaction.description
            });
        }
    } ,[currentTransaction,open]);
    
    function handleChange (target){
        setForm ({...form,[target.name] : target.value});

    }
    

    async function  handleSubmit (event){
        event.preventDefault();
        

    const [day, month, year] = form.date.split('/');
    const selectedDate= new Date (`${month}/${day}/${year}`);
        
    const body= {
            date: selectedDate,
            week_day:formatToWeekDay(selectedDate) ,
            description: form.description,
            value: form.value,
            category: form.category,
            type: activeButton  
        }

       if(currentTransaction){
        await updateTransaction(body);
        setOpen(false);
        return
       }
        await registerTransaction(body);
        setOpen(false);   
    }

    return (
        <div className='backdrop' style={{display: !open && 'none'}}>
            <div className='modal-content modal-storage'>
                <img 
                className= 'close-icon'src={closeIcon} 
                alt= 'close Icon'
                onClick={() => setOpen(false)}
                />
            
            <h2>Adicionar registro</h2>
            <div className='container-buttons'>
                <button className= {`btn-empty ${activeButton === 'credit' && 'btn-credit'}`}
                onClick={() => setActiveButton('credit')}
                >
                 Entrada

                </button>
                <button className= {`btn-empty ${activeButton === 'debit' && 'btn-debit'}`}
                onClick={() => setActiveButton('debit')}
                >
                 Saída
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div>

                    <label>Valor</label>
                    <input 
                    type= 'number'
                    name='value'
                    value={form.value}
                    onChange={(event) => handleChange(event.target)}
                    />
                </div>
                <div >
                    <label>Categoria</label>
                    <input 
                    type= 'text'
                    name='category'
                    value={form.category}
                    onChange={(event) => handleChange(event.target)}
                    />
                </div>
                <div>
                    <label>Data</label>
                    <InputMask
                    mask= '99/99/9999'
                    type= 'text'
                    name='date'
                    value={form.date}
                    onChange={(event) => handleChange(event.target)}
                    />
                </div>
                <div>
                    <label>Descrição</label>
                    <input 
                    type= 'text'
                    name='description'
                    value={form.description}
                    onChange={(event) => handleChange(event.target)}
                    />
                </div>
                <div className='container-btn-confirm-insert'>
                    <button className='btn-confirm-insert'>
                        Confirma
                    </button>
                </div>
            </form>
        
        </div>
        </div>
    );
}
export default ModalStorageTransaction;