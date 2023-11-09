import populateFavorites from "./populateFavorites";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const FavoriteObject = ({
  objectID,
  imageURL,
  title,
  galleryNumber,
  setFavorites,
}) => {
  const clickHandler = async () => {
    const favoritesExist = localStorage.getItem("favoriteObjects");
    let favoriteObjects = favoritesExist
      ? JSON.parse(localStorage.getItem("favoriteObjects"))
      : [];

    if (favoriteObjects.includes(objectID)) {
      favoriteObjects = favoriteObjects.filter((object) => object !== objectID);
      localStorage.setItem("favoriteObjects", JSON.stringify(favoriteObjects));
      console.log("Unfavorited");
      setFavorites(await populateFavorites());
    }
  };

  return (
    <Col>
      <Card onClick={clickHandler}>
        <Card.Img variant="top" src={imageURL} />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            An object from the MET collection. Located in Gallery{" "}
            {galleryNumber}.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default FavoriteObject;
