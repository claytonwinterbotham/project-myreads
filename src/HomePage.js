import React from 'react';
import BookShelf from './BookShelf';
import { Link }  from 'react-router-dom';


const HomePage = props => {

    const { bookShelves, shelfTitles, changeShelf } = props;

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

export default HomePage;