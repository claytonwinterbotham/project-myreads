import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import { Route } from 'react-router-dom';



class BooksApp extends Component {
  
  /**
   * @description store shelf titles and and shelf type string values to arrays
   */
  shelfTitles = ['Currently Reading', 'Want To Read', 'Read'];
  shelfTypes = ['currentlyReading', 'wantToRead', 'read'];

  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
  }

  componentDidMount() {
    this.getBooks();
  }


  /** 
   * @description Perfoms Get request and then calls sortBooks function on response
   */
  getBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.sortBooks(books)
      })  
  }

  /** 
   * @description Sorts the book array from .getAll() request into associated book shelf arrays
   * and updates the state for each shelf.
   */
  sortBooks = (books) => {
    const currentlyReading = this.shelfTypes[0]
    , wantToRead = this.shelfTypes[1]
    , read = this.shelfTypes[2];

    this.setState(() => ({
      books,
      currentlyReading: books.filter(book => book.shelf === currentlyReading),
      wantToRead: books.filter(book => book.shelf === wantToRead),
      read: books.filter(book => book.shelf === read),
    }));
  }

  /**
   * @description Update the books object shelf property
   */
  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
     .then(() => {
       this.getBooks();
     });
  }

  render() {
    const { books, currentlyReading, wantToRead, read } = this.state;

    /**
     * @description Store all three bookShelve arrays in one bookShelves array
     */
    const bookShelves = [currentlyReading, wantToRead, read];

    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <HomePage 
            bookShelves={bookShelves}
            shelfTitles={this.shelfTitles}
            changeShelf={this.updateShelf}
         />
        )} />

        <Route path='/search' render={() => (
          <SearchPage
             onChangeShelf={this.updateShelf}
             userBooks={books}
          />
        )} />

      </div>
    )
  }
}

export default BooksApp;
