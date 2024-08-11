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
import PrincipalDirector from "./pages/PrincipalDirector";
import "./assets/css/general.css"
import GestionUsuarios from "./pages/GestionUsuarios";
import SolicitarToken from "./pages/SolicitarToken";
import CambiarContrasenia from "./pages/CambiarContrasenia";
function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          
            <Route path="/" element={<Login/>}/>
            <Route path="/solicitar_token" element={<SolicitarToken/>}/>
            <Route path="/cambiar-contrasena/:token" element={<CambiarContrasenia/>}/>
            <Route path="/home" element={<LayoutGeneral />}>
              <Route path="alumno" element={<h1>Alumno</h1>} />
              <Route path="profesor" element={<h1>Profesor</h1>} />
              <Route path="director" element={<PrincipalDirector/>}/>
              <Route path="usuarios" element={<GestionUsuarios/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
      </UserContextProvider>
  )
}

export default App
