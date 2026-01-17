import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { Switch } from "@mui/material";
import { links, social } from "./data";
import logo from "../static/favicon-32x32.png";

const Navbar = ({ darkMode, onToggleTheme }) => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight + 30}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
      linksContainerRef.current.style.margin = "0px";
    }
  }, [showLinks]);

  return (
    <nav>
      <div className="nav-center">
        <div className="nav-header">
          <a href="/" aria-label="website logo">
            <img src={logo} alt="logo" />
          </a>
          <button
            className="nav-toggle"
            onClick={() => setShowLinks(!showLinks)}
            aria-label="toggle menue"
          >
            <FaBars />
          </button>
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <Link key={id} to={url}>
                    {text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <ul className="social-icons">
          {social.map((profile) => {
            const { id, url, icon } = profile;
            return (
              <li key={id}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="social icons"
                >
                  {icon}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="theme-picker">
          <BsFillSunFill className={darkMode ? "" : "hide-icon"} />

          <Switch
            checked={darkMode}
            onChange={onToggleTheme}
            slotProps={{ input: { "aria-label": "theme picker" } }}
          />

          <BsFillMoonFill className={darkMode ? "hide-icon" : ""} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
