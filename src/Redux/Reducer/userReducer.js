const initialState = {
    data: []
};
const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_DATA":
            return {
                data: [action.payload]
            };
        case "DELETE_DATA":
            return {
                ...state,
                data: action.payload
            };
        case "EDIT_DATA":
            return {
                ...state,
                data: [action.payload],
            };
        default:
            return state;
    }
};
export default userReducer;
