import Modal from "react-modal";
import { icons as sprite } from "shared/icons/index";
import "./ModalWindow.css";
import { useEffect } from "react";
import { useModalContext } from "context/useModalContext";

import PropTypes from "prop-types";

Modal.setAppElement("#root");

const ModalWindow = ({ isOpen, children }) => {
  const { closeModal } = useModalContext();
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    closeModal();
  };

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName={"modal-overlay"}
      className={"modal-content"}
      closeTimeoutMS={300}
      onRequestClose={handleClose}
      ariaHideApp={false}
    >
      <button onClick={handleClose} className="modal-close-button">
        <svg className="iconClose">
          <use xlinkHref={`${sprite}#icon-close`} />
        </svg>
      </button>
      {children}
    </Modal>
  );
};

ModalWindow.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export default ModalWindow;
