import React from 'react';
import BookShelf from './BookShelf';
import { Link }  from 'react-router-dom';
import PropTypes from 'prop-types';


const HomePage = props => {

    const { bookShelves, shelfTitles, changeShelf } = props;

    /**
     * @description map through bookShelves array and render each type of bookshelf
     */
    const renderBookShelves = bookShelves.map((bookShelf, index) => (
        <BookShelf key={index}  title={shelfTitles[index]} bookList={bookShelf} onChangeShelf={changeShelf} />
    ));

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
    bookShelves: PropTypes.array.isRequired,
    shelfTitles: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired
}

export default HomePage;