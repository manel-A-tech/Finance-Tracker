import { useContext, useEffect, useState } from "react"
import { transactionContext } from "../../financeContext.jsx"
import './dashboard.css'
function Dashboard (){

  const {income ,
         expense,
         transactions,
        getCurrentMonth} = useContext(transactionContext)
  const balance = income - expense
  const [recentTransactions, setRecentTransactions] = useState([])
  const [avrgExpensesMonth , setAvrgExpensesMonth] = useState(0)
  const [categoriesUsedMonth , setCategoriesUsedMonth] = useState(0)
  const [numTransactionsInMonth , setNumTransactionsInMonth] = useState(0)
  const [topSpendingCategory, setTopSpendingCategory] = useState("");

  const handleRecentTransactions = (transactions) => {
    const recentTransactions = []
     for( let i = transactions.length  - 1 ;  i >= 0 ; i--){
        recentTransactions.push(transactions[i])
     }
    setRecentTransactions(recentTransactions)
  }



const getNumberofTransactionsInCurrentMonth = () => {
  const currentMonth = getCurrentMonth()
  let count = 0
  transactions.forEach((transaction) => {
    const yearMonth = transaction.date.split('-').slice(0, 2).join('-')
    if (yearMonth === currentMonth) {
      count += 1
    }
  })
  setNumTransactionsInMonth(count)
}

 useEffect(()=>{
    handleRecentTransactions(transactions) 
    getNumberofTransactionsInCurrentMonth()
    getAvrgTransactionsInCurrentMonth()
    setCategoriesUsedMonth(getCategoriesUsedMonth)
    setTopSpendingCategory(getTopSpendingCategory)
  },[transactions, getCurrentMonth])  

  const getAvrgTransactionsInCurrentMonth = () => {
  const currentMonth = getCurrentMonth()
  let count = 0
  transactions.forEach((transaction) => {
    const yearMonth = transaction.date.split('-').slice(0, 2).join('-')
    if (yearMonth === currentMonth && transaction.type === "expense") {
      count  = count + transaction.amount
    }
  })
   setAvrgExpensesMonth(Math.floor(count))
}

const getCategoriesUsedMonth = () => {
  const currentMonth =  getCurrentMonth()
  const uniqueCategories = new Set()

  transactions.forEach((transaction)=>{
    const yearMonth = transaction.date.split('-').slice(0, 2).join('-')
    if(yearMonth === currentMonth && transaction.type === "expense"){
      uniqueCategories.add(transaction.category)
    }
  })
  return uniqueCategories.size || "Haven't used any categories yet"
}

const getTopSpendingCategory = () => {
  const currentMonth = getCurrentMonth();
  const categoryTotals = {};

  transactions.forEach((transaction) => {
    const yearMonth = transaction.date.split('-').slice(0, 2).join('-');
    if (yearMonth === currentMonth && transaction.type === "expense") {
      const category = transaction.category;
      categoryTotals[category] = (categoryTotals[category] || 0) + transaction.amount;
    }
  });

  let topCategory = null;
  let maxAmount = 0;

  Object.entries(categoryTotals).forEach(([category, amount]) => {
    if (amount > maxAmount) {
      maxAmount = amount;
      topCategory = category;
    }
  });
  return topCategory || "No expenses"; 
};


  

 
  return(
    <div>
      <h1 className="dashboard-title">Personal Finance Tracker</h1>
       <div className="dashboard-general-info">
            <div className="dashboard-balance" >
              <p className="dashboard-info-titles">Total Balance</p>
              <p className="dashboard-info">${balance}</p>
            </div>
            <div className="dashboard-income">
              <p className="dashboard-info-titles">Total Income</p>
              <p className="dashboard-info">${income}</p>
            </div>
            <div className="dashboard-expense">
              <p className="dashboard-info-titles">Total Expenses</p>
              <p className="dashboard-info">${expense}</p>
            </div>
       </div>
        <div className="dashboard-more-info">
          <div className="dashboard-recent-transactions">
            <div className="dashboard-recent-transactions-header">
              <p className="recent-transactions-title">Recent Transaction</p>
              <div className="recent-transactions-btns">
              <button className="view-all-transactions-btn">View All</button>
              <button className="dashboard-add-transactions-btn" >+ Add Transaction</button>
              </div>
            </div>
           
            <div className="recent-transactions">
              <ul className="ul-recent-transactions">
              {recentTransactions.map((recentTransaction)=> (
                 <li key={recentTransaction.id} className="li-recent-transactions">
                    <p className="p-recent-transaction-description" > {recentTransaction.description} </p>
                    <p className={recentTransaction.type === "income" ? "p-recent-transactions-income" : "p-recent-transactions-expense"}> {recentTransaction.type === "income" ? "+" : "-"}${recentTransaction.amount} </p>
                 </li>
              ))}
              </ul>
            </div>
          </div>
          
          <div className="statistics">
            <p className="statistics-title" >Statistics</p>   
            <div className="containers"> 
            <div className="first-row">     
            <div className="number-transactions">
               <p className="p-number-transactions"> {numTransactionsInMonth} </p>
               <p className="p">Transactions This Month</p>
            </div>
            <div className="categories-used">
               <p className="p-categories-used">{categoriesUsedMonth}</p>
               <p className="p">Categories Used</p>
            </div>
            </div> 
            <div className="second-row">
            <div className="avrg-transactions">
               <p className="p-avrg-transactions">${avrgExpensesMonth}</p>
               <p className="p">Average Transaction </p>
            </div>
            <div className="top-spending-category">
              <p className="p-spending-category"> {topSpendingCategory} </p>
              <p className="p">Top Spending Category</p>
            </div> 
            </div>
            </div> 
          </div>
        </div>
    </div>
  )
}


export default Dashboard