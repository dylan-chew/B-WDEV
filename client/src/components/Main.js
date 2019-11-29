import React from "react";
import "../css/main.css";
import "font-awesome/css/font-awesome.min.css";
import Card from "./Card";
import Axios from "axios";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      film: [],
      searchString: "",
      searchedString: "",
      searched: false,
      errors: {}
    };
  }

  componentDidMount() {
    //grab some data
    fetch(`${process.env.REACT_APP_API_URI}/film`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          film: data,
          searched: false
        })
      )
      .catch(err => console.error("Caught error: ", err));
  }

  handleChange = e => {
    this.setState({ errors: {} });

    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  handleClickSearch(searchString) {
    Axios.get(`${process.env.REACT_APP_API_URI}/film/${searchString}`)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            film: response.data,
            searched: true,
            searchedString: searchString
          });
        }
        if (!searchString) {
          this.setState({ searched: false });
        }
      })
      .catch(err => console.log(err));
  }

  handleClickDelete(filmId) {
    if (window.confirm("Are you sure you want to delete?")) {
      let config = {
        headers: {
          "x-auth-token": localStorage.getItem("JWT")
        }
      };
      Axios.delete(`${process.env.REACT_APP_API_URI}/film/${filmId}`, config)
        .then(response => {
          if (response.status === 204) {
            //film has been deleted, now remove from state and rerender
            const newListOfFilm = this.state.film.filter(
              item => item._id !== filmId
            );
            this.setState({ film: newListOfFilm });
          }
        })
        .catch(err => console.log(err));
    }
  }

  renderCards() {
    return this.state.film.map((film, i) => {
      return (
        <Card
          key={i}
          id={film._id}
          name={film.name}
          brand={film.brand}
          iso={film.ISO}
          imgPath={film.image_path}
          onClick={() => this.handleClickDelete(film._id)}
        />
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <section className="jumbotron text-center">
            <div className="container">
              <div className="input-group">
                <input
                  id="searchString"
                  name="searchString"
                  onChange={this.handleChange}
                  type="text"
                  className="form-control"
                  placeholder="Search by Brand"
                />
                <div className="input-group-append">
                  <button
                    onClick={() =>
                      this.handleClickSearch(this.state.searchString)
                    }
                    className="btn btn-secondary"
                    type="button"
                  >
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
              {this.state.searched ? (
                <div>
                  <h2>Results for: "{this.state.searchedString}"</h2>
                </div>
              ) : (
                ""
              )}
            </div>
          </section>
        </div>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">{this.renderCards()}</div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Main;
