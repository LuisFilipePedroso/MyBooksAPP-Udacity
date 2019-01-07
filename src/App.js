import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'

import Search from './pages/Search'
import Details from './pages/Details'
import BookShelf from './components/BookShelf'

import { Route, Link } from 'react-router-dom'

class BooksApp extends Component {
  state = {
    readBooks: [],
    wantToReadBooks: [],
    readingBooks: [],
    noneShelf: []
  }

  /* The goal of this method is to filter books by category and return the books in each category */
  filterBooks = (books) => {
    const filter = books => shelf => books.filter(b => b.shelf === shelf);
    const filterBy = filter(books);

    const readBooks = filterBy('read');
    const wantToReadBooks = filterBy('wantToRead');
    const readingBooks = filterBy('currentlyReading');
    const none = filterBy('none');

    return [readBooks, wantToReadBooks, readingBooks, none];
  }


  /* The goal of this method is to set state and store the books into local storage  */
  handleStateChange = (books) => {
    this.setState({
      readBooks: books[0],
      wantToReadBooks: books[1],
      readingBooks: books[2],
      noneShelf: books[3],
    });

    localStorage.setItem('books', JSON.stringify(books));
  }

  async componentDidMount() {
    let books = JSON.parse(localStorage.getItem('books'));

    if (books) {
      this.handleStateChange(books);
    } else {
      books = await BooksAPI.getAll();
      const filteredBooks = this.filterBooks(books);
      this.handleStateChange(filteredBooks);
    }
  }

  /* When book is changed of shelf, this method is called to organize each book in it specific shelf */
  handleBookShelfChange = async (book) => {
    await BooksAPI.update(book, book.shelf);
    const books = await BooksAPI.getAll();
    const filteredBooks = this.filterBooks(books);
    this.handleStateChange(filteredBooks);
  }

  render() {
    const books = [...this.state.readingBooks, ...this.state.wantToReadBooks, ...this.state.readBooks, ...this.state.noneShelf];
    return (
      <div className="app">
        <Route path="/details/:id" render={({ match }) => <Details match={match} books={books} />} />
        <Route path="/search" render={() => <Search books={books} bookShelfChange={this.handleBookShelfChange} />} />
        <Route path="/" exact render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf books={this.state.readingBooks} bookShelfChange={this.handleBookShelfChange} title="Currently Reading" />
                <BookShelf books={this.state.wantToReadBooks} bookShelfChange={this.handleBookShelfChange} title="Want to Read" />
                <BookShelf books={this.state.readBooks} bookShelfChange={this.handleBookShelfChange} title="Read" />
              </div>
            </div>
            <div className="open-search">
              <Link
                to="/search"
                className="add-button">
                Add a book
              </Link>
            </div>
          </div>
        )} />
      </div>
    )
  }
}

export default BooksApp
