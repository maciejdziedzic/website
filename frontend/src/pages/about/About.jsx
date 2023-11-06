import useDarkMode from "../../contexts/DarkMode/useDarkMode";

export default function About() {
  const { darkMode } = useDarkMode();
  const techClassName = `${
    darkMode ? "text-amber-400 font-bold" : "text-blue-700 font-bold"
  }`;

  return (
    <div className=" md:mr-16 md:ml-16 m-8">
      <div className={`container mx-auto mt-4 ${darkMode ? "" : ""}`}>
        <h1 className="flex justify-center text-2xl md:text-3xl font-bold mb-5">
          About the Website
        </h1>

        <section className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Introduction</h2>
          <p>
            I created this website to deepen my understanding of web technology,
            economics and statistics. It serves to showcase my research to an
            audience whom I hope will find it intriguing and potentially wish to
            collaborate on future projects. I am particularly interested in
            working in finance, healthcare or in the field of computer vision.
          </p>
        </section>

        <section className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Technologies Used</h2>

          <ul className="list-disc pl-5 mb-4">
            <li>
              Operating System & Server: Hosted on an Ubuntu server with Nginx
              handling the web serving operations. PM2 is used as a process
              manager for Node.js and Gunicorn.
            </li>
            <li>
              Frontend: Interactive user interface designed with{" "}
              <span className={techClassName}>Node.js</span> and{" "}
              <span className={techClassName}>React</span> in{" "}
              <span className={techClassName}>JavaScript</span>.
            </li>
            <li>
              Backend: A <span className={techClassName}>Python</span>-powered
              backend, with a <span className={techClassName}>Flask </span>
              application served through Gunicorn.
            </li>
          </ul>
          <h3 className="text-lg font-semibold mb-2">Projects</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>
              Asset Returns: Visualization of data from CSV file using the
              Chart.js library.
            </li>
            <li>
              Macroeconomic Chart: Features an automated data retrieval system
              established with CRON job. This system fetches data from an{" "}
              <span className={techClassName}>API{""}</span> monthly, stores it
              in <span className={techClassName}>MongoDB{""}</span>, and then
              visualizes it with Chart.js.
            </li>
            <li>
              FED Policy Model: Developed an API that feeds data into a{" "}
              <span className={techClassName}>machine learning model</span>. The
              model, managed with the joblib library, is enhanced with
              interpretations from the Chat GPT API of the Federal
              Reserve&apos;s press releases.
            </li>
          </ul>
        </section>

        <section className="mb-5">
          <h2 className="text-xl font-semibold mb-3">Data Overview</h2>
          <p>
            The data presented here is curated from sources believed to be
            reliable and is processed to ensure accuracy and relevance. If you
            find any discrepancies, please let me know via email.
          </p>
        </section>
      </div>
    </div>
  );
}
