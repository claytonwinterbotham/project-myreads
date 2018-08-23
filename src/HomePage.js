import React from 'react';
import BookShelf from './BookShelf';
import { Link }  from 'react-router-dom';
import PropTypes from 'prop-types';


const HomePage = props => {

    /**
   * @description store shelf titles and and shelf type string values to arrays
   */
    const shelfTitles = ['Currently Reading', 'Want To Read', 'Read'];
    const shelfTypes = ['currentlyReading', 'wantToRead', 'read'];

    const { books, changeShelf } = props;

    /**
     * @description map through bookShelves array and render each type of bookshelf
     */
    const renderBookShelves = shelfTypes.map((type, index) => {
        const bookShelf = books.filter(book => book.shelf === type);
        return <BookShelf key={type} title={shelfTitles[index]} bookList={bookShelf} onChangeShelf={changeShelf} /> 
    })

    return(
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {renderBookShelves}
            </div>
            <div className="open-search">
                <Link
                    to='/search' 
                >Add a book</Link>
            </div>
        </div>
    );
}

HomePage.propTypes = {
    books: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
}

export default HomePage;