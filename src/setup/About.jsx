import { Helmet } from "react-helmet-async";
import img from "../static/LuisMendiola.jpg";

const About = () => {
  const years = () => {
    var dob = new Date(1998, 2, 6);
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getFullYear() - 1970);
  };
  return (
    <>
      <Helmet>
        <title>LFM | About</title>
        <meta
          name="description"
          content="A little bit more about Luis F. Mendiola and the services he provides on his free time. You can reach out to him at luisfmendiola03@gmail.com for any questions you may have related to his software development and photography services."
        />
      </Helmet>
      <div className="container">
        <div className="center">
          <img className="avatar" alt="Luis Mendiola Portrait" src={img} />
        </div>

        <h1>About me</h1>
        <p>
          Hello, my name is Luis F. Mendiola, and I am a {years()}-year-old
          first-generation college graduate from California State University San
          Marcos born and raised in Escondido, CA. I created this site to
          provide my services to you in my free time. My services include{" "}
          <a href="/software-developer" aria-label="link to developer page">
            software development
          </a>{" "}
          and{" "}
          <a href="/photography" aria-label="link to photography page">
            photography
          </a>
          . Feel free to browse around my site and look at the services I
          provide, and if interested in one of my services, go ahead and contact
          me using one of the methods provided at the footer of any page. Also,
          if you know someone who would benefit from my services, please feel
          free to refer them to{" "}
          <a href="/" aria-label="link to home page">
            this site
          </a>
          . I am also open to any other partnerships, business endeavors, or
          collaborations related to the services that I provide.
        </p>
        <p>Thank you for visiting, and I hope you have an excellent day!</p>
      </div>
    </>
  );
};

export default About;
