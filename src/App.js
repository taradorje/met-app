import { useState } from "react";

import "./App.css";

import metLogo from "./assets/met_logo.jpg";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import ArtGrid from "./components/ArtGrid.js";
import FavoritesGrid from "./components/FavoritesGrid.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  return (
    <>
      <Navbar className="nav" data-bs-theme="dark" fixed="top">
        <Container>
          <Navbar.Brand href="#home">Meet Me @ MET</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#favorites">Favorites</Nav.Link>
            <Nav.Link href="#route">Route</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Row xs={1} md={12} className="g-4" style={{ paddingTop: "50px" }}>
          {loading && <h2>Loading...</h2>}
          <Col md={4}>
            <FavoritesGrid
              loading={loading}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          </Col>
          <Col md={8}>
            <ArtGrid setLoading={setLoading} setFavorites={setFavorites} />
          </Col>
        </Row>
      </Container>
      <div>
        <a href="https://www.metmuseum.org/art/the-collection">
          <img src={metLogo} className="logo" alt="MET logo" />
        </a>
      </div>
      <h1>Meet Me @ MET</h1>
      <p className="read-the-docs">
        Click <a href="https://metmuseum.github.io/">here</a> to read the MET
        API documentation.
      </p>
    </>
  );
}

export default App;
