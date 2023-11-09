import { useState, useEffect } from "react";
import populateArtGrid from "./populateArtGrid";
import Row from "react-bootstrap/Row";
import Object from "./ArtObject";

const ArtGrid = ({ setLoading, setFavorites }) => {
  const [objects, setObjects] = useState([]);

  const fetchObjects = async () => {
    const objectsData = await populateArtGrid();
    setObjects(objectsData);
    setLoading(false);
  };

  useEffect(() => {
    fetchObjects();
  }, []);

  return (
    <>
      <h2>MET Objects</h2>
      <Row xs={1} md={4} className="g-4" style={{ paddingTop: "10px" }}>
        {objects.map((object, index) => (
          <Object
            key={index}
            objectID={object.objectID}
            imageURL={object.imageURL}
            galleryNumber={object.galleryNumber}
            title={object.objectTitle}
            setFavorites={setFavorites}
          />
        ))}
      </Row>
    </>
  );
};

export default ArtGrid;
