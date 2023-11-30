import { useState, useEffect } from "react";

// Stylesheets
import "../App.css";

// React Bootstrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Material UI Components
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const FavoritesGrid = ({ loading, favorites, setFavorites }) => {
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

  // MATERIAL UI IMAGELIST FUNCTION
  const srcset = (image, size, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${size * cols}&h=${
        size * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  };

  return (
    <>
      {/* FAVORITES */}
      <Row className="p-0">
        <div
          className={
            loading ? "loading-text modal-background" : "modal-background"
          }
        >
          {loading && <h4>Loading...</h4>}
          {!loading && favorites.length === 0 && (
            <div className="loading-text">
              Please add your Favorite objects from the grid to begin.
            </div>
          )}
        </div>
        {!loading && favorites.length > 0 && (
          <ImageList
            className="favorites-grid"
            variant="quilted"
            cols={4}
            rowHeight={121}
            gap={0}
          >
            {favorites.map((item) => (
              <ImageListItem
                key={item.imageURL}
                cols={item.cols || 1}
                rows={item.rows || 1}
                style={{ height: "100%" }}
              >
                <img
                  {...srcset(item.imageURL, 121, item.rows, item.cols)}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                  }}
                  onClick={() => openModal(item)}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
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
      </Row>
    </>
  );
};

export default FavoritesGrid;
