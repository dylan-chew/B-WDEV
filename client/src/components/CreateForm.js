import React from "react";
import "../css/signin.css";
import Axios from "axios";
import Joi from "joi-browser";

class CreateForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filmAttr: {
        name: "",
        brand: "",
        ISO: "",
        image_path: ""
      },
      errors: {}
    };
  }

  schema = {
    name: Joi.string()
      .required()
      .label("Film Name"),
    brand: Joi.string()
      .required()
      .label("Film Brand"),
    ISO: Joi.number()
      .integer()
      .positive()
      .required()
      .label("ISO"),
    image_path: Joi.string()
      .required()
      .uri()
      .label("Image Source")
  };

  validate = () => {
    const { error } = Joi.validate(this.state.filmAttr, this.schema, {
      abortEarly: false
    });
    //console.log(result);
    if (!error) return null;

    //return errors object
    const errors = {};
    error.details.forEach(detail => {
      //add the key if it doesn't exist
      if (!errors.hasOwnProperty(detail.path)) {
        errors[detail.path] = detail.message;
      }
    });

    console.log(errors);

    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    //validate
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return; //abort the submit

    let config = {
      headers: {
        "x-auth-token": localStorage.getItem("JWT")
      }
    };

    Axios.post(`${process.env.REACT_APP_API_URI}/film`, this.state.filmAttr, config)
      .then(response => {
        if (response.status === 201) {
          //redirect somewhere
          this.props.history.push("/");
        }
      })
      .catch(err => console.log(err));
  };

  handleChange = e => {
    this.setState({ errors: {} });

    const { name, value } = e.target;

    const clonedAttr = { ...this.state.filmAttr };
    clonedAttr[name] = value;

    this.setState({
      filmAttr: clonedAttr
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
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Create
        </button>
        {Object.keys(this.state.errors).length > 0 && (
          <div className="alert alert-danger">
            <ul>
              {Object.keys(this.state.errors).map((key, i) => {
                return <li key={i}>{this.state.errors[key]}</li>;
              })}
            </ul>
          </div>
        )}
      </form>
    );
  }
}

export default CreateForm;
