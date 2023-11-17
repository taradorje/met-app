import { useState } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

const FavoriteObject = ({
  objectID,
  title,
  artist,
  imageURL,
  galleryNumber,
  setFavorites,
}) => {
  const [modal, setModal] = useState(false);

  const showModal = () => {
    setModal(true);
  };

  const hideModal = () => {
    setModal(false);
  };

  const clickHandler = () => {
    let favoriteObjects = localStorage.getItem("favoriteObjects")
      ? JSON.parse(localStorage.getItem("favoriteObjects"))
      : [];

    if (favoriteObjects.some((object) => object.objectID === objectID)) {
      favoriteObjects = favoriteObjects.filter(
        (object) => object.objectID !== objectID
      );
      localStorage.setItem("favoriteObjects", JSON.stringify(favoriteObjects));
      // console.log("Unfavorited");
    }
    setFavorites(favoriteObjects);
  };

  return (
    <>
      <Col>
        <Card onClick={showModal}>
          <Card.Img variant="top" src={imageURL} />
          {/* <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              An object from the MET collection. Located in Gallery{" "}
              {galleryNumber}.
            </Card.Text>
          </Card.Body> */}
        </Card>
      </Col>
      <Modal
        size="md"
        show={modal}
        onHide={hideModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Title: {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={12} md={6}>
              <img src={imageURL} style={{ width: "100%" }} alt={title} />
            </Col>
            <Col xs={6} md={6}>
              <p>Artist: {artist}</p>
              <p>Gallery: {galleryNumber}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={hideModal} variant="secondary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              clickHandler();
              hideModal();
            }}
            variant="primary"
          >
            Remove from Favorites
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FavoriteObject;
