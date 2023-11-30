import { useState } from "react";

// Stylesheets
import "./App.css";

// Assets
import metLogo from "./assets/met_logo.jpg";

// Components
import ArtGrid from "./components/ArtGrid.js";
import FavoritesGrid from "./components/FavoritesGrid.js";
import GalleryMap from "./components/GalleryMap.js";

// React Bootstrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

// Material UI Components
import LinearProgress from "@mui/material/LinearProgress";

function App() {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [favoritesModal, setFavoritesModal] = useState(false);
  const [galleryModal, setGalleryModal] = useState(false);

  return (
    <>
      <Container fluid className="p-0">
        <Row className="justify-content-end p-0">
          {/* SIDEBAR */}
          <Col md={2} className="sidebar p-0">
            <a href="https://taradorje.github.io/met-app/">
              <img
                src={metLogo}
                alt="MET Logo"
                width="auto"
                className="sidebar-logo"
              />
            </a>
            <h3>Instructions:</h3>
            <ol>
              <li>
                Select an object from the grid to add it to your Favorites.
              </li>
              <li>Click on 'View Favorites' to view your favorite objects.</li>
              <li>
                Click on 'View Map' to view the locations of your favorite
                objects in The MET.
              </li>
            </ol>
            <div className="d-grid gap-2">
              <Button
                size="lg"
                className="custom-button shadow-md tab"
                onClick={(e) => {
                  setFavoritesModal(true);
                  e.currentTarget.blur();
                }}
              >
                View Favorites
              </Button>
              <Button
                size="lg"
                className="custom-button shadow-md tab"
                onClick={(e) => {
                  setGalleryModal(true);
                  e.currentTarget.blur();
                }}
              >
                View Gallery Map
              </Button>
            </div>
            <div>
              <OverlayTrigger
                overlay={<Tooltip>➤ Link to full MET Collection</Tooltip>}
                placement={"right"}
                delay={{ show: 150, hide: 150 }}
              >
                <a href="https://www.metmuseum.org/art/the-collection">
                  <img src={metLogo} className="logo" alt="MET logo" />
                </a>
              </OverlayTrigger>
            </div>
          </Col>
          {/* ART GRID */}
          <Col md={10} className="art-grid">
            {loading && (
              <>
                <h2>Loading</h2>
                <LinearProgress className="loading-bar" color="inherit" />
              </>
            )}
            <ArtGrid setLoading={setLoading} setFavorites={setFavorites} />
          </Col>
        </Row>
      </Container>
      {/* FAVORITES */}
      <Modal
        size="lg"
        show={favoritesModal}
        onHide={() => setFavoritesModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        fullscreen
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title id="contained-modal-title-vcenter">
            Favorites
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-background">
          <FavoritesGrid
            loading={loading}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        </Modal.Body>
      </Modal>
      {/* GALLERY MAP */}
      <Modal
        size="xl"
        show={galleryModal}
        onHide={() => setGalleryModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        fullscreen
        className="gallery-map"
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title id="contained-modal-title-vcenter">
            Galleries
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-background">
          <GalleryMap
            loading={loading}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default App;
