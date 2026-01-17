import { Helmet } from "react-helmet-async";
const Home = () => {
  return (
    <>
      <Helmet>
        <title>LFM | Home</title>
        <meta
          name="description"
          content="Luis F. Mendiola from Escondido, CA 
          provides his full-stack software development skills and photography services during his free time. 
          He is open to other partnerships, business endeavors, and collaborations. Contact him today at luisfmendiola03@gmail.com."
        />
      </Helmet>
      <div className="center">
        <h1>Welcome!</h1>
        <div>
          <div>
            <h2>Need a full-stack software engineer?</h2>
            <p className="text-block">
              I can build you a personalized website for you or your business.
              All customized by you! I am also available to join a team as a
              full-stack software engineer.
            </p>

            <a
              href="/software-developer"
              className="btn-link"
              aria-label="link to developer page"
            >
              learn more
            </a>
          </div>
          <div>
            <h2>Need a photographer?</h2>
            <p className="text-block">
              As a hobby, I like to take pictures of lanscapes, people, and cool
              cars/trucks. If you need a picture, let me know! (Free for a
              limited time)
            </p>
            <a
              href="/photography"
              className="btn-link"
              aria-label="link to photography page"
            >
              learn more
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
