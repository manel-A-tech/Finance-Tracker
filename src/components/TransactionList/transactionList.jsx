import './transactionList.css'
import { transactionContext } from "../../financeContext.jsx"
import { useContext, useState } from 'react'

function TransactionsList(){
  const {transactions, numTransactions} = useContext(transactionContext)
  const [search, setSearch] = useState("")
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [didSearch, setDidSearch] = useState(false)

  const handleSearchTransactions = (search) => {
    if (!search.trim()){
      setFilteredTransactions([])
      setDidSearch(false) 
      return
    } 
    
    const results = transactions.filter((transaction) => {
      return (
        transaction.description.toLowerCase().includes(search.toLowerCase()) ||
        transaction.date.includes(search) ||
        transaction.amount.toString().includes(search) ||
        transaction.type.toLowerCase().includes(search.toLowerCase()) ||
        transaction.category.toLowerCase().includes(search.toLowerCase()) 
      )
    })

    setFilteredTransactions(results)
    setDidSearch(true)
    
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter"){
      handleSearchTransactions(search)
    }
  }
  
  return (
    <div>
      
      <div className="list-header">
        <button className='list-go-back-btn'>Go back</button>
        <h2 className='list-title'>All Transaction</h2>
        <button className='list-add-transaction-btn'>Add Transaction</button>
      </div>
      
      <div className='list-body'>
        <div className='list-search'> 
          <input 
            type="text" 
            placeholder='Search transactions by description, amount, date or category...' 
            id='list-search-transactions' 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            onKeyDown={handleKeyDown} 
          />
        </div>
        
        <div className="transactions">
          {didSearch ? (
            <div className='searched-transactions'>
              {filteredTransactions.length > 0 ? (
                <ul>
                  {filteredTransactions.map((transaction) => (
                    <li key={transaction.id}>
                      <p>{transaction.description}</p>
                      <p>{transaction.amount}</p>
                      <p>{transaction.date}</p>
                      <p>{transaction.category}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No transactions found</p>
              )}
            </div>
          ) : (
            <div className='all-transactions'>
              <ul>
                {transactions.map((transaction) => (
                  <li key={transaction.id}>
                    <p>{transaction.description}</p>
                    <p>{transaction.amount}</p>
                    <p>{transaction.date}</p>
                    <p>{transaction.category}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TransactionsList