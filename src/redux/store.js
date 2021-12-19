import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { AppReducer } from './reducers/AppReducer';
import { AuthReducer } from './reducers/AuthReducer';
import ResetReducer from './reducers/ResetReducer';


const rootReducer = combineReducers(
   {
      auth: AuthReducer,
      app: AppReducer,
      rst: ResetReducer
   }
);
const middleware = applyMiddleware(thunk)
const configureStore = () => {
   return createStore(rootReducer, middleware);
}

export const store = configureStore();