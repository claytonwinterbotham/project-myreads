import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BookShelfChanger extends Component {
    state = {
        value: ''
    }

    componentDidMount(){
        const { currentShelf } = this.props;

        this.setState({
            value: currentShelf
        });
    };

    /**
     * @description set selected state value and pass value to onSelect callback
     * @param {string} event - retrieve value of event target
     */
    handleSelect = event => {
        const { onSelect } = this.props;
        const value = event.target.value;

        onSelect(value);

        this.setState({
            value
        });
    }

    render(){
       const { value } = this.state;
        return(
            <div className="book-shelf-changer">
                <select value={value} onChange={this.handleSelect}>
                    <option value="move" disabled>Move to...</option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

BookShelfChanger.propTypes = {
    currentShelf: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

export default BookShelfChanger;