import { useEffect } from "react";

import FavoriteObject from "./FavoriteObject";
import Row from "react-bootstrap/Row";

const FavoritesGrid = ({ loading, favorites, setFavorites }) => {
  const fetchFavorites = async () => {
    const favoriteObjects = localStorage.getItem("favoriteObjects")
      ? JSON.parse(localStorage.getItem("favoriteObjects"))
      : [];
    setFavorites(favoriteObjects);
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <>
      <h2>Favorites</h2>
      <Row xs={1} md={1} className="g-4">
        {!loading && (
          <>
            {favorites.map((card, index) => (
              <FavoriteObject
                key={index}
                {...card}
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
