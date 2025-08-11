import { createContext, useState , useEffect } from "react"
export const transactionContext = createContext()

function FinanceContext ({children}){
  
/*  const [transactions , setTransactions] = useState(()=> {const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) :
  [{
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
  }]
  })
  const [income , setIncome] = useState(()=>{
    const saved = localStorage.getItem("income")
    return saved ? saved : 1200
  })
  const [expense , setExpense] = useState(()=>{
    const saved = localStorage.getItem("expense")
    return saved ? saved : 183.24
  })
  const [numTransactions , setNumTransactions] = useState(()=>{
    const saved = localStorage.getItem("numTransactions")
    return saved ? saved: 5
  }) */

  

    

/* useEffect(()=>{
      localStorage.setItem("transactions", JSON.stringify(transactions))
      localStorage.setItem("income" , income)
      localStorage.setItem("expense", expense)
      localStorage.setItem("numTransactions" , numTransactions)
  },[transactions,income,expense,numTransactions]) */

  const [transactions , setTransactions] = useState([
  {
    id: 1,
    description: "Grocery shopping",
    amount: 85.50,
    type: "expense",
    category: "Food 🍔",
    date: "2025-07-30"
  },
  {
    id: 2,
    description: "Freelance payment",
    amount: 1200,
    type: "income",
    category: "Other 📦",
    date: "2025-08-01"
  },
  {
    id: 3,
    description: "Uber ride",
    amount: 12.75,
    type: "expense",
    category: "Transport 🚗",
    date: "2025-08-05"
  },
  {
    id: 4,
    description: "Online course",
    amount: 49.99,
    type: "expense",
    category: "Education 🎓",
    date: "2025-08-05"
  },
  {
    id: 5,
    description: "Birthday gift",
    amount: 35,
    type: "expense",
    category: "Shopping 🛍️",
    date: "2025-08-08"
  }

  ])
  const [income , setIncome] = useState(1200)
  const [expense , setExpense] = useState(183.24)
 
  const addTransaction = (newTransaction)=>{
     setTransactions(prev => [...prev, newTransaction])
     if(newTransaction.type === "income" ){
       setIncome( income => income + newTransaction.amount)
     } else if (newTransaction.type === "expense"){
      setExpense(expense => expense + newTransaction.amount)
     }
     return alert("Transaction saved!")
  }
   
/*  useEffect(() => {
  console.log("Updated transaction:", transactions);
  console.log(expense)
  console.log(income)

}, [transactions]); */


const handleDeleteTransaction = (id) => {
    const transactionToBeDeleted = transactions.find(transaction => transaction.id === id)

    if(transactionToBeDeleted){
      setTransactions(prev => prev.filter(transaction => transaction.id !== id) )
      setNumTransactions(num => num -1)
    }

    if(transactionToBeDeleted.type === "income"){
      setIncome(income => income - transactionToBeDeleted.amount)
    } else if (transactionToBeDeleted.type === "expense"){
      setExpense(expense => expense - transactionToBeDeleted.amount)
    }
}

const handleSaveEditTransaction = (id, updatedTransaction) => {
   
  const originalTransaction = transactions.find(transaction => transaction.id === id)
  
  if (originalTransaction) {
  
    if (originalTransaction.type === "expense") {
      setExpense(expense => expense - originalTransaction.amount)
    } else if (originalTransaction.type === "income") {
      setIncome(income => income - originalTransaction.amount)
    }
    
    
    if (updatedTransaction.type === "expense") {
      setExpense(expense => expense + updatedTransaction.amount)
    } else if (updatedTransaction.type === "income") {
      setIncome(income => income + updatedTransaction.amount)
    }
    setTransactions(prev => 
      prev.map(transaction => 
        transaction.id === id 
          ? { ...updatedTransaction, id } 
          : transaction
      )
    )
  } 
}

const getCurrentMonth = () => {
  const now = new Date ()
  const year = now.getFullYear()
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  return `${year}-${month}`
}

  return(
   <transactionContext.Provider value={{transactions,
    addTransaction ,
    handleDeleteTransaction,
    handleSaveEditTransaction,
    income,
    expense,
    getCurrentMonth}}>
    {children}
   </transactionContext.Provider>
  )
}

export default FinanceContext