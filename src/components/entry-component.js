import React, { Component } from "react";
import EntryDataService from "../services/apiservices";

export default class Entry extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getEntry = this.getEntry.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateEntry = this.updateEntry.bind(this);
    this.deleteEntry = this.deleteEntry.bind(this);

    this.state = {
      currentEntry: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getEntry(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentEntry: {
          ...prevState.currentEntry,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentEntry: {
        ...prevState.currentEntry,
        description: description
      }
    }));
  }

  getEntry(id) {
    EntryDataService.get(id)
      .then(response => {
        this.setState({
          currentEntry: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentEntry.id,
      title: this.state.currentEntry.title,
      description: this.state.currentEntry.description,
      published: status
    };

    EntryDataService.update(this.state.currentEntry.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentEntry: {
            ...prevState.currentEntry,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateEntry() {
    EntryDataService.update(
      this.state.currentEntry.id,
      this.state.currentEntry
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The Entry was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteEntry() {    
    EntryDataService.delete(this.state.currentEntry.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/Entrys')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentEntry } = this.state;

    
    return (
      <div>
        {currentEntry ? (
          <div className="edit-form">
            <h4>Entry</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentEntry.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentEntry.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
               
              </div>
            </form>


            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteEntry}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateEntry}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            {/* <br />
            <p>Please click on a Entry...</p> */}
          </div>
        )}
      </div>
    );
  }
}
