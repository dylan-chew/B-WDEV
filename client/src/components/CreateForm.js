import React from "react";
import "../css/signin.css";
import Axios from "axios";

class CreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      brand: "",
      ISO: "",
      image_path: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("JWT")
      }
    };

    console.log(localStorage.getItem("JWT"))

    Axios.post(`${process.env.REACT_APP_API_URI}/film`, this.state, config)
      .then(response => {
        if (response.status === 201) {
          //redirect somewhere
          this.props.history.push("/");
        }
      })
      .catch(err => console.log(err));
  };

  handleChange = e => {
    const { name, value } = e.target;

    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal text-center">New Film</h1>
        <label htmlFor="inputName" className="sr-only">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="inputName"
          className="form-control"
          placeholder="Film Name"
          onChange={this.handleChange}
          autoFocus
        />
        <label htmlFor="inputBrand" className="sr-only">
          Brand
        </label>
        <input
          onChange={this.handleChange}
          type="text"
          name="brand"
          id="inputBrand"
          className="form-control"
          placeholder="Brand"
          required
        />
        <label htmlFor="inputIso" className="sr-only">
          Brand
        </label>
        <input
          onChange={this.handleChange}
          type="number"
          name="ISO"
          id="inputIso"
          className="form-control"
          placeholder="ISO"
          required
        />
        <label htmlFor="inputImgUrl" className="sr-only">
          Brand
        </label>
        <input
          onChange={this.handleChange}
          type="text"
          name="image_path"
          id="inputImgUrl"
          className="form-control"
          placeholder="Image URL"
          required
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Create
        </button>
      </form>
    );
  }
}

export default CreateForm;
