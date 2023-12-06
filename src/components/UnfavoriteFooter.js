// Functions
import unfavoriteObject from "../utils/unfavoriteObject";

// React Bootstrap Components
import Button from "react-bootstrap/Button";

const UnfavoriteFooter = ({ objectID, closeModal, setFavorites }) => {
  return (
    <>
      <Button onClick={closeModal} className="cancel-button">
        Close
      </Button>
      <Button
        onClick={() => {
          unfavoriteObject(objectID, setFavorites);
          closeModal();
        }}
        className="custom-button-undisabled"
      >
        Remove from Favorites
      </Button>
    </>
  );
};

export default UnfavoriteFooter;
