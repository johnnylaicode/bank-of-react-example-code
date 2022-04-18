import { useState } from "react";
import {Link} from 'react-router-dom';

// src/components/Credits.js
const Credits = (props) => {
  const {addCredit, calculateCredit, refreshBalance, totalDebit, totalCredit, balance, credits} = props;

  const [desc, setDesc] = useState ('');
  const [amount, setAmount] = useState (0); 
  const [render, setRender] = useState (false); 

	let creditsView = () => {
    // const { credits } = data;
    // credits?.map((credit) => {
    //   //let date = credit.date.slice(0,10);
    //   return <li key={credit.id}>TEST</li>
    // }) 

    return <ul id= "creditsList">
      {credits?.map((credit) => {return <li key={credit.id}> {credit.amount} {credit.description} {credit.date}</li>})}
    </ul>
  }

  return (
    <div>
      <h1>Credits</h1>
      <Link to= "/">back</Link>
      <h4>Balance: {balance}</h4>
      <h4>Total Debit: {totalDebit} | Total Credit: {totalCredit}</h4>
      {credits && creditsView()}
      <form onSubmit={addCredit}>
        <input type="text" name="description" onChange={(e) => {setDesc(e.target.value)}}/>
        <input type="number" name="amount" onChange={(e) => {setAmount(e.target.value); console.log(e.target.value)}}/>
        <button type="submit" onClick = {(e) => {
            e.preventDefault(); 
            addCredit(desc, amount); 
            calculateCredit();
            refreshBalance();
            setRender(!render)
        }}>Add Credit</button>
      </form>
    </div>
  )
}


export default Credits;