import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Logo from "./Logo";

function ConformationModal({
  handleClose,
  conformFunction,
  type = "Logout",
  heaaing = `Are you sure you want to ${type} `,
  summary = "",
  show,
  footer = null
}) {
  return (
    <>
      <Modal show={show} size="md" centered onHide={handleClose}>
        <Modal.Body>
          <div className="py-5 d-flex flex-column gap-3 text-center">
            <div className="d-flex gap-2 d-flex flex-column justify-content-center align-items-center fw-bold">
              <Logo icon={false} color="text-dark" />
              <h5 className="fw-600 mb-0">{heaaing}</h5>
              <p className="text-faded fs-8">{summary}</p>
            </div>
            {footer}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ConformationModal;
