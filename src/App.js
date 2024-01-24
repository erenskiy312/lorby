import { Route, Routes } from "react-router-dom";
import ConfirmEmail from "./components/Auth/ConfirmEmail";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";

function App() {
  return (
    <div>
      <Routes>

        <Route 
        path="/login"
        element={<Login/>}
        />

        <Route
        path="/register"
        element={<Register/>
        }/>

        <Route
        path="/confirm-email"
        element={<ConfirmEmail/>}/>

        <Route
        path="/home"
        element={<Home/>}/>

      </Routes>
    
    </div>
  );
}

export default App;
