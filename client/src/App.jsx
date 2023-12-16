import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import SignIn from "./pages/SignIn"
import Profile from "./pages/Profile"
import Header from "./components/Header"
import SignUp from "./pages/SignUp"
import MyProfileRoute from "./components/MyProfileRoute"

function App() {

  return (
     <BrowserRouter>
<Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/sign-in" element={<SignIn/>}/>
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route element={<MyProfileRoute/>}>
      <Route path="/profile" element={<Profile/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
