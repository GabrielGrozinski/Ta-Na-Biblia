import PaginaPrincipal from "./pages/pagina-principal";
import LoginLayout from "./pages/cadastro";
import { AllContext } from "./context/context";
import Teste from "./pages/teste";


export default function App() {

  return (
    <AllContext>
      <Teste />
    </AllContext>
  )
}
