import React from 'react';
import '../css/main.css'
import 'font-awesome/css/font-awesome.min.css';
import Card from './Card';

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

  renderCards() {
    return this.state.film.map((film, i) => {
      return (
        <Card
          key={i}
          name={film.name}
          brand={film.brand}
          iso={film.ISO}
          imgPath={film.image_path}
        />
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
              {this.renderCards()}
            </div>
          </div>
        </div>
      </React.Fragment >
    );
  }
}



export default Main;