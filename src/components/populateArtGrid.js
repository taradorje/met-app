const populateArtGrid = async () => {
  const getAllObjectsURL = `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&hasImages=true&q=Auguste Renoir`;
  const maxObjects = 8;

  const response = await fetch(getAllObjectsURL);
  const data = await response.json();

  const objectIDs = data.objectIDs.slice(0, maxObjects);

  const cards = [];

  for (const objectID of objectIDs) {
    const objectResponse = await fetch(
      `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
    );
    const objectData = await objectResponse.json();

    const card = {
      objectID,
      objectTitle: objectData.title,
      imageURL: objectData.primaryImageSmall,
      galleryNumber: objectData.GalleryNumber,
    };

    cards.push(card);
  }
  return cards;
};

export default populateArtGrid;
