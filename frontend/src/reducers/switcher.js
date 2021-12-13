const initialState = {
    isCommentPage: false,
};

const isCommentPage = (state = initialState, { type, payload }) => {
    switch (type) {
        case "TOGGLE_IS_COMMENT_PAGE":
            return { isCommentPage: payload };
        default:
            return state;
    }
};
export default isCommentPage;

export const toggleIsCommentPage = (bool) => {
    return {
        type: "TOGGLE_IS_COMMENT_PAGE",
        payload: bool,
    };
};
