import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link }  from 'react-router-dom';

class HomePage extends Component {
    render(){
        const { bookList, titles, changeShelf } = this.props

        return(
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <BookShelf title ={titles[0]} bookList={bookList[0]} onChangeShelf={changeShelf} />
            <BookShelf title ={titles[1]} bookList={bookList[1]} onChangeShelf={changeShelf} />
            <BookShelf title ={titles[2]} bookList={bookList[2]} onChangeShelf={changeShelf} />
          </div>
          <div className="open-search">
            <Link
                to='/search' 
            >Add a book</Link>
          </div>
        </div>
        );
    }

}

export default HomePage