import css from '../../Styles/styles.module.css'
import PropTypes from 'prop-types';
import { ReactComponent as AddIcon } from '../../Icon/search.svg';
import { useState } from 'react';
import Notiflix from "notiflix";

const Searchbar = ({onSubmit}) => {
  const [inputData, setInputData] = useState('2')

  function onChangeInput (e) {
    setInputData(e.currentTarget.value.toLowerCase())
  };
   function handleSubmit (e) {
    e.preventDefault();
    if (inputData.trim() === '') {
      Notiflix.Notify.info('Enter Text!');
      return;}
    onSubmit(inputData);
    console.log('1 - Searchbar')
  };
    return (
      <header className={css.Searchbar}>
        <form onSubmit={(e) => handleSubmit(e)} className={css.SearchForm}>
          <button type="submit" className={css.SearchForm_button}>
            <AddIcon width="43px" />
          </button>

          <input
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


//   renderImg(data) {
    //     console.log(data)
    //     if (data !== undefined) {
    //       const markup = data.map(({ webformatURL }) => {
    //         return `<div class="photo-card">
    //           <img src="${webformatURL}" alt="" loading="lazy" width="420" height="300"/>
    //         </div>`;
    //       })
    //     }
    // } 