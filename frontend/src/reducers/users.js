const initialState = {
    user: {},
};

const user = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_USER_DATA":
            return { user: payload };
        default:
            return state;
    }
};
export default user;

export const setUserData = (data) => {
    return {
        type: "SET_USER_DATA",
        payload: data,
    };
};
