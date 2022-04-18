import { useState } from "react";
import {v4 as uuidv4} from 'uuid'; 
import {Link} from 'react-router-dom';
import { useEffect } from "react";

// src/components/Debits.js
const Debits = (props) => { 
  const {calculateDebit, refreshBalance, totalDebit, totalCredit, balance, debits} = props;

  const [desc, setDesc] = useState ('');
  const [amount, setAmount] = useState (0); 
  const [render, setRender] = useState (false); 

  useEffect(() => {
    console.log("calculateDebit: ", calculateDebit());
    console.log('totalDebit:', totalDebit);
  }, [render])

	let debitsView = () => {
    return <ul id= "debitsList">
      {debits?.map((debit) => {return <li key={debit.id}> {debit.amount} {debit.description} {debit.date}</li>})}
    </ul>
  }

  return (
    <div>
      <h1>Debits</h1>
      <Link to= "/">back</Link>
      <h4>Balance: {balance}</h4>
      <h4>Total Debit: {totalDebit} | Total Credit: {totalCredit}</h4>
      {debits && debitsView()}
      {refreshBalance && calculateDebit && <form onSubmit={addDebit}>
        <input type="text" name="description" onChange={(e) => {setDesc(e.target.value)}}/>
        <input type="number" name="amount" onChange={(e) => {setAmount(parseFloat(e.target.value).toFixed(2));}}/>
        <button type="submit" onClick = {(e) => {
            e.preventDefault(); 
            addDebit(desc, amount);
            calculateDebit();
            refreshBalance();
            setRender(!render)
        }}>Add Debit</button>
      </form>}
    </div>
  )
}


export default Debits;