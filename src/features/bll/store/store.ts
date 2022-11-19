import { Action, combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import { appReducer } from "../reducers/appReducer"
import { authReducer } from "../reducers/authReducer"
import thunkMiddleware, { ThunkAction } from "redux-thunk"

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk = ThunkAction<void, RootState, unknown, Action>

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunkMiddleware),
})
