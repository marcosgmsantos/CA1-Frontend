import React, { Component } from "react";
import EntryDataService from "../services/apiservices";
import { Link } from "react-router-dom";


export default class List extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveEntrys = this.retrieveEntrys.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveEntry = this.setActiveEntry.bind(this);
    this.removeAllEntrys = this.removeAllEntrys.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      Entrys: [],
      currentEntry: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveEntrys();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveEntrys() {
    EntryDataService.getAll()
      .then(response => {
        this.setState({
          Entrys: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveEntrys();
    this.setState({
      currentEntry: null,
      currentIndex: -1
    });
  }

  setActiveEntry(Entry, index) {
    this.setState({
      currentEntry: Entry,
      currentIndex: index
    });
  }

  removeAllEntrys() {
    EntryDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    this.setState({
      currentEntry: null,
      currentIndex: -1
    });

    EntryDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          Entrys: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, Entrys, currentEntry, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>CRUD Entries Table</h4>
          <li
                  className={
                    "list-group-item " 
                   }
                >
                  <b> Entry Title </b>
            </li>
          <ul className="list-group">
            
            {Entrys &&
              Entrys.map((Entry, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveEntry(Entry, index)}
                  key={index}
                >
                  {Entry.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllEntrys}
          >
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentEntry ? (
            <div>
              <h4>Entry</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentEntry.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentEntry.description}
              </div>
              <div>
            
              </div>

              <Link
                to={"/Entrys/" + currentEntry.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              {/* <p>Please click on a Entry...</p> */}
            </div>
          )}
        </div>
      </div>
    );
  }
}
