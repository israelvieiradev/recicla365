import { Route, Routes } from "react-router";
import Register from "./pages/Register/Register";
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/criar-conta" Component={Register} />
      </Routes>
    </>
  )
}

export default App