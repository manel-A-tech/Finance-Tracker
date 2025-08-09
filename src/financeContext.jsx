import { createContext, useState , useEffect } from "react"
export const transactionContext = createContext()

function FinanceContext ({children}){
  
  const [transactions , setTransactions] = useState([
  {
    id: 1,
    description: "Grocery shopping",
    amount: 85.50,
    type: "expense",
    category: "Food 🍔",
    date: "2023-11-15"
  },
  {
    id: 2,
    description: "Freelance payment",
    amount: 1200,
    type: "income",
    category: "Other 📦",
    date: "2023-11-10"
  },
  {
    id: 3,
    description: "Uber ride",
    amount: 12.75,
    type: "expense",
    category: "Transport 🚗",
    date: "2023-11-12"
  },
  {
    id: 4,
    description: "Online course",
    amount: 49.99,
    type: "expense",
    category: "Education 🎓",
    date: "2023-11-05"
  },
  {
    id: 5,
    description: "Birthday gift",
    amount: 35,
    type: "expense",
    category: "Shopping 🛍️",
    date: "2023-11-08"
  }

  ])
  const [income , setIncome] = useState(0)
  const [expense , setExpense] = useState(0)
  const [numTransactions , setNumTransactions] = useState(0)

  const addTransaction = (newTransaction)=>{
     setTransactions(prev => [...prev, newTransaction])
     if(newTransaction.type === "income" ){
       setIncome( income => income + newTransaction.amount)
     } else if (newTransaction.type === "expense"){
      setExpense(expense => expense + newTransaction.amount)
     }
     setNumTransactions(numTran => numTran +1)
  }
   
  useEffect(() => {
  console.log("Updated transaction:", transactions);
}, [transactions]);

   

  return(
   <transactionContext.Provider value={{transactions, addTransaction , numTransactions}}>
    {children}
   </transactionContext.Provider>
  )
}

export default FinanceContext