import { createAsyncThunk, createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { authApi, LoginDataType, RegistrationDataType, UserDataType } from "../../../api/authApi"
import { handleServerNetworkError } from "../../../common/utils/axios-error/axiosErrorUtils"
import { setAppStatusAC } from "./appReducer"

export type LoginStateType = {
  isLoggedIn: boolean
  currentUser: UserDataType | null
  valueRegistration: boolean
}
const initialState: LoginStateType = {
  isLoggedIn: false,
  currentUser: null,
  valueRegistration: false,
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
    setRegistration(state, action: PayloadAction<{ value: boolean }>) {
      state.valueRegistration = action.payload.value
    },
    deleteRegData(state, action: PayloadAction<{ value: boolean }>) {
      state.valueRegistration = action.payload.value
    },
  },
})

export const setIsLoggedIn = slice.actions.setIsLoggedIn
export const setCurrentUser = slice.actions.setCurrentUser
export const setRegistration = slice.actions.setRegistration
export const deleteRegData = slice.actions.deleteRegData
export const authReducer = slice.reducer

export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const response = await authApi.login(data)
    if (!response.data.blockStatus && response.data) dispatch(setAppStatusAC({ status: "succeeded" }))
    dispatch(setIsLoggedIn({ isLoggedIn: true }))
    localStorage.setItem("token", response.data.id)
    response.data && dispatch(setCurrentUser({ currentUser: response.data }))
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  } finally {
    dispatch(setAppStatusAC({ status: "idle" }))
  }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    dispatch(setIsLoggedIn({ isLoggedIn: false }))
    dispatch(setCurrentUser({ currentUser: null }))
    localStorage.removeItem("token")
  } catch (e) {
    handleServerNetworkError(e, dispatch)
  } finally {
    dispatch(setAppStatusAC({ status: "idle" }))
  }
}

export const registrationTC = createAsyncThunk("auth/registration", async (payload: RegistrationDataType, thunkApi) => {
  thunkApi.dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const currentUser = await authApi.registration(payload)
    if (currentUser) {
      thunkApi.dispatch(setRegistration({ value: true }))
    }
  } catch (e) {
    handleServerNetworkError(e, thunkApi.dispatch)
  } finally {
    thunkApi.dispatch(setAppStatusAC({ status: "idle" }))
  }
})
