import React from 'react';
import '../css/signin.css';
import Axios from 'axios';
import {Redirect} from 'react-router-dom';


class SignIn extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        Axios.post('http://localhost:8000/api/users/login', this.state)
        .then(response => {
            console.log(response)

            if(response.status ===200){
                //set the JWT in my app (localstorage, cookie, variable)

                //redirect somewhere
                console.log(this.props)
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
        console.log(this.props)
        return (
            <form onSubmit={this.handleSubmit} className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal text-center">Please sign in</h1>
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
                    type="submit">Sign in</button>
            </form>
        );
    }
}

export default SignIn;