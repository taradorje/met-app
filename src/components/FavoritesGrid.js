import { useEffect } from "react";

import populateFavorites from "./populateFavorites";

import FavoriteObject from "./FavoriteObject";
import Row from "react-bootstrap/Row";

const FavoritesGrid = ({ loading, favorites, setFavorites }) => {
  const fetchFavorites = async () => {
    const favoritesData = await populateFavorites();
    setFavorites(favoritesData);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <>
      <h2>Favorites Grid</h2>
      <Row xs={1} md={1} className="g-4">
        {!loading && (
          <>
            {favorites.map((card, index) => (
              <FavoriteObject
                key={index}
                objectID={card.objectID}
                imageURL={card.imageURL}
                title={card.objectTitle}
                galleryNumber={card.galleryNumber}
                setFavorites={setFavorites}
              />
            ))}
          </>
        )}
      </Row>
    </>
  );
};

export default FavoritesGrid;
