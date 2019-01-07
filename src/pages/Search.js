import React, { Component } from 'react';
import { DebounceInput } from 'react-debounce-input';

import '../App.css';
import { Link } from 'react-router-dom';

import Book from '../components/Book';

import { search } from '../BooksAPI'

class Search extends Component {
  state = {
    query: "",
    filterBooks: []
  }

  filter = async (query) => {
    const showingBooks = query !== ""
      ? await search(query)
      : [];

    return showingBooks;
  }

  filterByProps = (query) => {
    const booksByProps = query !== "" ?
      this.props.books.filter(b => b.title.toLowerCase().includes(query.toLowerCase()))
      : [];

    return booksByProps;
  }

  handleInputChange = async (query) => {
    const filterBooks = await this.filter(query);
    const filterBooksByProps = await this.filterByProps(query);

    for (let book of filterBooks) {
      for (let bookp of filterBooksByProps) {
        if (book.id === bookp.id)
          book.shelf = bookp.shelf
      }
    }

    this.setState({
      query,
      filterBooks
    })
  }

  handleBookShelfChange = (book) => {
    this.props.bookShelfChange(book);
  }

  render() {
    const { filterBooks } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              type="text"
              placeholder="Search by title or author"
              minLength={2}
              debounceTimeout={200}
              onChange={(e) => this.handleInputChange(e.target.value)}
              value={this.state.query} />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {filterBooks !== undefined && !filterBooks.error ? filterBooks.map(book => (
              <li key={book.id}>
                <Book
                  key={book.id}
                  book={book}
                  shelf={book.shelf}
                  handleBookShelfChange={this.handleBookShelfChange} />
              </li>
            )) : ""}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
