import { useState } from "react";
import {v4 as uuidv4} from 'uuid'; 

// src/components/Credits.js
const Credits = (props) => {


  const [desc, setDesc] = useState ('');
  const [amount, setAmount] = useState (0); 
  const [render, setRender] = useState (false); 

	let creditsView = () => {
    // const { credits } = props.data;
    // credits?.map((credit) => {
    //   //let date = credit.date.slice(0,10);
    //   return <li key={credit.id}>TEST</li>
    // }) 

    return <ul id= "creditsList">
      {props.credits?.map((credit) => {return <li key={credit.id}> {credit.amount} {credit.description} {credit.date}</li>})}
    </ul>
  }


  let addCredit = () => {
      props.credits.push({
      id:uuidv4(), 
      description: desc, 
      amount: amount, 
      date: new Date().toISOString()
    })
  }

  return (
    <div>
      <h1>Credits</h1>
      <h4>Balance: {props.balance}</h4>
      <h4>Total Debit: {props.totalCredit} | Total Credit: {props.totalCredit}</h4>
      {props.credits && creditsView()}
      <form onSubmit={props.addCredit}>
        <input type="text" name="description" onChange={(e) => {setDesc(e.target.value)}}/>
        <input type="number" name="amount" onChange={(e) => {setAmount(e.target.value); console.log(e.target.value)}}/>
        <button type="submit" onClick = {(e) => {
            e.preventDefault(); 
            addCredit(); 
            console.log(props.credits)
            setRender(!render)
        }}>Add Credit</button>
      </form>
    </div>
  )
}


export default Credits;