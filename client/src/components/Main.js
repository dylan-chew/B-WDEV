import React from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      film: []
    }
  }

  componentDidMount() {
    //grab some data
    fetch('http://localhost:8000/api/film')
      .then(response => response.json())
      .then(data =>
        this.setState({
          film: data
        }))
      .catch(err => console.error('Caught error: ', err))
  }

  generateCards() {
    return this.state.film.map((film, i) => {
      return (
        <div className="col-md-3">
          <div className="card mb-4 box-shadow">
            <img
              className="card-img-top"
              data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
              alt="Thumbnail [100%x225]"
              style={{ width: '100%', display: 'block' }}
              src={film.image_path}
              data-holder-rendered="true" />
            <div className="card-body">
              <h2 className="card-text">{film.name}</h2>
              <h3 className="card-text">Brand: {film.brand}</h3>
              <h3 className="card-text">ISO: {film.ISO}</h3>

              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Delete</button>
                </div>
                <small className="text-muted">blah</small>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }



  render() {
    return (
      <React.Fragment>
        <div>
          <section className="jumbotron text-center">
            <div className="container">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Search this site" />
                <div className="input-group-append">
                  <button className="btn btn-secondary" type="button">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              {this.generateCards()}
            </div>
          </div>
        </div>
      </React.Fragment >
    );
  }
}



export default Main;