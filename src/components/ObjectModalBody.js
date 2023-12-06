// React Bootstrap Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const ObjectModalBody = ({
  title,
  artist,
  imageURL,
  galleryNumber,
  medium,
  date,
  dimensions,
  department,
  credit,
}) => {
  return (
    <Row>
      <Col xs={12} md={6}>
        <img src={imageURL} alt={title} className="object-modal-image" />
      </Col>
      <Col xs={6} md={6}>
        <p>
          <span className="detail-title">Artist: </span>
          {artist}
        </p>
        <p>
          <span className="detail-title">Medium: </span>
          {medium}
        </p>
        <p>
          <span className="detail-title">Date: </span>
          {date}
        </p>
        <p>
          <span className="detail-title">Dimensions: </span>
          {dimensions}
        </p>
        <p>
          <span className="detail-title">Gallery: </span>
          {galleryNumber}
        </p>
        <p>
          <span className="detail-title">Department: </span>
          {department}
        </p>
        <p>
          <span className="detail-title">Credit Line: </span>
          {credit}.
        </p>
      </Col>
    </Row>
  );
};

export default ObjectModalBody;
