import { Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
  return (
    <div>
      <Routes>

        <Route 
        path="/"
        element={<Login/>}
        />

        <Route
        path="/register"
        element={<Register/>
        }/>

      </Routes>
    
    </div>
  );
}

export default App;
