import { createContext, useState , useEffect } from "react"
export const transactionContext = createContext()
function FinanceContext ({children}){
  
  const [transactions , setTransactions] = useState([])

  const addTransaction = (newTransaction)=>{
     setTransactions(prev => [...prev, newTransaction])
    
  }

  useEffect(() => {
  console.log("Updated transaction:", transactions);
}, [transactions]);

  return(
   <transactionContext.Provider value={{transactions, addTransaction}}>
    {children}
   </transactionContext.Provider>
  )
}

export default FinanceContext