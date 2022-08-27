export const add = (data) => {
    return {
        type: "ADD_DATA",
        payload: data
    }
};
export const edit = (data) => {
    return {
        type: "EDIT_DATA",
        payload: data
    }
};
export const remove = (data) => {
    return {
        type: "DELETE_DATA",
        payload: data
    }
};