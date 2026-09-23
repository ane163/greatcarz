import { useState, useEffect } from "react";
import "./Nav.css";
import "./Update.css"

function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={scrolled ? "nav scrolled" : "nav"}>
      <h2>NiceCars</h2>

      {/* Your navigation links and icons */}
    </nav>
  );
}

export default Nav;