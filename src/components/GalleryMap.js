import { useState, useEffect } from "react";

// Stylesheets
import "../App.css";

// Components
import GalleryOverview from "./GalleryOverview";
import ModalComponent from "./ModalComponent";
import ObjectModalBody from "./ObjectModalBody";
import UnfavoriteFooter from "./UnfavoriteFooter";

// React Bootstrap Components
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const GalleryMap = ({ loading, favorites, setFavorites }) => {
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

  // GALLERIES STRING
  const generateGalleriesString = (galleries) => {
    const length = galleries.length;
    if (length === 1) {
      return `Gallery ${galleries[0]}`;
    } else if (length === 2) {
      return `Galleries ${galleries.join(" & ")}`;
    } else if (length > 2) {
      return `Galleries ${galleries
        .slice(0, -1)
        .join(", ")}, & ${galleries.slice(-1)}`;
    }
  };

  const uniqueGalleries = [];
  favorites.forEach((favorite) => {
    if (!uniqueGalleries.includes(favorite.galleryNumber)) {
      uniqueGalleries.push(favorite.galleryNumber);
    }
  });
  uniqueGalleries.sort((a, b) => a - b);
  const galleriesString = generateGalleriesString(uniqueGalleries);

  return (
    <>
      <Container fluid className="gallery-container">
        {/* GALLERY OVERVIEW */}
        <GalleryOverview
          loading={loading}
          length={favorites.length}
          galleries={galleriesString}
        />
        {/* GALLERIES LIST */}
        {uniqueGalleries.map((galleryNumber) => (
          <Row key={galleryNumber} className="gallery-row">
            <div>
              <h4>{`📍 Gallery ${galleryNumber}`}</h4>
              <ul className="gallery-list">
                {favorites
                  .filter(
                    (favorite) => favorite.galleryNumber === galleryNumber
                  )
                  .map((favorite) => (
                    <li key={favorite.objectID} className="gallery-object">
                      <img
                        src={favorite.imageURL}
                        alt={favorite.title}
                        onClick={() => openModal(favorite)}
                      />
                      <br />
                      <br />
                      <p className="object-title">{favorite.title}</p>
                    </li>
                  ))}
              </ul>
            </div>
          </Row>
        ))}
      </Container>
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
    </>
  );
};

export default GalleryMap;
