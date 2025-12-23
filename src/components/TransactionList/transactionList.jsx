import './transactionList.css'
import { transactionContext } from "../../financeContext.jsx"
import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Pencil, Trash2 } from "lucide-react";
import { motion} from "motion/react"


function TransactionsList(){
  const {transactions,
     handleDeleteTransaction, 
     handleSaveEditTransaction,
    categories} = useContext(transactionContext)
  const [search, setSearch] = useState("")
  const [filteredTransactions, setFilteredTransactions] = useState([])
  const [didSearch, setDidSearch] = useState(false)
  const [isEditing , setIsEditing] = useState(false)
  const [formData , setFormData] = useState({
    description:"",
    amount:"",
    date:new Date(),
    category:"",
    type:"" 
  })
  const [editingId, setEditingId] = useState(null)

  const navigate = useNavigate()


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
  
  const handleEdit = (transaction) => {
    setFormData({
      description: transaction.description,
      amount: transaction.amount,
      date : transaction.date,
      category: transaction.category,
      type: transaction.type
    })
    setIsEditing(true)
    setEditingId(transaction.id)
  }

    const handleSaveEdit = () => {
    const updatedTransaction = {
      ...formData,
      amount: parseFloat(formData.amount)
    }
    handleSaveEditTransaction(editingId, updatedTransaction)
    setEditingId(null)
    setIsEditing(false)
    setFormData({ description: '', amount: '', date: '', category: '', type: '' })
  }

  return (
    <div>
      
      <div className="list-header">
        <motion.button onClick={()=>navigate(-1)} className="list-go-back-btn"
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.95 }}
          >
        </motion.button>
        <h3 className='list-title'>All Transaction</h3> 
        <Link to="/transactionForm" style={{ textDecoration: 'none' }}>
         <button className='list-add-transaction-btn'>Add Transaction</button>
        </Link>
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
          <div className='transactions-header'>
             <span>Description</span>
             <span>Amount</span>
             <span>Date</span>
             <span>Category</span>
             <span>Action</span>
        </div>  
          {
            didSearch ? (
              <div className='transactions-list'>
                {filteredTransactions.length > 0 ? (
                  filteredTransactions.map((transaction)=> (
                    <div key={transaction.id} className='transactions-li'>
                      <p> {transaction.description} </p>
                      <p className={`${transaction.type === "income" ? "income-amount" : "expense-amount"}`} >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount}</p>

                      <p> {transaction.date} </p>
                      <p> {transaction.category} </p>
                      <div className="list-action-btns">
                        <button className='list-edit-btn' onClick={()=>{handleEdit(transaction)}}>
                          <Pencil size={16} />
                        </button>
                        <button className='list-delete-btn'>
                           <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                ):(
                  <p>No Transactions Found</p>
                )}
              </div>
            ) :(
              <div className='transactions-list'>
               
                  {transactions.map((transaction)=>(
                    <div key={transaction.id} className='transactions-li'>
                      <p> {transaction.description} </p>
                     <p className={`${transaction.type === "income" ? "income-amount" : "expense-amount"}`} >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount}</p>

                      <p> {transaction.date} </p>
                      <p> {transaction.category} </p>
                      <div className="list-action-btns">
                        <button className='list-edit-btn' onClick={()=>{handleEdit(transaction)}}>
                          <Pencil size={16} />
                        </button>
                        <button className='list-delete-btn' onClick={()=>{handleDeleteTransaction(transaction.id)}}>
                           <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )
          }
        </div>
          { /* ediding form */
          isEditing === true ?
          <div className='list-editing-form'>
           <h3>Edit Transaction</h3>
            <div className='list-edit-transactions-body'>
              <p className='list-edit-p'>Description</p>
              <input type="text" value={formData.description} onChange={(e)=> setFormData({...formData,description:e.target.value})} className='list-edit-input'  />
              <p className='list-edit-p'>Amount</p>
              <input type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount:e.target.value })} className='list-edit-input'  />
              <p className='list-edit-p'>Date</p>
              <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} className='list-edit-input' />
              <p className='list-edit-p'>Ctegory</p>
               <select 
               value={formData.category} 
               onChange={(e)=> setFormData({...formData, category: e.target.value})}
               className='list-edit-select'>
                 <option value="Salary">Salary </option>
                 <option value="Food">Food </option>
                 <option value="Transport">Transport </option>
                 <option value="Shopping">Shopping</option>
                 <option value="Health">Health </option>
                 <option value="Fun"> Fun</option>
                 <option value="Education">Education </option>
                 <option value="Other">Other </option>
               </select>
               <p className='list-edit-p'>Type</p>
               <select
                value={formData.type}
                onChange={(e)=> setFormData({...formData, type: e.target.value})}
                className='list-edit-select'>
                 <option value="income">Income</option>
                 <option value="expense">Expense</option>
               </select>
            </div>
            <div className='list-edit-btns'>
              <button onClick={()=>setIsEditing(false)}>Cnacel</button>
              <button onClick={handleSaveEdit} >Save changes</button>
            </div>
          </div> : 
          <div></div> }
      </div>
    </div>
  )
}

export default TransactionsList