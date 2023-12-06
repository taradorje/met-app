// Assets
import metLogo from "../assets/met_logo.jpg";

// React Bootstrap Components
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const Sidebar = ({ openModal }) => {
  return (
    <div className="sidebar p-0">
      <a href="https://taradorje.github.io/met-app/">
        <img
          src={metLogo}
          alt="MET Logo"
          width="auto"
          className="sidebar-logo"
        />
      </a>
      <h3>Instructions:</h3>
      <ol>
        <li>Select an object from the grid to add it to your Favorites.</li>
        <li>Click on 'View Favorites' to view your favorite objects.</li>
        <li>
          Click on 'View Map' to view the locations of your favorite objects in
          The MET.
        </li>
      </ol>
      <div className="d-grid gap-2">
        <Button
          size="lg"
          className="custom-button shadow-md tab"
          onClick={(e) => {
            openModal("favorites");
            e.currentTarget.blur();
          }}
        >
          View Favorites
        </Button>
        <Button
          size="lg"
          className="custom-button shadow-md tab"
          onClick={(e) => {
            openModal("gallery");
            e.currentTarget.blur();
          }}
        >
          View Gallery List
        </Button>
      </div>
      <div>
        <OverlayTrigger
          overlay={<Tooltip>➤ Link to full MET Collection</Tooltip>}
          placement="right"
          delay={{ show: 150, hide: 150 }}
        >
          <a
            href="https://www.metmuseum.org/art/the-collection"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={metLogo} className="logo" alt="MET logo" />
          </a>
        </OverlayTrigger>
      </div>
    </div>
  );
};

export default Sidebar;
