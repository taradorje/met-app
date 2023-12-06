const unfavoriteObject = (objectID, setFavorites) => {
  let favoriteObjects = localStorage.getItem("favoriteObjects")
    ? JSON.parse(localStorage.getItem("favoriteObjects"))
    : [];

  if (favoriteObjects.some((object) => object.objectID === objectID)) {
    favoriteObjects = favoriteObjects.filter(
      (object) => object.objectID !== objectID
    );
    localStorage.setItem("favoriteObjects", JSON.stringify(favoriteObjects));
  }
  setFavorites(favoriteObjects);
};

export default unfavoriteObject;
