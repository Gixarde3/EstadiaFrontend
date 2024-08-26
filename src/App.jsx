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
import Editar from "./pages/Editar";
import Nuevo from "./pages/Nuevo";
import GestionCarreras from "./pages/GestionCarreras";
import GestionDirectores from "./pages/GestionDirectores";
import GestionPlanesEducativos from "./pages/GestionPlanesEducativos";
import axios from "axios";
function App() {
  axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          
            <Route path="/" element={<Login/>}/>
            <Route path="/solicitar_token" element={<SolicitarToken/>}/>
            <Route path="/cambiar-contrasena/:token" element={<CambiarContrasenia/>}/>
            <Route path="/home" element={<LayoutGeneral />}>
              <Route path=":modelo/editar/:id" element={<Editar/>}/>
              <Route path=":modelo/nuevo" element={<Nuevo/>}/>
              <Route path="alumno" element={<h1>Alumno</h1>} />
              <Route path="profesor" element={<h1>Profesor</h1>} />
              <Route path="director" element={<PrincipalDirector/>}/>
              <Route path="usuarios" element={<GestionUsuarios/>}/>
              <Route path="carreras" element={<GestionCarreras/>}/>
              <Route path="directores" element={<GestionDirectores/>}/>
              <Route path="planes-educativos" element={<GestionPlanesEducativos/>}/>
            </Route>
        </Routes>
        </BrowserRouter>
      </UserContextProvider>
  )
}

export default App
