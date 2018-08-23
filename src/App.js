import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import { Route } from 'react-router-dom';



class BooksApp extends Component {
  
  state = {
    books: [],
  }

  componentDidMount() {
    this.getBooks();
  }

  /** 
   * @description Perfoms Get request and sets state for books
   */
  getBooks = () => {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          books
        });
      })  
  }

  /**
   * @description Update the books object shelf property
   */
  changeShelf = (book, shelf) => {
    book.shelf = shelf
    BooksAPI.update(book, shelf)
     .then(() => {
       this.setState(state => ({ books: state.books
         .filter(b => b.id !== book.id)
         .concat(book)
       }))
     });
  }

  render() {
    const { books } = this.state;

    return (
      <div className="app">

        <Route exact path='/' render={() => (
          <HomePage 
            books={books}
            changeShelf={this.changeShelf}
         />
        )} />

        <Route path='/search' render={() => (
          <SearchPage
             onChangeShelf={this.changeShelf}
             userBooks={books}
          />
        )} />

      </div>
    )
  }
}

export default BooksApp;
