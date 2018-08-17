import React, { Component } from 'react'

class BookShelfChanger extends Component {
    state = {
        value: this.props.currentShelf
    }

    handleSelect = event => {
        this.props.onSelect(event.target.value)
        this.setState({
            value: event.target.value
        })
    }

    render(){
       
        return(
            <div className="book-shelf-changer">
                <select value={this.state.value} onChange={this.handleSelect}>
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