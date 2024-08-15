import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import AppLayout from "./layouts/AppLayout"
import EmployeeList from "./components/EmployeeList"
import Home from "./pages/Home"
import MainLayout from "./layouts/MainLayout"
import Payments from "./pages/Payments"
import './pages/Media.css'
import Project from "./pages/Project"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppLayout />} >
          <Route element={<MainLayout />} >
            <Route index element={<Home />} />
            <Route path="/payments" element={<Payments />} />
            <Route path="/project" element={<Project />} />
            <Route path="employees" element={<EmployeeList />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  )
}

export default App
