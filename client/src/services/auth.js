import Axios from "axios";
// const jwt = require('jsonwebtoken');
const jwtdecode = require('jwt-decode');
const {exp} = jwtdecode(localStorage.getItem('JWT'))

class Auth {
  constructor() {
    if (localStorage.getItem("JWT") && exp > Date.now()/1000) {
      this.authenticated = true;
    } else {
      this.authenticated = false;
    }
  }

  login(creds, cb) {
    Axios.post(`${process.env.REACT_APP_API_URI}/users/login`, creds)
      .then(response => {
        if (response.status === 200) {
          //set the token
          localStorage.setItem("JWT", response.headers["x-auth-token"]);
          this.authenticated = true;
          cb();
        }
      })
      .catch(err => console.log(err));
  }

  logout(cb) {
    //remove the token
    localStorage.removeItem("JWT");
    this.authenticated = false;
    cb();
  }

  register(creds, cb) {
    Axios.post(`${process.env.REACT_APP_API_URI}/users/register`, creds)
      .then(response => {
        if (response.status === 201) {
          localStorage.setItem("JWT", response.headers["x-auth-token"]);
          this.authenticated = true;
          cb();
        }
      })
      .catch(err => console.log(err));
  }

  isAuthenticated() {
    return this.authenticated;
  }

  getCurrentUser() {
    const tokenToDecode = localStorage.getItem('JWT');
    
    const decoded = jwtdecode(tokenToDecode)

    return decoded.user
  }
}

export default new Auth();
