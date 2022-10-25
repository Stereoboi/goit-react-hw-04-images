import PropTypes from 'prop-types';
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { ModWindow, Overlay, Image } from "./Modal.styled";
const modalRoot = document.querySelector('#modal-root');

export const Modal = ({onClose, modalImage }) => {

  useEffect(() => {
    // console.log('add modal listener');
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      // console.log('remove listener');
      window.removeEventListener('keydown', handleKeyDown )
    }
  })

  
  const handleKeyDown = event => {
    if (event.code === 'Escape') {
        onClose();
      }
  }

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  }
  
  
    return createPortal(
      <Overlay onClick={handleBackdropClick} >
        <ModWindow >
          <Image
            src={modalImage.img}
            alt={modalImage.tags}
            key={modalImage.id}
            loading="lazy"
          />
        </ModWindow>
      </Overlay>, modalRoot,
    );
  }


Modal.propTypes = {
  onClose: PropTypes.func,
  modalImage: PropTypes.object,
}




