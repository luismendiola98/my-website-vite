import { Link } from "react-router-dom";
import { BiError } from "react-icons/bi";
import { Helmet } from "react-helmet-async";
const Error = () => {
  return (
    <>
      <Helmet>
        <title>LFM | Oops... Error</title>
        <meta
          name="description"
          content="Error page for luismendiola.com. Return back to the home page"
        />
      </Helmet>
      <div>
        <h1>
          Error <BiError />
        </h1>
        <p>Oops... </p>
        <p>An error occur processing your request</p>
        <p>
          {" "}
          Go back{" "}
          <Link to="/" className="btn">
            Home
          </Link>
        </p>
      </div>
    </>
  );
};

export default Error;
