import FinanceContext from "./financeContext.jsx"
import TransactionForm from "./components/transactionForm/transactionForm.jsx"
function App() {
  

  return (
   <FinanceContext>
      <TransactionForm/>
  </FinanceContext> 
    

  )
}

export default App
