const initialState = {
    token: "",
    isLoggedIn: localStorage.getItem("token") ? true : false,
    user: {},
};

const loginReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_TOKEN":
            return { token: payload.token, user: payload.user };
        case "SET_STATUS":
            return { isLoggedIn: payload };
        default:
            return state;
    }
};

export default loginReducer;

//Action
export const setToken = (userLog) => {
    return { type: "SET_TOKEN", payload: userLog };
};

export const setStatus = (bool) => {
    return { type: "SET_STATUS", payload: bool };
};
