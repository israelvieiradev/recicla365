import { Route, Routes } from "react-router";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/criar-conta" Component={Register} />
      </Routes>
    </>
  )
}

export default App