import useDarkMode from "../../contexts/DarkMode/useDarkMode";

export default function About() {
  const { darkMode } = useDarkMode();

  return (
    <div className="rounded-lg shadow-md mr-16 ml-16 mt-8">
      <div
        className={`container mx-auto  ${
          darkMode ? " text-white" : " text-neutral-700"
        }`}
      >
        <div className=" mt-5">
          <h1 className="text-2xl font-bold mb-5">About the Website</h1>

          <section className="mb-5">
            <h2 className="text-xl font-semibold mb-3">Introduction</h2>
            <p>
              I created this website to deepen my understanding of web design,
              statistics and economics, and to showcase my research to an
              audiance, who in my hope will find it interesting and may be
              interested to collaborate with me on a project.
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-xl font-semibold mb-3">Technologies Used</h2>
            <p>
              Tech Stack - Ubuntu (Linux), Nginx, Node JS, NPM, React, HTML,
              CSS, Tailwind, Python, Gnunicorn, Flask, CRON Job - JS, API,
              working with JSON, MongoDB - - EDA, stating a problem, linear
              regression - macroeconomic - placing a machine learning model in
              web based on scraped data and chat gpt interpretation
            </p>
          </section>

          <section className="mb-5">
            <h2 className="text-xl font-semibold mb-3">Data Overview</h2>
            <p>
              The data showcased here is curated from reputable sources and is
              processed to ensure accuracy and relevance. If you find any
              errors, please let me know by e-mail at:
              maciej.dziedzic9@gmail.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
