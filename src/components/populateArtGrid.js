const populateArtGrid = async () => {
  const getAllObjectsURL = `https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&hasImages=true&q=Auguste Renoir`;
  const maxObjects = 100;

  const response = await fetch(getAllObjectsURL);
  const data = await response.json();

  const objectIDs = data.objectIDs.slice(0, maxObjects);
  const cards = [];

  await Promise.all(
    objectIDs.map(async (objectID, index) => {
      const objectResponse = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      );
      const objectData = await objectResponse.json();

      if (objectData.primaryImageSmall && objectData.title.length < 100) {
        const card = {
          objectID,
          title: objectData.title !== "" ? objectData.title : "Untitled",
          artist: objectData.artistDisplayName || "Unknown",
          imageURL: objectData.primaryImageSmall || null,
          galleryNumber: objectData.GalleryNumber || "N/A",
          medium: objectData.medium || "Unknown",
          date: objectData.objectDate || "Unknown",
          dimensions: objectData.dimensions || "Not Specified",
          department: objectData.department || "Not Specified",
          credit:
            objectData.creditLine === "." ? objectData.credit : "Not Specified",
        };
        cards[index] = card;
      }
    })
  );

  return cards;
};

export default populateArtGrid;
