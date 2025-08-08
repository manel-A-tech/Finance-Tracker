import { createContext, useState , useEffect } from "react"
export const transactionContext = createContext()

function FinanceContext ({children}){
  
  const [transactions , setTransactions] = useState([])
  const [income , setIncome] = useState(0)
  const [expense , setExpense] = useState(0)
  const [numTransactions , setNumTransactions] = useState(0)

  const addTransaction = (newTransaction)=>{
     setTransactions(prev => [...prev, newTransaction])
     if(newTransaction.type === "income" ){
       setIncome( income => income + newTransaction.amount)
     } else if (newTransaction.type === "expense"){
      setExpense(expense => expense - newTransaction.amount)
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