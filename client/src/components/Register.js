import React from "react";
import "../css/signin.css";
//import {Redirect} from 'react-router-dom';
import auth from "../services/auth";
import Joi from "joi-browser";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      },
      errors: {}
    };
  }

  schema = {
    firstName: Joi.string()
      .required()
      .label("First Name"),
    lastName: Joi.string()
      .required()
      .label("Last Name"),
    email: Joi.string()
      .email()
      .required()
      .label("Email Address"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  validate = () => {
    const { error } = Joi.validate(this.state.credentials, this.schema, {
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

    auth.register(this.state.credentials, (err, response) => {
      if (err) {
        this.setState({ errors: { email: "Email already exists" } });
        return;
      }

      this.props.history.push("/");
    });
  };

  handleChange = e => {
    this.setState({ errors: {} });

    const { name, value } = e.target;

    const clonedCreds = { ...this.state.credentials };
    clonedCreds[name] = value;

    this.setState({
      credentials: clonedCreds
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form-signin">
        <h1 className="h3 mb-3 font-weight-normal text-center">
          Register new account
        </h1>
        <label htmlFor="inputFirstName" className="sr-only">
          First Name
        </label>
        <input
          type="text"
          name="firstName"
          id="inputFirstName"
          className="form-control"
          placeholder="First name"
          onChange={this.handleChange}
          autoFocus
        />
        <label htmlFor="inputLastName" className="sr-only">
          Last Name
        </label>
        <input
          onChange={this.handleChange}
          type="text"
          name="lastName"
          id="inputLastName"
          className="form-control"
          placeholder="Last name"
        />
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="text"
          name="email"
          id="inputEmail"
          className="form-control"
          placeholder="Email address"
          onChange={this.handleChange}
          autoFocus
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          onChange={this.handleChange}
          type="password"
          name="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign up
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

export default SignIn;
