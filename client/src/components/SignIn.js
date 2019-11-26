import React from "react";
import "../css/signin.css";
import Axios from "axios";
//import {Redirect} from 'react-router-dom';
import auth from "../services/auth";
import Joi from "joi-browser";

class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: {
        email: "",
        password: ""
      },
      errors: {}
    };
  }

  schema = {
    email: Joi.string().email().required().label("Email Address"),
    password: Joi.string().required().label('Password')
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

    //errors[error.details[0].path] = error.details[0].message;

    console.log(errors);

    return errors;
  };

  handleSubmit = e => {
    e.preventDefault();

    //validate
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return; //abort the submit

    Axios.post(
      `${process.env.REACT_APP_API_URI}/users/login`,
      this.state.credentials
    )
      .then(response => {
        if (response.status === 200) {
          //redirect somewhere
          auth.login(() => {
            this.props.history.push("/");
          }, response);

          //Old way
          // return this.props.history.push('/');
        }
      })
      .catch(err => console.log(err));
  };

  handleChange = e => {
    this.setState({errors: {}})

    const { name, value } = e.target;

    const clonedCreds = { ...this.state.credentials };
    clonedCreds[name] = value;

    this.setState({
      credentials: clonedCreds
    });
  };

  render() {
    return (
      <>
        <form onSubmit={this.handleSubmit} className="form-signin">
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Please sign in
          </h1>
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
            Sign in
          </button>
          {Object.keys(this.state.errors).length > 0 && (
            <div className="alert alert-danger">
              <ul>
                <li>
                  {Object.keys(this.state.errors).map((key, i) => {
                    return <li key={i}>{this.state.errors[key]}</li>;
                  })}
                </li>
              </ul>
            </div>
          )}
        </form>
      </>
    );
  }
}

export default SignIn;
