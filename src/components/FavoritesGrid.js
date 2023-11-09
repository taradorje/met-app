import { useState, useEffect } from "react";
import Row from "react-bootstrap/Row";
import FavoriteObject from "./FavoriteObject";

const FavoritesGrid = () => {
  const favoritesExist = localStorage.getItem("favoriteObjects");
  const favoriteObjects = favoritesExist
    ? JSON.parse(localStorage.getItem("favoriteObjects"))
    : [];

  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    const cards = [];
    for (const objectID of favoriteObjects) {
      const objectResponse = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      );
      const objectData = await objectResponse.json();

      const card = {
        objectID,
        objectTitle: objectData.title,
        imageURL: objectData.primaryImage,
        galleryNumber: objectData.GalleryNumber,
      };

      cards.push(card);
    }
    setFavorites(cards);
  };

  useEffect(() => {
    if (favoriteObjects.length > 0) {
      fetchFavorites();
    }
  }, [favoriteObjects]);

  return (
    <>
      <h2>Favorites Grid</h2>
      <Row xs={1} md={1} className="g-4">
        {favorites.map((card, index) => (
          <FavoriteObject
            key={index}
            objectID={card.objectID}
            imageURL={card.imageURL}
            title={card.objectTitle}
            galleryNumber={card.galleryNumber}
          />
        ))}
      </Row>
    </>
  );
};

export default FavoritesGrid;
