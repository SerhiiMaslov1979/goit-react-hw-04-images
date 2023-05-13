import { useEffect } from 'react';
import PropTypes from 'prop-types';

function Modal({ onCloseModal, children }) {
  useEffect(() => {
    function pressEscBtn(e) {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    }

    window.addEventListener('keydown', pressEscBtn);

    return () => {
      window.removeEventListener('keydown', pressEscBtn);
    };
  }, [onCloseModal]);

  return (
    <div className="Overlay" onClick={onCloseModal}>
      <div className="Modal">{children}</div>
    </div>
  );
}

Modal.propTypes = {
  onCloseModal: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
