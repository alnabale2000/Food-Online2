const initialState = {
    address: [],
};

const address = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_ADDRESS":
            return { address: payload };
        case "ADD_ADDRESS":
            return { address: [...state.address, payload] };

        default:
            return state;
    }
};
export default address;

export const addAddress = (address) => {
    return {
        type: "ADD_ADDRESS",
        payload: address,
    };
};

export const setAddress = (address) => {
    return {
        type: "SET_ADDRESS",
        payload: address,
    };
};
