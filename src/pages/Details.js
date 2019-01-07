import React from 'react';
import { Link } from 'react-router-dom';

import moment from 'moment';

const Details = (props) => {
    let { books } = props;
    if (!books.length) {
        books = JSON.parse(localStorage.getItem('books'));
        books = [...books[0], ...books[1], ...books[2], ...books[3]]
    }
    const { id } = props.match.params;
    const book = books.filter(b => b.id === id);

    return (
        <div>
            <div className="list-books-title">
                <h1>Details about the book</h1>
                <p>{book[0].title}</p>
            </div>
            <div>
                <p>Published: {moment(book[0].publishedDate).format('YYYY/MM/d')}</p>
                <p>About: {book[0].description}</p>
                <p>Print type: {`${book[0].printType.charAt(0).toUpperCase()}${book[0].printType.slice(1).toLowerCase()}`}</p>
            </div>
            <div className="alignBackBtn">
                <Link className="btnBack" to="/">Voltar</Link>
            </div>
        </div>
    )
}

export default Details;