import "./App.css";
import metLogo from "./assets/met_logo.jpg";

import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Grid from "./components/Grid.js";
import FavoritesGrid from "./components/FavoritesGrid.js";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  const [objects, setObjects] = useState([]);

  const fetchMetData = async () => {
    const maxCards = 8;
    const response = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&hasImages=true&q=Auguste Renoir`
    );
    const data = await response.json();

    if (data && data.objectIDs) {
      const objectIDs = data.objectIDs.slice(0, maxCards);

      const cards = [];

      for (const objectID of objectIDs) {
        const objectResponse = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
        );
        const objectData = await objectResponse.json();

        const card = {
          objectID,
          objectTitle: objectData.title,
          imageURL: objectData.primaryImage,
          galleryNumber: objectData.GalleryNumber,
        };

        cards.push(card);
      }
      setObjects(cards);
    }
  };

  useEffect(() => {
    fetchMetData();
  }, []);

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
          <Col md={4}>
            <FavoritesGrid />
          </Col>
          <Col md={8}>
            <Grid objects={objects} />
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
