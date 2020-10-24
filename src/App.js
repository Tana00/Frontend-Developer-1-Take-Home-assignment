import React from "react";
import Spinner from "./Spinner.svg";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchBox: "",
      searchBoxValue: "",
      items: [],
      isLoading: false
    };
    this.getSearchResults = this.getSearchResults.bind(this);
  }

  async getSearchResults(e) {
    this.setState({ isLoading: true });
    const req = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${this.state.searchBox}`
    );

    const res = await req.json();
    this.setState({ items: res.items, searchBox: "", isLoading: false });
    console.log("items", this.state.items);
  }

  render() {
    return (
      <div className="App">
        <div className="search-container form">
          <input
            type="text"
            value={this.state.searchBox}
            id="search-bar"
            placeholder="e.g 0747532699"
            onChange={e => {
              this.setState({
                searchBox: e.target.value,
                searchBoxValue: e.target.value
              });
            }}
          />
          <button onClick={this.getSearchResults}>Find Book</button>
        </div>

        {this.state.isLoading ? (
          <div class="divLoader">
            <p>Loading...</p>
            <img src={Spinner} alt="loader icon" />
          </div>
        ) : (
          <div>
            {this.state.items === undefined ? (
              <p>
                No book found matching this isbn{" "}
                <strong>{this.state.searchBoxValue}</strong>
              </p>
            ) : (
              <div>
                {this.state.items.map((item, index) => {
                  if (index === 0) {
                    return (
                      <div key={item.id} className="card">
                        <div className="wrapper">
                          <div className="card-image">
                            <img
                              src={
                                item.volumeInfo.imageLinks === undefined
                                  ? "https://demo.hackerrahul.com/bookstore/images/default.jpg"
                                  : item.volumeInfo.imageLinks.thumbnail
                              }
                              alt="Book preview"
                            />
                          </div>
                          <div className="card-info">
                            <h2>{item.volumeInfo.title}</h2>
                            <h5>
                              {item.volumeInfo.subtitle
                                ? item.volumeInfo.subtitle
                                : ""}
                            </h5>
                            <p className="author">
                              {item.volumeInfo.authors === undefined
                                ? item.volumeInfo.publisher
                                : item.volumeInfo.authors.map(author => {
                                    return (
                                      <span key={author}>{author} | </span>
                                    );
                                  })}
                            </p>
                            <span>{item.volumeInfo.publisher} | </span>
                            <span
                              className={
                                item.volumeInfo.pageCount === ""
                                  ? "show"
                                  : "hide"
                              }
                            >
                              {item.volumeInfo.publishedDate} |
                            </span>
                            <span>{item.volumeInfo.categories} | </span>
                            <span
                              className={
                                item.volumeInfo.pageCount === ""
                                  ? "show"
                                  : "hide"
                              }
                            >
                              {item.volumeInfo.pageCount}
                              pages
                            </span>
                            <p className="desc">
                              {item.volumeInfo.description}
                            </p>
                            <a
                              href={item.volumeInfo.previewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Get more info
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default App;
