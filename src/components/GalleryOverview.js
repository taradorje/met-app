// Assets
import metLogo from "../assets/met_logo.jpg";

// React Bootstrap Components
import Row from "react-bootstrap/Row";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const GalleryOverview = ({ loading, length, galleries }) => {
  return (
    <Row className="gallery-row">
      {loading && !length && <h4>Loading...</h4>}
      {!loading && !length && (
        <div>Please add your Favorite objects from the grid to begin.</div>
      )}
      {length > 0 && (
        <>
          <div className="gallery-route">
            <h2>Your MET route includes {galleries}.</h2>
            <OverlayTrigger
              overlay={<Tooltip>➤ Click to view MET Map</Tooltip>}
              placement={"right"}
              delay={{ show: 150, hide: 150 }}
            >
              <a
                href="https://maps.metmuseum.org/?screenmode=base&floor=1#hash=17/40.779448/-73.963517/-61"
                target="_blank"
                rel="noopener noreferrer"
                className="met-map"
              >
                <img src={metLogo} className="logo" alt="MET logo" />
              </a>
            </OverlayTrigger>
          </div>
        </>
      )}
    </Row>
  );
};

export default GalleryOverview;
