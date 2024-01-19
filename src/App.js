import React  from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Signup/Signup";
// import {auth} from './Firebase'
import TaskPage from './pagess/TaskPage'

const App = () => {


  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          {/* <Route path='/' element={<Home name={userName} />} /> */}
          <Route path='/' element={<TaskPage/>} />
        </Routes>

      </Router> 
    </div>
  )
}

export default App
