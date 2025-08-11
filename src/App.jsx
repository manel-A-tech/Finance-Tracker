import FinanceContext from "./financeContext.jsx"
import TransactionForm from "./components/TransactionForm/transactionForm.jsx"
import TransactionList from './components/TransactionList/transactionList.jsx'
import Dashboard from "./components/Dashboared/dashboard.jsx"
function App() {
  

  return (
   <FinanceContext>
    <Dashboard/>
    <TransactionForm/>
   <TransactionList/>
  </FinanceContext> 
    

  )
}

export default App
