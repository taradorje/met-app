import { useState } from "react";

// Stylesheets
import "../App.css";

// React Bootstrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const FavoriteObject = ({
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
  const [modal, setModal] = useState(false);

  const unfavoriteHandler = () => {
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

  return (
    <>
      <Col className="p-0 d-flex justify-content-center">
        <Card
          onClick={() => setModal(true)}
          style={{
            backgroundImage: `url(${imageURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            margin: "10px",
            height: "500px",
            width: "400px",
          }}
          className="p-0"
        />
      </Col>
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
        <Modal.Body className="modal-body">
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
          <Button onClick={() => setModal(false)} className="cancel-button">
            Cancel
          </Button>
          <Button
            onClick={() => {
              unfavoriteHandler();
              setModal(false);
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

export default FavoriteObject;
