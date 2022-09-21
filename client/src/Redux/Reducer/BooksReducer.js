const initialState = {
    books: [],
    delReqBooks:[]
}
const BooksReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'BOOKS':
            return {
                books: action.payload
            }
        case 'DELETE_REQUEST':
            return {
                delReqBooks: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

export default BooksReducer