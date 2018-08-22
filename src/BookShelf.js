import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const BookShelf = props => {
    
    const { title, bookList, onChangeShelf } = props;

    const books = bookList.map(book => (
        <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
    ));

    return(
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {books}
                </ol>
            </div>
        </div>
    );
}

BookShelf.propTypes = {
    title: PropTypes.string.isRequired,
    bookList: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

export default BookShelf;