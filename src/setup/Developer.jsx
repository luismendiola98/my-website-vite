import { Helmet } from "react-helmet-async";
const Developer = () => {
  return (
    <>
      <Helmet>
        <title>LFM | Software Developer</title>
        <meta
          name="description"
          content="Luis F. Mendiola is a mid-level software engineer that graduated from California State University of San Marcos with a B.S. in Computer Science in the spring of 2020. 
          He has professional experience using .NET/C#, SQL, JavaScript, HTML, CSS, Microsoft Azure, Azure DevOps, and Agile methodology. 
          Academically, he has experience using C++, Python, React, React Native, and Google Firebase."
        />
      </Helmet>
      <div className="container">
        <h1>Make a unique website with me</h1>
        <p>
          As mentioned in my <a href="/about">about</a> page, I am an alumnus of{" "}
          <a href="https://www.csusm.edu" target="_blank" rel="noreferrer">
            California State University San Marcos
          </a>
          . I received my Bachelor of Science in Computer Science in Spring
          2020, and I am passionate about creating and learning within the
          Software Engineering field.
        </p>
        <p>
          I started my software engineering career with{" "}
          <a href="https://www.umetech.net" target="_blank" rel="noreferrer">
            Umetech, Inc.
          </a>{" "}
          as an intern towards the end of my last semester in college. Shorlty
          after, I became a full-time software engineer. Currently, I am
          continuing my software engineering career at{" "}
          <a href="http://www.upperdeck.com" target="_blank" rel="noreferrer">
            Upper Deck
          </a>
          .
        </p>
        <h2>Why you need a website</h2>
        <p>
          A personal website looks professional and makes you stand out from the
          rest. If you are a business owner, a website for your business is a
          must. Having a website can help increase your ROI and overall traffic
          to your business. Contact me today to help you with getting started on
          creating your custom made site!
        </p>
        <h2>Available as a Software Engineer</h2>
        <p>I am familiar with:</p>
        <ul className="list">
          <li>C#/.NET</li>
          <li>C++</li>
          <li>Python</li>
          <li>JavaScript</li>
          <li>React</li>
          <li>HTML</li>
          <li>CSS</li>
          <li>SQL</li>
          <li>Google Firebase</li>
          <li>Microsoft Azure</li>
          <li>GitHub</li>
          <li>Postman</li>
        </ul>
        <p>
          Check out my{" "}
          <a
            href="https:www.github.com/luismendiola98"
            target="_blank"
            rel="noreferrer"
          >
            GitHub profile
          </a>{" "}
          or view my <a href="/resume">resume</a>
        </p>
      </div>
    </>
  );
};

export default Developer;
