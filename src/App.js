import { useState } from "react";

// Stylesheets
import "./App.css";

// Components
import ArtGrid from "./components/ArtGrid";
import Sidebar from "./components/Sidebar";
import FavoritesGrid from "./components/FavoritesGrid";
import GalleryMap from "./components/GalleryMap";
import ModalComponent from "./components/ModalComponent";

// React Bootstrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

// Material UI Components
import LinearProgress from "@mui/material/LinearProgress";

function App() {
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  // MODAL
  const [activeModal, setActiveModal] = useState(null);

  const openModal = (modalName) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  return (
    <>
      <Container fluid className="p-0">
        <Row className="justify-content-end p-0">
          {/* SIDEBAR */}
          <Col md={2} className="sidebar p-0">
            <Sidebar openModal={openModal} />
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
      {/* VIEW FAVORITES */}
      <ModalComponent
        size="fullscreen"
        show={activeModal === "favorites"}
        handleClose={closeModal}
        title="Favorites"
        bodyClassName="modal-background"
        body={
          <FavoritesGrid
            loading={loading}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        }
      />
      {/* VIEW GALLERY LIST */}
      <ModalComponent
        size="fullscreen"
        show={activeModal === "gallery"}
        handleClose={closeModal}
        title="Galleries"
        bodyClassName="modal-background"
        body={
          <GalleryMap
            loading={loading}
            favorites={favorites}
            setFavorites={setFavorites}
          />
        }
      />
    </>
  );
}

export default App;
