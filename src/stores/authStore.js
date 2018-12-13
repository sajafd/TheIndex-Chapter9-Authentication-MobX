import { decorate, observable } from "mobx";
import axios from "axios";
import jwt_decode from "jwt-decode";

class AuthStore {
  constructor() {
    this.user = null;
  }

  loginUser(userData, history) {
    axios
      .post("https://the-index-api.herokuapp.com/login/", userData)
      .then(res => res.data)
      // For now just log user
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        this.setAuthToken(user.token);
        this.user = decodedUser;
        history.push("/");
      })
      .catch(err => console.error(err.response));
  }

  setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common.Authorization = `jwt ${token}`;
      localStorage.setItem("tolkein", token);
    } else {
      delete axios.defaults.headers.common.Authorization;
      localStorage.removeItem("tolkein");
    }
  }

  signupUser(userData, history) {
    axios
      .post("https://the-index-api.herokuapp.com/signup/", userData)
      .then(res => res.data)
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        this.setAuthToken(user.token);
        this.user = decodedUser;
        history.push("/");
      })
      .catch(err => console.error(err.response));
  }

  logoutUser() {
    this.user = null;
    this.setAuthToken();
  }

  setCurrentUser(token) {
    const user = jwt_decode(token);
    this.user = user;
  }

  checkForTolkein() {
    const tolkein = localStorage.getItem("tolkein");

    if (tolkein) {
      const currentTime = Date.now() / 1000;
      const user = jwt_decode(tolkein);

      if (user.exp > currentTime) {
        this.setCurrentUser(tolkein);
        this.setAuthToken(tolkein);
      } else {
        this.logoutUser();
      }
    }
  }
}

decorate(AuthStore, {
  user: observable
});

const authStore = new AuthStore();
authStore.checkForTolkein();

export default authStore;
