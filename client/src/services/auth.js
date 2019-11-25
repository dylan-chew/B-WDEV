class Auth {
    constructor() {
        if(localStorage.getItem('JWT')){
            this.authenticated = true;
        } else {
            this.authenticated = false;
        }
        
    }

    login(cb, response) {
        //set the token
        localStorage.setItem("JWT", response.headers['x-auth-token']);
        this.authenticated = true;
        cb();
    }

    logout(cb) {
        //remove the token
        localStorage.removeItem('JWT');
        this.authenticated = false;
        cb();
    }

    register(cb, response) {
        localStorage.setItem("JWT", response.headers['x-auth-token']);
        this.authenticated = true;
        cb();
    }

    isAuthenticated() {
        return this.authenticated;
    }

}

export default new Auth();