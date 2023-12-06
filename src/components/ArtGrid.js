import { useState, useEffect } from "react";

// Functions
import populateArtGrid from "../utils/populateArtGrid";

// Components
import ArtObject from "./ArtObject";

// React Bootstrap Components
import Row from "react-bootstrap/Row";

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
      <Row className="p-0">
        {objects.map((object) => (
          <ArtObject
            object={object}
            key={object.objectID}
            setFavorites={setFavorites}
          />
        ))}
      </Row>
    </>
  );
};

export default ArtGrid;
