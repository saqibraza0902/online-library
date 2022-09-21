const initialState = {
   users:[]
}
const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'USERS':
            return {
                users: action.payload
            }
        default:
            return {
               ...state
            }
    }

}

export default UserReducer