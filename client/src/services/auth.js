import Axios from "axios";

class Auth {
  constructor() {
    if (localStorage.getItem("JWT")) {
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
}

export default new Auth();
