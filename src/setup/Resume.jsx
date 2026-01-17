import { Helmet } from "react-helmet-async";
import pdf from "../static/LuisMendiola_Resume.pdf";

const Resume = () => {
  return (
    <>
      <Helmet>
        <title>LFM | Resume</title>
        <meta name="description" content="Resume of Luis F. Mendiola" />
      </Helmet>
      <div className="center">
        <h1>My Resume</h1>
        <iframe
          title="Luis Mendiola Resume"
          src={`${pdf}#view=fitH`}
          width="auto"
          height="480"
          allow="autoplay"
        ></iframe>
      </div>
    </>
  );
};

export default Resume;
