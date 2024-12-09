import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Projects from "./pages/Project/Projects";
import Project2025 from "./pages/Project/Project2025";
import Gallamiddag from "./pages/Events/Gallamiddag";

const App = () => {
  return (
    <>
      <Header />
      <main className="page-content">
        <Routes>
          <Route path="/" element={<div>Forside</div>} />
          <Route path="/Projekter" element={<Projects />} />
          <Route path="/Projekter/Projekt-2025" element={<Project2025 />} />
          <Route
            path="/Projekter/Projekt-2023"
            element={<div>Projekt 2023</div>}
          />
          <Route
            path="/Projekter/Projekt-2022"
            element={<div>Projekt 2022</div>}
          />
          <Route
            path="/Projekter/Projekt-2019"
            element={<div>Projekt 2019</div>}
          />
          <Route
            path="/Projekter/Projekt-2018"
            element={<div>Projekt 2018</div>}
          />
          <Route
            path="/Projekter/Projekt-2017"
            element={<div>Projekt 2017</div>}
          />
          <Route
            path="/Events/Gallamiddag"
            element={<Gallamiddag />}
          />
          <Route
            path="/Events/Torveevent-2025"
            element={<div>Torveevent 2025</div>}
          />
          <Route path="/Om-hudcancer" element={<div>Hvad er hudcancer</div>} />
          <Route path="/Om-os" element={<div>Hvem er vi</div>} />
          <Route path="/Kontakt" element={<div>Kontakt</div>} />
          <Route path="/Galleri" element={<div>Galleri</div>} />
          <Route path="/Stoet-nu" element={<div>Støt nu</div>} />
          <Route path="/Sponsorer" element={<div>Sponsorer</div>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
