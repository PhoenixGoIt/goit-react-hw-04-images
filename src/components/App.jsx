import css from '../Styles/styles.module.css';
import React, {Component} from "react";
import Searchbar from './Searchbar/Searchbar'
import {pixabayApi} from './Api/pixabayApi'
import Loader from './Loader/Loader'
import Notiflix from "notiflix";
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from "./LoadMoreBtn/LoadMoreBtn";

let page = 1;
export class App extends Component {
  state = {
    inputData: '',
    items: [],
    status: 'idle',
    totalHits: 0,
  };
  handleSubmit = async inputData => {
    page = 1;
    if (inputData.trim() === '') {
      Notiflix.Notify.info('Enter Text!');
      return;
    } else {
      try {
        this.setState({ status: 'pending' });
        const { totalHits, hits } = await pixabayApi(inputData, page);
        if (hits.length < 1) {
          this.setState({ status: 'idle' });
          Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
          );
        } else {
          this.setState({
            items: hits,
            inputData,
            totalHits: totalHits,
            status: 'resolved',
          });
        }
      } catch (error) {
        this.setState({ status: 'rejected' });
      }
    }
    console.log('3 - handleSubmit')
  };
  onNextPage = async () => {
    this.setState({ status: 'pending' });

    try {
      const { hits } = await pixabayApi(this.state.inputData, (page += 1));
      this.setState(prevState => ({
        items: [...prevState.items, ...hits],
        status: 'resolved',
      }));
    } catch (error) {
      this.setState({ status: 'rejected' });
    }
    console.log('2 - onNextPage')
  };

  render(){
    const { totalHits, status, items } = this.state;
    if (status === 'idle') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleSubmit} />
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          <Loader />
          {totalHits > 12 && <Button onClick={this.onNextPage} />}
        </div>
      );
    }
    if (status === 'rejected') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleSubmit} />
          <p>Something wrong, try later</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <div className="App">
          <Searchbar onSubmit={this.handleSubmit} />
          <ImageGallery page={page} items={this.state.items} />
          {totalHits > 12 && totalHits > items.length && (
            <div className={css.a}>
            <Button onClick={this.onNextPage} />
            </div>
          )}
        </div>
      );
    }
  }
}