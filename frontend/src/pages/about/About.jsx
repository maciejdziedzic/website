import useDarkMode from "../../contexts/DarkMode/useDarkMode";

export default function About() {
  const { darkMode } = useDarkMode();

  return (
    <div
      className={`container mx-auto mt-10 p-5 ${
        darkMode ? "bg-neutral-700 text-white" : "bg-white text-neutral-700"
      }`}
    >
      <h1 className="text-2xl font-bold mb-5">About the Website</h1>

      <section className="mb-5">
        <h2 className="text-xl font-semibold mb-3">Introduction</h2>
        <p>
          Welcome to [Your Website Name], a platform dedicated to showcasing
          intricate data visualizations and in-depth analysis of key financial
          metrics. Our aim is to provide insights and perspectives that are both
          informative and thought-provoking.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="text-xl font-semibold mb-3">Motives</h2>
        <p>
          The driving force behind this website is a passion for data analytics
          and a curiosity to uncover patterns and insights in the financial
          world. It&apos;s an endeavor to make complex data more accessible and
          understandable to a wider audience.
        </p>
      </section>

      <section className="mb-5">
        <h2 className="text-xl font-semibold mb-3">Technologies Used</h2>
        <p>
          Tech Stack - Ubuntu (Linux), Nginx, Node JS, NPM, React, HTML, CSS,
          Tailwind, Python, Gnunicorn, Flask, CRON Job - JS, API, working with
          JSON, MongoDB - - EDA, stating a problem, linear regression -
          macroeconomic - placing a machine learning model in web based on
          scraped data and chat gpt interpretation
        </p>
      </section>

      <section className="mb-5">
        <h2 className="text-xl font-semibold mb-3">Data Overview</h2>
        <p>
          The data showcased here is curated from reputable sources and is
          processed to ensure accuracy and relevance. From macroeconomic
          indicators to asset returns, we aim to provide a comprehensive look at
          the financial landscape.
        </p>
      </section>
    </div>
  );
}
