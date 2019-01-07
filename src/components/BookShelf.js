import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

export default class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        title: PropTypes.string.isRequired
    };

    handleBookShelfChange = (book) => {
        this.props.bookShelfChange(book);
    }

    render() {
        const { books, title } = this.props;
        return (
            <div>
                <div className="bookshelf">
                    <h2 className="bookshelf-title">{title}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.map(book => (
                                <li key={book.id}>
                                    <Book
                                        key={book.title}
                                        book={book}
                                        shelf={book.shelf}
                                        handleBookShelfChange={this.handleBookShelfChange} />
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </div>
        );
    }
}
