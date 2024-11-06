import axios from "axios";

axios.defaults.withCredentials = true;

const getUserAuth = async ([baseUrl = 'http://localhost:5000', id]) => {
    let res;
    const epURL = `${baseUrl}/api/users/${id}`;

    try {
        res = await axios.get(epURL);
    } catch (e) {
        console.log("Error getting user details."+epURL);
        throw e;
    }

    console.log("getUserAuth: "+JSON.stringify(res?.data));

    return res?.data;
};

const login = async (baseUrl = 'http://localhost:5000', { username, password }) => {
    let res;

    try {
        res = await axios.post( baseUrl+'/api/auth/signin' , {
            email: username,
            password: password
        });
    } catch (e) {
        console.log("Login error.")
    }

    return res;
};


export {
    getUserAuth,
    login
};