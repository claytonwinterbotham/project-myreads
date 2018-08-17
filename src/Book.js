import React, { Component } from 'react'
import BookShelfChanger from './BookShelfChanger'

class Book extends Component {

    handleShelfChange = shelf => {
        this.props.onChangeShelf(this.props.book, shelf)
    }

    render(){
        const {book} = this.props
        return(
            <li key={book.id}>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                      <BookShelfChanger currentShelf={book.shelf} onSelect={this.handleShelfChange} />
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                </div>
            </li>
        );
    }

}

export default Book;