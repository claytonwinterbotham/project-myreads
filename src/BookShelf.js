import React from 'react';
import Book from './Book';

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

export default BookShelf;