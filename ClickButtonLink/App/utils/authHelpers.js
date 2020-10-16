export default {
    saveAuth: (userName, token, name) => {
        localStorage.setItem(constants.tokenKey, JSON.stringify({ userName: userName, access_token: token, name: name }));
    },

    clearAuth: () => {
        localStorage.removeItem(constants.tokenKey);
    },

    getLogin: () => {
        let item = localStorage.getItem(constants.tokenKey);
        let login = '';
        if (item) {
            login = JSON.parse(item).userName;
        }
        return login;
    },

    getName: () => {
        let item = localStorage.getItem(constants.tokenKey);
        let name = '';
        if (item) {
            name = JSON.parse(item).name;
        }
        return name;
    },

    isLogged: () => {
        let item = localStorage.getItem(constants.tokenKey);
        if (item) {
            return true;
        } else {
            return false;
        }
    },

    getToken: () => {
        let item = localStorage.getItem(constants.tokenKey);
        let token = null;
        if (item) {
            token = JSON.parse(item).access_token;
        }
        return token;
    }
}