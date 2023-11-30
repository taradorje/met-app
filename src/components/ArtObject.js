import { useState } from "react";

// Stylesheets
import "../App.css";

// React Bootstrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const ArtObject = ({
  objectID,
  title,
  artist,
  imageURL,
  galleryNumber,
  medium,
  date,
  dimensions,
  department,
  credit,
  setFavorites,
}) => {
  // MODAL
  const [modal, setModal] = useState(false);

  // FAVORITES
  const favoriteHandler = () => {
    let favoriteObjects = localStorage.getItem("favoriteObjects")
      ? JSON.parse(localStorage.getItem("favoriteObjects"))
      : [];

    const newFavoriteObject = {
      objectID,
      title,
      artist,
      imageURL,
      galleryNumber,
      medium,
      date,
      dimensions,
      department,
      credit,
    };

    if (
      !favoriteObjects.some(
        (favorite) => favorite.objectID === newFavoriteObject.objectID
      )
    ) {
      favoriteObjects.push(newFavoriteObject);
      localStorage.setItem("favoriteObjects", JSON.stringify(favoriteObjects));
      setFavorites(favoriteObjects);
    }
  };

  const checkFavorited = (objectID) => {
    let favoriteObjects = localStorage.getItem("favoriteObjects")
      ? JSON.parse(localStorage.getItem("favoriteObjects"))
      : [];

    return !favoriteObjects.some((favorite) => favorite.objectID === objectID);
  };

  return (
    <>
      {/* OBJECTS */}
      <Col className="p-0 d-flex justify-content-center">
        <Card
          onClick={() => setModal(true)}
          style={{
            backgroundImage: `url(${imageURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            margin: "10px",
            height: "200px",
            width: "200px",
            boxShadow: "0 0 5px black",
          }}
        />
      </Col>
      {/* OBJECT MODAL */}
      <Modal
        size="lg"
        show={modal}
        onHide={() => setModal(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title id="contained-modal-title-vcenter">
            <i>{title}</i>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} md={6}>
              <img src={imageURL} style={{ width: "100%" }} alt={title} />
            </Col>
            <Col xs={6} md={6}>
              <p>
                <span className="detail-title">Artist:</span> {artist}
              </p>
              <p>
                <span className="detail-title">Medium:</span> {medium}
              </p>
              <p>
                <span className="detail-title">Date:</span> {date}
              </p>
              <p>
                <span className="detail-title">Dimensions:</span> {dimensions}
              </p>
              <p>
                <span className="detail-title">Gallery:</span> {galleryNumber}
              </p>
              <p>
                <span className="detail-title">Department:</span> {department}
              </p>
              <p>
                <span className="detail-title">Credit Line:</span> {credit}.
              </p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="button-list">
          {/* CANCEL BUTTON */}
          <Button
            onClick={() => setModal(false)}
            variant="secondary"
            className="cancel-button"
          >
            Cancel
          </Button>
          {/* ADD TO FAVORITES BUTTON */}
          {!checkFavorited(objectID) && (
            <OverlayTrigger
              overlay={
                <Tooltip
                  id="button-tooltip tooltip-disabled"
                  style={{ position: "absolute" }}
                >
                  {`${title} is already in your Favorites.`}
                </Tooltip>
              }
              delay={{ show: 150, hide: 150 }}
            >
              <span>
                <Button
                  disabled={!checkFavorited(objectID)}
                  className="custom-button-disabled"
                >
                  Add to Favorites
                </Button>
                {}
              </span>
            </OverlayTrigger>
          )}
          {checkFavorited(objectID) && (
            <span>
              <Button
                onClick={() => {
                  favoriteHandler();
                  setModal(false);
                }}
                className="custom-button-undisabled"
              >
                Add to Favorites
              </Button>
            </span>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ArtObject;
