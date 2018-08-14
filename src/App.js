import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
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
  shelfTitles = ['Currently Reading', 'Want To Read', 'Read']
  shelfTypes = ['currentlyReading', 'wantToRead', 'read']

  componentDidMount() {
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

  render() {
    const { books, currentlyReading, wantToRead, read } = this.state

    const currentlyReadingTitle = this.shelfTitles[0]
    , wantToReadTitle = this.shelfTitles[1]
    , readTitle = this.shelfTitles[2]

    console.log('books', books);
    console.log('currentlyReading', currentlyReading);
    console.log('wantToRead', wantToRead);
    console.log('read', read);

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf title ={currentlyReadingTitle} bookList={currentlyReading} />
              <BookShelf title ={wantToReadTitle} bookList={wantToRead} />
              <BookShelf title ={readTitle} bookList={read} />
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
