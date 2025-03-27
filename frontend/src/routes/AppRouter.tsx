import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home } from "../pages/Home";

export const AppRouter = () => {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  )
}