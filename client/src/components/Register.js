import React from 'react';
import '../css/signin.css';
import Axios from 'axios';
//import {Redirect} from 'react-router-dom';


class SignIn extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        Axios.post(`${process.env.REACT_APP_API_URI}/users/register`, this.state)
        .then(response => {
            if(response.status ===201){
                //set the JWT in my app (localstorage, cookie, variable)
                 console.log(response.headers['x-auth-token'])
                localStorage.setItem("JWT", response.headers['x-auth-token']);

                //redirect somewhere
                //console.log(this.props)
                return this.props.history.push('/');
            }
        })
        .catch(err => console.log(err))
    }

    handleChange = (e) => {
        const {name, value} = e.target

        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal text-center">Register new account</h1>
                <label htmlFor="inputFirstName" className="sr-only">First Name</label>
                <input 
                type="text" 
                name='firstName'
                id="inputFirstName" 
                className="form-control" 
                placeholder="First name" 
                onChange={this.handleChange}
                autoFocus />
                <label htmlFor="inputLastName" className="sr-only">Last Name</label>
                <input 
                onChange={this.handleChange} 
                type="text" 
                name='lastName'
                id="inputLastName" 
                className="form-control" 
                placeholder="Last name" 
                required />
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input 
                type="email" 
                name='email'
                id="inputEmail" 
                className="form-control" 
                placeholder="Email address" 
                onChange={this.handleChange}
                autoFocus />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input 
                onChange={this.handleChange} 
                type="password" 
                name='password'
                id="inputPassword" 
                className="form-control" 
                placeholder="Password" 
                required />
                <button
                    className="btn btn-lg btn-primary btn-block"
                    type="submit">Sign up</button>
            </form>
        );
    }
}

export default SignIn;