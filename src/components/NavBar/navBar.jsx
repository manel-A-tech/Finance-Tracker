import { Link} from 'react-router-dom'
import './navBar.css'
import {House , List , Wallet , ChartNoAxesCombined } from "lucide-react";
import { motion} from "motion/react"

function NavBar(){
  const icons = [
    {name: "Home" , icon: <House size={15} />},
    {name: "Transactions" , icon : <List size= {15} />},
    {name : "Budget" , icon : <Wallet size={15} />},
    {name : "Statistics" , icon: <ChartNoAxesCombined  size={15} />}
  ]
  
    return(
      <div>
        <div className="navbar_container">
          <Link to="/" style={{ textDecoration: 'none' }}>
          <motion.div className='navbar-content'
          whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}>
            {icons[0].icon}
            {icons[0].name}
          </motion.div>
          </Link>
          
          <Link to="/transactionList" style={{ textDecoration: 'none' }}>
          <motion.div className='navbar-content'
          whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}>
            {icons[1].icon}
            {icons[1].name}
          </motion.div>
          </Link>

          <Link to= "/budgetManagment" style={{ textDecoration: 'none' }}>
          <motion.div className='navbar-content'
          whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}>
            {icons[2].icon}
            {icons[2].name}
          </motion.div>
          </Link>

          <Link to= "/statistics" style={{ textDecoration: 'none' }}>
          <motion.div className='navbar-content'
          whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}>
            {icons[3].icon}
            {icons[3].name}
          </motion.div>
          </Link>

          <div >
            theme
          </div>
        </div>
      </div>
    )
}


export default NavBar