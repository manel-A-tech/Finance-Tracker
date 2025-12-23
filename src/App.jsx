import FinanceContext from "./financeContext.jsx"
import TransactionForm from "./components/TransactionForm/transactionForm.jsx"
import TransactionList from './components/TransactionList/transactionList.jsx'
import Dashboard from "./components/Dashboared/dashboard.jsx"
import {  Route, Routes , BrowserRouter } from "react-router-dom"
import NavBar from "./components/navBar/navBar.jsx"
import BudgetMnagament from "./components/BudgetManagement/budget.jsx"
import Statistics from "./components/Statistics/statisctics.jsx"
function App() {
  


  return (
    <BrowserRouter>
      <FinanceContext>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/transactionForm" element={<TransactionForm />} />
          <Route path="/transactionList" element={<TransactionList />} />
          <Route path = "/budgetManagment" element= {<BudgetMnagament/>} />
          <Route path = "/statistics" element = {<Statistics/>} />
        </Routes>
      </FinanceContext>
      <NavBar/>
    </BrowserRouter> 
    
    

  )
}

export default App
