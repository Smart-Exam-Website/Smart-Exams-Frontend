import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { AppReducer } from './reducers/AppReducer';
import { AuthReducer } from './reducers/AuthReducer';
import ResetReducer from './reducers/ResetReducer';
import ExamReducer from './reducers/ExamReducer';


const rootReducer = combineReducers(
   {
      auth: AuthReducer,
      app: AppReducer,
      rst: ResetReducer,
      exam: ExamReducer
   }
);
const middleware = applyMiddleware(thunk)
const configureStore = () => {
   return createStore(rootReducer, middleware);
}

export const store = configureStore();