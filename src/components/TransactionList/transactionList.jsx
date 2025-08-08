import './transactionList.css'
import { transactionContext } from "../../financeContext.jsx"
import { useContext, useState } from 'react'
function TransactionsList(){

  const {transactions , numTransactions} = useContext(transactionContext)
  const [search , setSearch] = useState("")

  const handleSearchTransactions = (search) => {
    transactions.map((transaction)=> {
      if(transaction.description === search){
        return transaction
      }else if(transaction.date === search){
        return transaction
      }else if (transaction.category === search){
        return transaction
      }else if (transaction.amount === search){
        return transaction
      } else return `There are no such transactions`
    })
  }

  const handleKeyDown = (e) => {
     if (e.key === "Enter"){
       return handleSearchTransactions()
     }
  }
  
  return (
    <div>
       <div className="list-header">
        <h1>All Transaction</h1>
        <button>Go back</button>
        <button className='list-add-transaction-btn' >Add Transaction</button>
       </div>
       <div className='list-body' >
        <div className='list-search'> 
         <input type="text"  placeholder='Search transactions...' className='list-search-transactions' value={search} onChange={(e)=>setSearch(e.target.value)} onKeyDown={handleKeyDown} />
         <span></span>
        </div>
          <div className=''>

          </div>
       </div>
    </div>
  )
}

export default TransactionsList