import { useContext, useEffect, useState } from "react"
import './transactionForm.css' 
import { transactionContext } from "../../financeContext.jsx"

function TransactionForm (){
    const [description , setDescription] = useState("")
    const [amount , setAmount] = useState(0.00) 
    const [type, setType] = useState("expense") 
    const [category , setCategory] = useState(null)
    const [date , setDate] =  useState(new Date())
    const {addTransaction} = useContext(transactionContext)
  

   useEffect(()=>{
      const today = new Date()
      const currentDate = today.toISOString().split('T')[0]
      setDate(currentDate)
    },[])

    const handleSubmit = ()=> {
       const newTransaction = {
        description , 
        amount , 
        type , 
        category , 
        date
       }

       addTransaction(newTransaction)
    }

  
  

  return(
    <div className="transaction-form">
       <div className="header-box">
        <button className="go-back"> go back icon </button>
        <h1>Add Transaction</h1>
        <h4>Track your financial activity</h4>
       </div>
       <div className="form-box">
         <h3>Amount</h3>
         <input type="text" placeholder="0.00" value={amount}
           onChange={(e)=> setAmount(e.target.value)}
         />
         <h3>Transaction Type</h3>
          <div className="type-toggle" >
            <div className="income" onClick={()=> setType("income")}>Income</div>
            <div className="expense" onClick={()=> setType("expense")}>Expense</div>
          </div>
          <h3>Choose Category</h3>
           <div className="category-box">
            {["Shopping" , "Food" , "Transport" , "Beauty" , "Health", "Fun" , "Education" , "Other"].map((categ )=> (
            <span key={categ} onClick={()=> setCategory(categ)}>{categ}</span>
           ))}
           </div>
           <h3>Description </h3>
           <input type="text" placeholder="What was this for ?" value={description} onChange={(e)=> setDescription(e.target.value)}/>
           <h3>Date</h3>
           <input type="date"
           value={date}
           onChange={(e)=> setDate(e.target.value)} />
           <button onClick={handleSubmit}>submit</button>
       </div>
     

    </div>
  
  )
}

export default TransactionForm