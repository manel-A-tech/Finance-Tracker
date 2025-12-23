import { useContext, useEffect, useState } from "react"
import './transactionForm.css'
import { transactionContext } from "../../financeContext.jsx"
import { useNavigate } from 'react-router-dom'
import { motion} from "motion/react"


function TransactionForm (){

    const {addTransaction, categories} = useContext(transactionContext)
    const navigate = useNavigate()

  // form data
    const [description , setDescription] = useState("")
    const [amount , setAmount] = useState("") 
    const [type, setType] = useState("expense") 
    const [category , setCategory] = useState("")
    const [date , setDate] =  useState(new Date())

    // errors handling
    const [errors , setErrors] = useState({
      amountErr : false,
      categoryErr : false,
      descriptionErr : false
    }) 
   const [sucess , setSuccess] = useState(false)

   // get today's date 
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
       const newErrors = {
        amountErr: newTransaction.amount === "",
        categoryErr: newTransaction.category === "",
        descriptionErr: newTransaction.description === ""
        }
       setErrors(newErrors)
       let isValid = !newErrors.amountErr && !newErrors.categoryErr && !newErrors.descriptionErr 
         
       if (isValid){
        setSuccess(isValid)
        addTransaction(newTransaction)
        setAmount("" )
        setCategory("")
        setDescription("")
        setType("income")
        setErrors({
         amountErr: false,
         categoryErr: false,
         descriptionErr: false
       })
     }
        // hide the success msg after 2s
        setTimeout(() => setSuccess(false), 2000);
    }


      const BackIcon = () => (
        <svg width="24" height="24" viewBox="0 0 26 20" fill="none">
        <path
        d="M15 18L9 12L15 6"
        stroke="#fff"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
       />
      </svg>
       );

  return(
    <div className="transaction-form">
       <div className="form-header-box">
        <motion.button onClick={()=>navigate(-1)} className="form-go-back"
           whileHover={{ scale: 1.1 }}
           whileTap={{ scale: 0.95 }}
          >
          <BackIcon/>
        </motion.button>
        <p>Add New Transaction</p>
        <p>Fill in the details below to track your finances</p>
       </div>
       <div className="form-box"> 
        {/* Amount */}
        <div className="form-grp">
          <label className="form-titles">Amount</label>
          <input type="number" placeholder="0.00" id="text-input" value={amount}
           onChange={(e)=> setAmount(Number(e.target.value))} required
          />
          {errors.amountErr &&(
            <p>Amount required</p>
          )}
        </div>
        {/* Type */}
        <div className="form-grp">
          <label>Transaction Type</label>
          <div className={`type-toggle ${type}`}  >
            <div className={`expense ${type=== "expense" ? 'active' : '' }`} onClick={() => setType("expense")} >Expense</div>
            <div className= {`income ${type === "income" ? "active" : ""}`}  onClick={() => setType("income")}>Income</div>
              <motion.div
              className="slider"
              animate={{
                x: type === "expense" ? 0 : "96%",
                backgroundColor:
                  type === "income"
                    ? "rgba(56,178,172,0.2)"
                    : "rgba(178,56,56,0.2)",
              }}
              transition={{ type: "spring", stiffness: 160, damping: 20 }}
            />
          </div>
        </div>
        {/* Category */}
          <div className="form-grp">
            <label>Choose Category</label>
            <div className="category-box">
            {categories.map((categ )=> (
            <motion.span
            className={`category ${category === categ.name ? "selected" : ""}`} key={categ.name} onClick={()=> setCategory(categ.name)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            > {categ.icon}{categ.name}</motion.span>
           ))}
           </div>
           {errors.categoryErr && (
            <p>Category required</p>
          )}
          </div>
          {/*Description*/}
          <div className="form-grp">
            <label>Description</label>
            <input type="text" placeholder="What was this for ?" id="text-input"  value={description} onChange={(e)=> setDescription(e.target.value)} required
            />
           {errors.descriptionErr && (
            <p>Description required</p>
          )}
          </div>
          {/* Date */}
          <div className="form-grp">
           <label>Date</label>
           <div className="container">
           <input type="date"
           id="date-input"
           value={date}
           onChange={(e)=> setDate(e.target.value)}
           required />
           </div>      
           <button
           onClick={handleSubmit} className="add-transaction-btn"
           >
            Add Transaction
           </button>
           {sucess && ( <p id="success-msg">Transaction added successfully!</p>)}
          </div>
       </div>
    </div>
  
  )
}

export default TransactionForm