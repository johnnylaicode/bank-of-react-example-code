import { useEffect } from "react/cjs/react.production.min";

// src/components/Debits.js
const Debits = (props) => {

	let debitsView = () => {
    // const { debits } = props.data;
    // debits?.map((debit) => {
    //   //let date = debit.date.slice(0,10);
    //   return <li key={debit.id}>TEST</li>
    // }) 

    return <ul>
      {props.debits?.map((debit) => {return <li key={debit.id}> {debit.amount} {debit.description} {debit.date}</li>})}
    </ul>
  }

  return (
    <div>
      <h1>Debits</h1>
      <h4>Balance: {props.balance}</h4>
      <h4>Total Debit: {props.totalDebit} | Total Credit: {props.totalCredit}</h4>
      {props.debits && debitsView()}
      <form onSubmit={props.addDebit}>
        <input type="text" name="description" />
        <input type="number" name="amount" />
        <button type="submit">Add Debit</button>
      </form>
    </div>
  )
}

export default Debits;