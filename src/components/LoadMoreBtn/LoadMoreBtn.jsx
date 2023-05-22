import css from '../../Styles/styles.module.css';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => {
  console.log('1 - Button')
  return (
    <button className={css.Button} onClick={onClick}>
      Load more
    </button>
  );
};

export default Button;

Button.propTypes = {
  onClick: PropTypes.func,
};