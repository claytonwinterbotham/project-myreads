import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import HomePage from './HomePage'
import SearchPage from './SearchPage'
import { Route } from 'react-router-dom'



class BooksApp extends React.Component {
  
    shelfTitles = ['Currently Reading', 'Want To Read', 'Read']
    shelfTypes = ['currentlyReading', 'wantToRead', 'read']

    state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      books: [],
      currentlyReading: [],
      wantToRead: [],
      read: [],
  
      showSearchPage: false
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
    , read = this.shelfTypes[2]

    this.setState(() => ({
      books,
      currentlyReading: books.filter(book => book.shelf === currentlyReading),
      wantToRead: books.filter(book => book.shelf === wantToRead),
      read: books.filter(book => book.shelf === read),
    }))
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
     .then(() => {
       this.getBooks();
     })
  }

  render() {
    const { books, currentlyReading, wantToRead, read } = this.state

    const bookList = [currentlyReading, wantToRead, read]

    console.log('books', books);
    console.log('currentlyReading', currentlyReading);
    console.log('wantToRead', wantToRead);
    console.log('read', read);

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <HomePage 
            bookList={bookList}
            titles={this.shelfTitles}
            changeShelf={this.changeShelf}
         />
        )} />
        <Route path='/search' render={() => (
          <SearchPage
           
          />
        )} />
      </div>
    )
  }
}

export default BooksApp
