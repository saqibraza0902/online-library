export const tokenReducer = (token) => {
    return {
        type: "TOKEN",
        payload: token
    }
}
export const books = (books) => {
    return {
        type: 'BOOKS',
        payload: books
    }
}
export const deleteRequest = (deleteRequest) => {
    return {
        type: 'DELETE_REQUEST',
        payload: deleteRequest
    }
}
export const borrows = (requestedBorrow) => {
    return {
        type: 'BORROWS',
        payload: requestedBorrow
    }
}
export const users = (user) => {
    return {
        type: "USERS",
        payload: user
    }
}
export const UserBorrow = (borrow) => {
    return {
        type: "USER_BORROW",
        payload: borrow
    }
}
export const UserIssued = (borrow) => {
    return {
        type: "USER_ISSUED",
        payload: borrow
    }
}