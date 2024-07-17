import React from 'react';
import Modal from 'react-modal';
import '../styles/ConfirmModal.css';

Modal.setAppElement('#root'); // Important for accessibility

function ConfirmModal({ isOpen, onRequestClose, onConfirm, message }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Confirm Deletion"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2>Confirm Deletion</h2>
        <p>{message}</p>
        <button onClick={onConfirm} className="confirm-btn">Yes</button>
        <button onClick={onRequestClose} className="cancel-btn">No</button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;
