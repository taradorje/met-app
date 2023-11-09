import Row from "react-bootstrap/Row";
import Object from "./Object";

import { useState, useEffect } from "react";

const Grid = ({ objects }) => {
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
          />
        ))}
      </Row>
    </>
  );
};

export default Grid;
