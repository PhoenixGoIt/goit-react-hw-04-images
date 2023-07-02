import css from '../Styles/styles.module.css';
import Searchbar from './Searchbar/Searchbar'
import {pixabayApi} from './Api/pixabayApi'
import Loader from './Loader/Loader'
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from "./LoadMoreBtn/LoadMoreBtn";
import { useState, useEffect } from 'react';


const App = () => {
  const [inputData, setInputData] = useState('')
  const [items, setItems] = useState([])
  const [status, setStatus] = useState('idle')
  const [totalHits, setTotalHits] = useState(null)
  const [page, setPage] = useState(1)

  function handleSubmit(e) {
    setPage(1)
    setInputData(e)
  }

   useEffect(() => {
      if (inputData.trim() === '') {
        
        return;
      } else {
        
        getPicture()
        async function getPicture() {
            setStatus('pending');
            const { totalHits, hits } = await pixabayApi(inputData, page);
            setTotalHits(totalHits)
            page === 1
          ? setItems(hits)
          : setItems(prevState => [...prevState, ...hits]);
          setStatus('resolved');
        }
      }
    ;
  }, [inputData, page])
  
  async function onNextPage () {
      setPage(prevGalleryPage => prevGalleryPage + 1);
  };



  if (status === 'idle') {
    return (
      <div className="App">
        <Searchbar onSubmit={(e) => handleSubmit(e)} />
      </div>
    );
  }
  if (status === 'pending') {
    return (
      <div className="App">
        <Searchbar onSubmit={(e) => handleSubmit(e)} />
        <ImageGallery page={page} items={items} />
        <Loader />
        {totalHits > 12 && <Button onClick={() => onNextPage()} />}
      </div>
    );
  }
  if (status === 'rejected') {
    return (
      <div className="App">
        <Searchbar onSubmit={(e) => handleSubmit(e)} />
        <p>Something wrong, try later</p>
      </div>
    );
  }
  if (status === 'resolved') {
    return (
      <div className="App">
        <Searchbar onSubmit= {(e) => handleSubmit(e)} />
        <ImageGallery page={page} items={items} />
        {totalHits > 12 && totalHits > items.length && (
          <div className={css.a}>
          <Button onClick={() => onNextPage()} />
          </div>
        )}
      </div>
    );
}}
    
export default App;