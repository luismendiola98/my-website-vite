import { Helmet } from "react-helmet-async";

const Resume = () => {
  return (
    <>
      <Helmet>
        <title>LFM | Resume</title>
        <meta name="description" content="Resume of Luis F. Mendiola" />
      </Helmet>
      <div className="center">
        <h1>Resume</h1>

        <div>
          <a
            className="btn-link"
            href="/Luis_Mendiola_Resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
          >
            Download Resume
          </a>
        </div>

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <iframe
            src="/Luis_Mendiola_Resume.pdf"
            width="100%"
            height="600px"
            style={{ border: "none", overflow: "hidden" }}
            title="Resume"
          />
        </div>
      </div>
    </>
  );
};

export default Resume;
