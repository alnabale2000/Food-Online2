const initialState = {
    comments: [],
};

const comments = (state = initialState, { type, payload }) => {
    switch (type) {
        case "SET_COMMENTS":
            return { comments: payload };

        case "ADD_COMMENT":
            return { comments: [...state.comments, payload] };

        default:
            return state;
    }
};
export default comments;

export const setComments = (comments) => {
    return {
        type: "SET_COMMENTS",
        payload: comments,
    };
};

export const addComment = (comment) => {
    return {
        type: "ADD_COMMENT",
        payload: comment,
    };
};
