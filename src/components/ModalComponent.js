// React Bootstrap Components
import Modal from "react-bootstrap/Modal";

const ModalComponent = ({
  size = "lg",
  show,
  handleClose,
  title,
  bodyClassName,
  body,
  footerClassName,
  footer,
}) => (
  <Modal size={size} show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body className={bodyClassName}>{body}</Modal.Body>
    {footer && (
      <Modal.Footer className={footerClassName}>{footer}</Modal.Footer>
    )}
  </Modal>
);

export default ModalComponent;
