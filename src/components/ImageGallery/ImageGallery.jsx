import css from '../../Styles/styles.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem'
import PropTypes from 'prop-types';

function ImageGallery({ items }) {
  console.log(items)
  return (
    <>
      <ul className={css.ImageGallery}>
        {items.map(item => (
          <ImageGalleryItem key={item.id} item={item} />
          
        ))}
      </ul>
    </>
  );
}

export default ImageGallery;

ImageGallery.propTypes = {
  items: PropTypes.array,
};