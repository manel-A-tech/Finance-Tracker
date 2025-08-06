import { createContext, useState , useEffect } from "react"
export const transactionContext = createContext()
function FinanceContext ({children}){
  
  const [transaction , setTransaction] = useState([])

  const addTransaction = (newTransaction)=>{
     setTransaction(prev => [...prev, newTransaction])
    
  }

  useEffect(() => {
  console.log("Updated transaction:", transaction);
}, [transaction]);

  return(
   <transactionContext.Provider value={{transaction, addTransaction}}>
    {children}
   </transactionContext.Provider>
  )
}

export default FinanceContext