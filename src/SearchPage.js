import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types';

class SearchPage extends Component {
    state = {
        value: '',
        books: []
    };

    /**
     * @description returns an array of books based on user input
     * @param {string} query - User input from text input
     */
    searchBooks = (query) => {
        BooksAPI.search(query)
          .then((books) => {
            if(!books.error)
                this.aggrigateSearch(books, this.props.userBooks);
          });  
      };
    
    /**
     * @description adds book from userBooks array to search results if both array contain the same book
     * @param {array} searchResults - search results array
     * @param {array} userBooks - user books array
     */  
    aggrigateSearch = (searchResults, userBooks) => {
        var result = searchResults.reduce( (r, e) => {
            var f = userBooks.find(el => e.id === el.id)
            r.push(f ? f : e);
            return r;
          }, []);
          
          this.setState(() => ({
              books: result
          }));
    }  

    /**
     * @description handle user input and set value to state
     */
    handleChange = event => {
        const value =  event.target.value;
        this.setState({ 
            value 
        });

        value !== '' ? this.searchBooks(value) : this.setState({ books: [] }); 
    }

    render(){
        const { books } = this.state;
        const { onChangeShelf } = this.props;

        /**
         * @description map through book results and render books
         */
        const bookResults = books.length !== 0 ? books.map(book => (
            <Book key={book.id} book={book} onChangeShelf={onChangeShelf} />
        )) : 'No Results';

        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to='/' >Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={this.state.value}
                            onChange={this.handleChange}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">{bookResults}</ol>
                </div>
            </div>
        );
    }
}

SearchPage.propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    userBooks: PropTypes.array.isRequired
}

export default SearchPage;