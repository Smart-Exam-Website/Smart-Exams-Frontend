import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { AuthReducer } from './reducers/AuthReducer';


const rootReducer = combineReducers(
   {
      auth: AuthReducer,
   }
);
const middleware = applyMiddleware(thunk)
const configureStore = () => {
   return createStore(rootReducer, middleware);
}

export const store = configureStore();