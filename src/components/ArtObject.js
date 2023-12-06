import { useState } from "react";

// Stylesheets
import "../App.css";

// Components
import ModalComponent from "./ModalComponent";
import ObjectModalBody from "./ObjectModalBody";
import FavoriteFooter from "./FavoriteFooter";

// React Bootstrap Components
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const ArtObject = ({ object, setFavorites }) => {
  const [modal, setModal] = useState(false);

  // FAVORITES
  const checkFavorited = () => {
    let favoriteObjects = localStorage.getItem("favoriteObjects")
      ? JSON.parse(localStorage.getItem("favoriteObjects"))
      : [];

    return favoriteObjects.some(
      (favorite) => favorite.objectID === object.objectID
    );
  };

  const favoriteObject = () => {
    if (!checkFavorited(object.objectID)) {
      let favoriteObjects = localStorage.getItem("favoriteObjects")
        ? JSON.parse(localStorage.getItem("favoriteObjects"))
        : [];
      const newFavoriteObject = { ...object };
      favoriteObjects.push(newFavoriteObject);
      localStorage.setItem("favoriteObjects", JSON.stringify(favoriteObjects));
      setFavorites(favoriteObjects);
    }
  };

  return (
    <>
      {/* OBJECTS */}
      <Col className="p-0 d-flex justify-content-center">
        <Card
          className="art-object"
          onClick={() => setModal(true)}
          style={{
            backgroundImage: `url(${object.imageURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Col>
      {/* OBJECT MODAL */}
      <ModalComponent
        show={modal}
        handleClose={() => setModal(false)}
        title={<i>{object.title}</i>}
        body={<ObjectModalBody {...object} />}
        footerClassName="button-list"
        footer={
          <FavoriteFooter
            objectID={object.objectID}
            title={object.title}
            setModal={setModal}
            checkFavorited={checkFavorited}
            favoriteObject={favoriteObject}
          />
        }
      />
    </>
  );
};

export default ArtObject;
