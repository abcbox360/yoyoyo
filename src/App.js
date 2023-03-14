import Header from "./Header"
import HomePage from "./HomePage"
import Login from "./Login"
import { useState } from "react"


function App() {
  const [login, setLogin] = useState(false)
  return <div>
    <Header></Header>
    {login && <HomePage />}
    {!login && <Login setLogin={setLogin} />}
    </div>
  ;
}

export default App;
