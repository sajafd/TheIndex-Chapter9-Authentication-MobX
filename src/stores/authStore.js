import { decorate, observable } from "mobx";
import axios from "axios";
import jwt_decode from "jwt-decode";

class AuthStore {
  constructor() {
    this.user = null;
  }

  loginUser(userData) {
    axios
      .post("https://precious-things.herokuapp.com/login/", userData)
      .then(res => res.data)
      // For now just log user
      .then(user => {
        const decodedUser = jwt_decode(user.token);
        this.setAuthToken(user.token);
        this.user = decodedUser;
      })
      .catch(err => console.error(err.response));
  }

  setAuthToken(token) {
    if (token) {
      axios.defaults.headers.common.Authorization = `jwt ${token}`;
    } else {
      delete axios.defaults.headers.common.Authorization;
    }
  }
}

decorate(AuthStore, {
  user: observable
});

const authStore = new AuthStore();

export default authStore;
