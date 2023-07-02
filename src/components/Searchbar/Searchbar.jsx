import css from '../../Styles/styles.module.css'
import PropTypes from 'prop-types';
import { ReactComponent as AddIcon } from '../../Icon/search.svg';
import { useState } from 'react';
import Notiflix from "notiflix";

const Searchbar = ({onSubmit}) => {
  const [inputData, setInputData] = useState('')
  const [value, setValue] = useState('')
  function onChangeInput (e) {
    setInputData(e.currentTarget.value.toLowerCase())
    setValue(e.currentTarget.value.toLowerCase())
  };
   function handleSubmit (e) {
    e.preventDefault();
    if (inputData.trim() === '') {
      Notiflix.Notify.info('Enter Text!');
      return;}
    onSubmit(inputData);

  };
    return (
      <header className={css.Searchbar}>
        <form onSubmit={(e) => handleSubmit(e)} className={css.SearchForm}>
          <button type="submit" className={css.SearchForm_button}>
            <AddIcon width="43px" />
          </button>

          <input
          value={value}
            className={css.SearchForm_input}
            name="inputData"
            onChange={(e) => onChangeInput(e)}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }

export default Searchbar;
Searchbar.propType = {
  onSubmit: PropTypes.func.isRequired,
};

