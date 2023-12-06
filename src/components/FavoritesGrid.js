import { useState, useEffect } from "react";

// Stylesheets
import "../App.css";

// Components
import ModalComponent from "./ModalComponent";
import ObjectModalBody from "./ObjectModalBody";
import UnfavoriteFooter from "./UnfavoriteFooter";

// React Bootstrap Components
import Row from "react-bootstrap/Row";

// Material UI Components
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";

const FavoritesGrid = ({ loading, favorites, setFavorites }) => {
  // UNFAVORITE MODAL
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
            loading && !favorites.length
              ? "loading-text modal-background"
              : "modal-background"
          }
        >
          {loading && !favorites.length && <h4>Loading...</h4>}
          {!loading && !favorites.length && (
            <div className="loading-text">
              Please add your Favorite objects from the grid to begin.
            </div>
          )}
        </div>
        {favorites.length > 0 && (
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
                className="favorites-item"
              >
                <img
                  {...srcset(item.imageURL, 121, item.rows, item.cols)}
                  alt={item.title}
                  loading="lazy"
                  onClick={() => openModal(item)}
                />
              </ImageListItem>
            ))}
          </ImageList>
        )}
        {/* UNFAVORITE MODAL */}
        {selection && (
          <ModalComponent
            show={selection}
            handleClose={closeModal}
            title={<i>{selection.title}</i>}
            body={<ObjectModalBody {...selection} />}
            footerClassName="button-list"
            footer={
              <UnfavoriteFooter
                objectID={selection.objectID}
                closeModal={closeModal}
                setFavorites={setFavorites}
              />
            }
          />
        )}
      </Row>
    </>
  );
};

export default FavoritesGrid;
