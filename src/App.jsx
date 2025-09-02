import { useSnapshot } from "valtio";
import Canvas from "./canvas/index.jsx";
import Customizer from "./pages/Customizer.jsx";
import Home from "./pages/Home.jsx";
import state from "./store";

function App() {
  const snap = useSnapshot(state);

  return (
    <main className="app transition-all ease-in">
      <Home />
      <Canvas />
      {!snap.intro && <Customizer />}
    </main>
  );
}

export default App;
