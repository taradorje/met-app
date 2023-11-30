import { useState, useEffect } from "react";

// Stylesheets
import "../App.css";

// Assets
import metLogo from "../assets/met_logo.jpg";

// React Bootstrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const GalleryMap = ({ loading, favorites, setFavorites }) => {
  // MODAL
  const [selection, setSelection] = useState(null);

  const openModal = (item) => {
    setSelection(item);
  };

  const closeModal = () => {
    setSelection(null);
  };

  // FAVORITES
  const fetchFavorites = () => {
    const favoriteObjects = localStorage.getItem("favoriteObjects")
      ? JSON.parse(localStorage.getItem("favoriteObjects"))
      : [];
    setFavorites(favoriteObjects);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  // UNFAVORITE
  const unfavoriteHandler = (objectID) => {
    let favoriteObjects = localStorage.getItem("favoriteObjects")
      ? JSON.parse(localStorage.getItem("favoriteObjects"))
      : [];

    if (favoriteObjects.some((object) => object.objectID === objectID)) {
      favoriteObjects = favoriteObjects.filter(
        (object) => object.objectID !== objectID
      );
      localStorage.setItem("favoriteObjects", JSON.stringify(favoriteObjects));
    }
    setFavorites(favoriteObjects);
  };

  // GALLERIES
  const uniqueGalleries = [];
  favorites.forEach((favorite) => {
    if (!uniqueGalleries.includes(favorite.galleryNumber)) {
      uniqueGalleries.push(favorite.galleryNumber);
    }
  });

  uniqueGalleries.sort((a, b) => a - b);

  let galleriesString = "";
  if (uniqueGalleries.length === 1) {
    galleriesString = `Gallery ${uniqueGalleries[0]}`;
  } else if (uniqueGalleries.length === 2) {
    galleriesString = `Galleries ${uniqueGalleries.join(" & ")}`;
  } else if (uniqueGalleries.length > 2) {
    galleriesString = `Galleries ${uniqueGalleries
      .slice(0, -1)
      .join(", ")}, & ${uniqueGalleries.slice(-1)}`;
  }

  return (
    <>
      <Container fluid className="gallery-container">
        {/* SUMMARY */}
        <Row className="gallery-row">
          {loading && favorites.length === 0 && <h4>Loading...</h4>}
          {!loading && favorites.length === 0 && (
            <div>Please add your Favorite objects from the grid to begin.</div>
          )}
          {favorites.length > 0 && (
            <>
              <div style={{ textAlign: "center", paddingTop: "1rem" }}>
                <h2>Your MET route includes {galleriesString}.</h2>
                <OverlayTrigger
                  overlay={<Tooltip>➤ Click to view MET Map</Tooltip>}
                  placement={"right"}
                  delay={{ show: 150, hide: 150 }}
                >
                  <a
                    style={{ position: "relative", display: "inline-block" }}
                    href="https://maps.metmuseum.org/?screenmode=base&floor=1#hash=17/40.779448/-73.963517/-61"
                  >
                    <img src={metLogo} className="logo" alt="MET logo" />
                  </a>
                </OverlayTrigger>
              </div>
            </>
          )}
        </Row>
        {/* GALLERIES */}
        {uniqueGalleries.map((galleryNumber) => (
          <Row key={galleryNumber} className="gallery-row">
            <div>
              <h4>{`📍 Gallery ${galleryNumber}`}</h4>
              <ul
                style={{
                  display: "flex",
                  overflowX: "auto",
                  listStyle: "none",
                  padding: 0,
                }}
              >
                {favorites
                  .filter(
                    (favorite) => favorite.galleryNumber === galleryNumber
                  )
                  .map((favorite) => (
                    <div
                      key={favorite.objectID}
                      className="gallery-object"
                      style={{ textAlign: "center" }}
                    >
                      <img
                        src={favorite.imageURL}
                        alt={favorite.title}
                        style={{ height: "25vw", minHeight: "200px" }}
                        onClick={() => openModal(favorite)}
                      />
                      <br />
                      <br />
                      <p style={{ fontStyle: "italic" }}>{favorite.title}</p>
                    </div>
                  ))}
              </ul>
            </div>
          </Row>
        ))}
      </Container>
      {/* UNFAVORITE MODAL */}
      <Modal
        size="lg"
        show={selection !== null}
        onHide={closeModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{selection && <i>{selection.title}</i>}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selection && (
            <Row>
              <Col xs={12} md={6}>
                <img
                  src={selection.imageURL}
                  alt={selection.title}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col xs={6} md={6}>
                <p>
                  <span className="detail-title">Artist: </span>
                  {selection.artist}
                </p>
                <p>
                  <span className="detail-title">Medium: </span>
                  {selection.medium}
                </p>
                <p>
                  <span className="detail-title">Date: </span>
                  {selection.date}
                </p>
                <p>
                  <span className="detail-title">Dimensions: </span>
                  {selection.dimensions}
                </p>
                <p>
                  <span className="detail-title">Gallery: </span>
                  {selection.galleryNumber}
                </p>
                <p>
                  <span className="detail-title">Department: </span>
                  {selection.department}
                </p>
                <p>
                  <span className="detail-title">Credit Line: </span>
                  {selection.credit}.
                </p>
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer className="button-list">
          <Button onClick={closeModal} className="cancel-button">
            Close
          </Button>
          <Button
            onClick={() => {
              unfavoriteHandler(selection.objectID);
              closeModal();
            }}
            className="custom-button-undisabled"
          >
            Remove from Favorites
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GalleryMap;
