import React, { Component } from 'react';

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

export default BookShelfChanger;