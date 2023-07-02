import { createPortal } from 'react-dom';
import { useCallback, useEffect } from 'react';
import css from '../../Styles/styles.module.css';
const ModalRoot = document.querySelector('#ModalRoot');

const Modal = ({image, onClose}) => {
  const hendleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    window.addEventListener('keydown', hendleKeyDown);
    return () => {
      window.removeEventListener('keydown', hendleKeyDown);
    };
  }, [hendleKeyDown]);

  const onOverlayClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

    const { largeImageURL } = image;
    return createPortal(
      <div onClick={e =>onOverlayClose(e)} className={css.Overlay}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt="img" />
        </div>
      </div>,
      ModalRoot
    );
    }
export default Modal
    
