import { useContext, useEffect, useState } from "react"
import './transactionForm.css' 
import { transactionContext } from "../../financeContext.jsx"

function TransactionForm (){
    const [description , setDescription] = useState(null)
    const [amount , setAmount] = useState("") 
    const [type, setType] = useState("income") 
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

    const goBackIcon = <svg width="24" height="24" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 18L9 12L15 6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
       

    const handleChooseType = (newType) => {
      setType(newType)
    }

  return(
    <div className="transaction-form">
       <div className="header-box">
        <button className="go-back"> 
              {goBackIcon}
         </button>
        <h1>Add Transaction</h1>
        <p className="title">Track your financial activity</p>
       </div>
       <div className="form-box"> 
         <p className="titles">Amount</p>
         <input type="text" placeholder="0.00" id="text-input" value={amount}
           onChange={(e)=> setAmount(e.target.value)}
         />
         <p className="titles">Transaction Type</p>
           <div className={`type-toggle ${type}`}  >

            <div className={`income ${type=== "income" ? 'active' : '' }`} onClick={() => setType("income")} >Income</div>
            <div className= {`expense ${type === "expense" ? "active" : ""}`}  onClick={() => setType("expense")}>Expense</div>
             <div className="slider"></div>
          </div>
          <p className="titles"> Choose Category</p>
           <div className="category-box">
            {["Shopping 🛍️" , "Food 🍔" , "Transport 🚗" , "Beauty 💄" , "Health 🩺", "Fun 🎉" , "Education 🎓" , "Other 📦"].map((categ )=> (
            <span className={`category ${category === categ ? "selected" : ""}`} key={categ} onClick={()=> setCategory(categ)}>{categ}</span>
           ))}
           </div>
           <p className="titles">Description </p>
           <input type="text" placeholder="What was this for ?" id="text-input"  value={description} onChange={(e)=> setDescription(e.target.value)}/>
           <p className="titles date">Date</p>
           <div className="container">
           <input type="date"
           id="date-input"
           value={date}
           onChange={(e)=> setDate(e.target.value)} />
           <button onClick={handleSubmit} className="add-transaction-btn" >Add Transaction</button>
           </div>
       </div>
     

    </div>
  
  )
}

export default TransactionForm