import FinanceContext from "./financeContext.jsx"
import TransactionForm from "./components/transactionForm/transactionForm.jsx"
import TransactionsList from "./components/TransactionList/transactionList.jsx"
function App() {
  

  return (
   <FinanceContext>
    <TransactionsList/>
  </FinanceContext> 
    

  )
}

export default App
