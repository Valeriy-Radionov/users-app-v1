import { Action, combineReducers, configureStore } from "@reduxjs/toolkit"
import { appReducer } from "../reducers/appReducer"
import { authReducer } from "../reducers/authReducer"
import thunkMiddleware, { ThunkAction } from "redux-thunk"
import { usersReducer } from "../reducers/usersReducer"

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  users: usersReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
})
