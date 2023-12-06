// React Bootstrap Components
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const FavoriteFooter = ({
  objectID,
  title,
  setModal,
  checkFavorited,
  favoriteObject,
}) => {
  const favorited = checkFavorited(objectID);

  return (
    <>
      {/* CANCEL BUTTON */}
      <Button
        onClick={() => setModal(false)}
        variant="secondary"
        className="cancel-button"
      >
        Cancel
      </Button>
      {/* ADD TO FAVORITES BUTTON */}
      {/* DISABLED */}
      {favorited && (
        <OverlayTrigger
          overlay={
            <Tooltip>{`${title} is already in your Favorites.`}</Tooltip>
          }
          delay={{ show: 150, hide: 150 }}
        >
          <div>
            <Button disabled={favorited} className="custom-button-disabled">
              Add to Favorites
            </Button>
          </div>
        </OverlayTrigger>
      )}
      {/* UNDISABLED */}
      {!favorited && (
        <Button
          onClick={() => {
            favoriteObject();
            setModal(false);
          }}
          className="custom-button-undisabled"
        >
          Add to Favorites
        </Button>
      )}
    </>
  );
};

export default FavoriteFooter;
