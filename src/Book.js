import React from 'react';
import BookShelfChanger from './BookShelfChanger';

const Book = props => {

    const handleShelfChange = shelf => {

        const { onChangeShelf, book } = props;
        onChangeShelf(book, shelf);
    }

    const { book } = props;
    const id = book.id;
    const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : '';
    const shelf = book.shelf || 'none';
    const title = book.title;
    const authors = book.authors;

    return(
        <li key={id}>
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})` }}></div>
                    <BookShelfChanger currentShelf={shelf} onSelect={handleShelfChange} />
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        </li>
    );
}

export default Book;