import { combineReducers } from 'redux';
import BooksReducer from './BooksReducer';
import BorrowReducer from './BorrowReducer';
import UserReducer from './UserReducer';

const rootReducer = combineReducers({
    borrow: BorrowReducer,
    book: BooksReducer,
    user: UserReducer
});

export default rootReducer;