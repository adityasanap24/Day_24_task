import { Navbar, Container, Nav } from "react-bootstrap";
import { useState } from "react";
import "./css/nav-bar.css";

const NavigationBar = ({ onIndexChanged, initialIndex = 0 }) => {
  const getLinkClass = (index) => {
    return selectedIndex === index ? "nav-links selected" : "nav-links";
  };
  const [selectedIndex, setIndex] = useState(initialIndex);

  const changeIndex = (index) => {
    onIndexChanged(index);
    setIndex(index);
  };

  return (
    <>
      <Navbar>
        <Container className="inner-content">
          <Nav.Link
            onClick={() => changeIndex(0)}
            className={getLinkClass(0)}
            href="#home"
          >
            Home
          </Nav.Link>
          <Nav.Link
            onClick={() => changeIndex(1)}
            className={getLinkClass(1)}
            href="#add-movie"
          >
            Add Movie
          </Nav.Link>
          <Nav.Link
            onClick={() => changeIndex(2)}
            className={getLinkClass(2)}
            href="#search"
          >
            Search
          </Nav.Link>
          <Nav.Link
            onClick={() => changeIndex(3)}
            className={getLinkClass(3)}
            href="#about"
          >
            About
          </Nav.Link>
        </Container>
      </Navbar>
    </>
  );
};

export default NavigationBar;
