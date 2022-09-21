const initialState = {
    borrows: [],
    userBorrows: [],
    userIssued: []
}
const BorrowReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BORROWS':
            return {
                borrows: action.payload
            }
        case 'USER_BORROW':
            return {
                userBorrows: action.payload
            }
        case 'USER_ISSUED':
            return {
                userIssued: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default BorrowReducer