import { useState } from "react";
import {v4 as uuidv4} from 'uuid'; 

// src/components/Debits.js
const Debits = (props) => {


  const [desc, setDesc] = useState ('');
  const [amount, setAmount] = useState (0); 
  const [render, setRender] = useState (false); 

	let debitsView = () => {
    // const { debits } = props.data;
    // debits?.map((debit) => {
    //   //let date = debit.date.slice(0,10);
    //   return <li key={debit.id}>TEST</li>
    // }) 

    return <ul id= "debitsList">
      {props.debits?.map((debit) => {return <li key={debit.id}> {debit.amount} {debit.description} {debit.date}</li>})}
    </ul>
  }


  let addDebit = () => {
      props.debits.push({
      id:uuidv4(), 
      description: desc, 
      amount: amount, 
      date: new Date().toISOString()
    })
  }

  return (
    <div>
      <h1>Debits</h1>
      <h4>Balance: {props.balance}</h4>
      <h4>Total Debit: {props.totalDebit} | Total Credit: {props.totalCredit}</h4>
      {props.debits && debitsView()}
      <form onSubmit={props.addDebit}>
        <input type="text" name="description" onChange={(e) => {setDesc(e.target.value)}}/>
        <input type="number" name="amount" onChange={(e) => {setAmount(e.target.value); console.log(e.target.value)}}/>
        <button type="submit" onClick = {(e) => {
            e.preventDefault(); 
            addDebit(); 
            console.log(props.debits)
            setRender(!render)
        }}>Add Debit</button>
      </form>
    </div>
  )
}


export default Debits;