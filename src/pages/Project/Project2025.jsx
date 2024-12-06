import { motion as m } from "framer-motion";
import Breadcrumb from "../../components/Breadcrumb/Breadcrumb";

const Project2025 = () => {
  return (
    <>
      <Breadcrumb />
      <m.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="project-container">
          <h1>Projekt 2025</h1>

          <section className="project-intro">
            <h2>Om Projekt 2025</h2>
            <p>
              I 2025 sætter vi endnu engang fokus på kampen mod hudkræft i Vejle
              Kommune. Vores mål er at øge bevidstheden om forebyggelse og
              tidlig opdagelse af hudkræft.
            </p>
          </section>

          <section className="project-goals">
            <h2>Lorem ipsum dolor sit amet</h2>
            <ul>
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consectetur reprehenderit perspiciatis nostrum, voluptates nam
                laborum recusandae placeat tempora? At non maiores velit impedit
                rem nostrum veniam corporis. Odit, tempora dicta!
              </li>
            </ul>
          </section>
        </div>
      </m.main>
    </>
  );
};

export default Project2025;
