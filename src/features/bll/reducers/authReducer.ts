import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { authApi, LoginDataType, UserDataType } from "../../../api/authApi"
import { handleServerNetworkError } from "../../../common/utils/axios-error/axiosErrorUtils"
import { setAppErrorAC, setAppStatusAC } from "./appReducer"

export type LoginStateType = {
  isLoggedIn: boolean
  currentUser: UserDataType | null
}
const initialState: LoginStateType = {
  isLoggedIn: false,
  currentUser: null,
}
const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
    setCurrentUser(state, action: PayloadAction<{ currentUser: UserDataType | null }>) {
      state.currentUser = action.payload.currentUser
    },
  },
})
export const setIsLoggedInAC = slice.actions.setIsLoggedIn
export const setCurrentUser = slice.actions.setCurrentUser
export const authReducer = slice.reducer

export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const response = await authApi.login(data)
    if (!response.data.blockStatus && response.data) dispatch(setAppStatusAC({ status: "succeeded" }))
    dispatch(setIsLoggedInAC({ isLoggedIn: true }))
    localStorage.setItem("token", response.data.id)
    response.data && dispatch(setCurrentUser({ currentUser: response.data }))
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    dispatch(setAppStatusAC({ status: "succeeded" }))
    dispatch(setIsLoggedInAC({ isLoggedIn: false }))
    dispatch(setCurrentUser({ currentUser: null }))
    localStorage.removeItem("token")
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  }
}
