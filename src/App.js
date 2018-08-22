import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import { Route } from 'react-router-dom';



class BooksApp extends React.Component {
  
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

  getBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.sortBooks(books)
      })  
  }

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

  updateShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
     .then(() => {
       this.getBooks();
     });
  }

  render() {
    const { books, currentlyReading, wantToRead, read } = this.state;

    const bookShelves = [currentlyReading, wantToRead, read];

    console.log('books', books);
    console.log('currentlyReading', currentlyReading);
    console.log('wantToRead', wantToRead);
    console.log('read', read);

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
