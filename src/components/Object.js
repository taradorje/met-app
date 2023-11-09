import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

const Object = ({ objectID, imageURL, title, galleryNumber, setCardList }) => {
  const clickHandler = () => {
    const favoritesExist = localStorage.getItem("favoriteObjects");
    const favoriteObjects = favoritesExist
      ? JSON.parse(localStorage.getItem("favoriteObjects"))
      : [];

    favoriteObjects.push(objectID);
    localStorage.setItem("favoriteObjects", JSON.stringify(favoriteObjects));
    console.log("Favorited");
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

export default Object;
