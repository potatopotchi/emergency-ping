const getUserAuth = async (baseUrl, token) => {

    // TODO Insert BE endpoint call here

    const res = {
        status: 200,
        id: "userId1",
        firstName: "Employees",
        lastName: "Mustwashhands",
        roles: ['EMPLOYEE'],
        // location: "Wadiya",
        // mapX: "632",
        // mapY: "-424"
    };

    console.log("getUserAuth: "+JSON.stringify(res));

    return res;
};

const login = async (baseUrl, { username, password }) => {

    // TODO Insert BE endpoint call here

    return {
        status: 200,
        token: "SAMPLEUSERAUTHTOKEN"
    }
};


export {
    getUserAuth,
    login
};