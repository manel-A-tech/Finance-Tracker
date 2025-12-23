import { useState } from "react"


function BudgetMnagament(){

  const [budgetLimit , setBudgetLimit] = useState()
  const [budgetCategory , setBudgetCategory] = useState()
  const [beginningDate , setBeginningDate] = useState()
  const [endDate , setEndDate] = useState()
  const [isaddingBudget , setIsaddingBudget] = useState(false)
  const [totalBudgets , setTotalBudgets] = useState()
  const [remainingBudgets , setRemainingBudgets] = useState()
  const [spentBudget , setSpentBudget] = useState()
  const [totalSpent , setTotalSpent] = useState()

  const handleAddBudget = ()=>{
  // each time we add a transaction we check if there is a budget in this 
  }


  return (
    <div>
      <h1>
        Budget Management
      </h1>
    </div>
  )
}

export default BudgetMnagament