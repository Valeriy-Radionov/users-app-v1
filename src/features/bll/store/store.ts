import { combineReducers, configureStore } from "@reduxjs/toolkit"
import thunkMiddleware from "redux-thunk"
import { appReducer } from "../reducers/appReducer"
import { authReducer } from "../reducers/authReducer"
import { usersReducer } from "../reducers/usersReducer"

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  users: usersReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
})
