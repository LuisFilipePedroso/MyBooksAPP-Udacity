import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import details from '../icons/details.png';

export default class Book extends Component {
    static propTypes = {
        handleBookShelfChange: PropTypes.func.isRequired,
        book: PropTypes.object.isRequired
    };

    state = {
        shelf: this.props.shelf,
        book: this.props.book
    }

    handleChange = (event) => {
        const shelf = event.target.value;
        const book = this.state.book;
        book.shelf = shelf;

        this.setState({ shelf, book });

        this.props.handleBookShelfChange(book);
    }

    render() {
        const { book, shelf } = this.state;
        const { authors, imageLinks } = book;
        return (
            <div className="book">
                <div className="book-top">
                    {imageLinks &&
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.thumbnail})` }}></div>
                    }
                    <div className="details">
                        <Link to={`/Details/${book.id}`}>
                            <img alt="Details" src={details} />
                        </Link>
                    </div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleChange} value={shelf}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {authors && book.authors.map(author => (
                    <div className="book-authors" key={author}>{author}</div>
                ))}
            </div>
        );
    }
}
