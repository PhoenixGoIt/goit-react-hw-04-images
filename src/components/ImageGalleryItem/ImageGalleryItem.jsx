import css from '../../Styles/styles.module.css';
import Modal from 'components/Modal/Modal';
import PropTypes from 'prop-types';
import { useState } from 'react';

const ImageGalleryItem = ({item}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
    return (
      <li className={css.ImageGalleryItem}>
        <img
          onClick={openModal}
          className={css.ImageGalleryItem_image}
          src={item.webformatURL}
          alt="img"
        />
        {isModalOpen && <Modal isOpen={isModalOpen} onClose={closeModal} image={item} />}
      </li>
    );
  }


ImageGalleryItem.propTypes = {
  item: PropTypes.object,
};

export default ImageGalleryItem;