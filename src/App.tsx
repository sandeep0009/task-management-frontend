
import { Route,Routes } from "react-router-dom"
import { Signin } from "./page/Signin"
import { Signup } from "./page/Signup"
import { Layout } from "./components/Layout"
import { Home } from "./page/Home"
function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      </Route>
    </Routes>
    </>
  )
}

export default App
