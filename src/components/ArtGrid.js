import { useState, useEffect } from "react";

// Components
import populateArtGrid from "./populateArtGrid";
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
        {objects.map((object, index) => (
          <ArtObject key={index} {...object} setFavorites={setFavorites} />
        ))}
      </Row>
    </>
  );
};

export default ArtGrid;
