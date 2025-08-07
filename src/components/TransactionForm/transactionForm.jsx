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
        id: Date.now(),
        amount , 
        type , 
        category , 
        description ,
        date
       }
       addTransaction(newTransaction)
    }

    const goBackIcon = () => {
      return  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       <path d="M15 18L9 12L15 6" stroke="#000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
       </svg>
    }

  
  

  return(
    <div className="transaction-form">
       <div className="header-box">
        <button className="go-back"> {goBackIcon} </button>
        <h1>Add Transaction</h1>
        <p>Track your financial activity</p>
       </div>
       <div className="form-box"> 
         <p className="titles">Amount</p>
         <input type="text" placeholder="0.00" value={amount}
           onChange={(e)=> setAmount(e.target.value)}
         />
         <p className="titles">Transaction Type</p>
          <div className="type-toggle" >
            <div className="income" onClick={()=> setType("income")}>Income</div>
            <div className="expense" onClick={()=> setType("expense")}>Expense</div>
          </div>
          <p className="titles"> Choose Category</p>
           <div className="category-box">
            {["Shopping" , "Food" , "Transport" , "Beauty" , "Health", "Fun" , "Education" , "Other"].map((categ )=> (
            <span key={categ} onClick={()=> setCategory(categ)}>{categ}</span>
           ))}
           </div>
           <p className="titles">Description </p>
           <input type="text" placeholder="What was this for ?" value={description} onChange={(e)=> setDescription(e.target.value)}/>
           <p className="titles">Date</p>
           <input type="date"
           value={date}
           onChange={(e)=> setDate(e.target.value)} />
           <button onClick={handleSubmit}>submit</button>
       </div>
     

    </div>
  
  )
}

export default TransactionForm