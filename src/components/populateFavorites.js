const populateFavorites = async () => {
  const favoritesExist = localStorage.getItem("favoriteObjects");
  const favoriteObjects = favoritesExist
    ? JSON.parse(localStorage.getItem("favoriteObjects"))
    : [];

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
  return cards;
};

export default populateFavorites;
