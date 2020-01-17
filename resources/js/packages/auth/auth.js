export default function(Vue) {
  Vue.auth = {
    setToken(token) {
      localStorage.setItem("token", token);
    },

    getToken() {
      let token = localStorage.getItem("token");

      if (!token) return null;
      return token;
    },

    destroyToken() {
      localStorage.removeItem("token");
      this.destroyAccountId();
    },
    getRole() {
      let accountId = localStorage.getItem("accountId");
      return accountId ? accountId : null;
    },

    isAuthenticated() {
      return !!this.getToken();
    },

    setAccountId(accountId) {
      localStorage.setItem("accountId", accountId);
    },
    setAccountRole(accountRole) {
      localStorage.setItem("accountRole", accountRole);
    },
    getAccountRole() {
      let accountRole = localStorage.getItem("accountRole");

      return accountRole ? accountRole : null;
    },

    getAccountId() {
      let accountId = localStorage.getItem("accountId");

      return accountId ? accountId : null;
    },
    destroyAccountId() {
      localStorage.removeItem("accountId");
    }
  };

  Object.defineProperties(Vue.prototype, {
    $auth: {
      get() {
        return Vue.auth;
      }
    }
  });
}
