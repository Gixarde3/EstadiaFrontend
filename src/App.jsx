import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  BrowserRouter
} from "react-router-dom";
import Login from "./pages/Login";
import { UserContextProvider } from "./contexts/UserContext";
import LayoutGeneral from "./layouts/LayoutGeneral";
import "./assets/css/general.css"
function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          
            <Route path="/" element={<Login/>}/>
            <Route path="/home" element={<LayoutGeneral />}>
              <Route path="alumno" element={<h1>Alumno</h1>} />
              <Route path="profesor" element={<h1>Profesor</h1>} />
              <Route path="director" element={<h1>Director</h1>} />
            </Route>
        </Routes>
        </BrowserRouter>
      </UserContextProvider>
  )
}

export default App
