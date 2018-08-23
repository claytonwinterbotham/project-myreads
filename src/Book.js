import React from 'react';
import BookShelfChanger from './BookShelfChanger';
import PropTypes from 'prop-types';
import style from './styles';

const Book = props => {

    /**
     * @description pass shelf string value to onChangeShelf callback
     * @param {string} shelf - current shelf value of book
     */
    const handleShelfChange = shelf => {
        const { onChangeShelf, book } = props;
        onChangeShelf(book, shelf);
    }

    const { book } = props;
    const id = book.id;
    const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : '';
    const shelf = book.shelf || 'none';
    const title = book.title;
    const authors = book.authors ? book.authors : '';

    return(
        <li key={id}>
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ ...style, backgroundImage: `url(${thumbnail})` }}></div>
                    <BookShelfChanger currentShelf={shelf} onSelect={handleShelfChange} />
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors}</div>
            </div>
        </li>
    );
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

export default Book;