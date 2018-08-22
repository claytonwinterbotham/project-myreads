import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from 'react-router-dom';
import Book from './Book';

class SearchPage extends Component {
    state = {
        value: '',
        books: []
    };

    searchBooks = (query) => {
        BooksAPI.search(query)
          .then((books) => {
            if(!books.error)
                this.aggrigateSearch(books, this.props.userBooks);
          });  
      };
    
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

export default SearchPage;