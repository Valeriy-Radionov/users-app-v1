import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { authApi } from "../../../api/authApi"
import { handleServerNetworkError } from "../../../common/utils/axios-error/axiosErrorUtils"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type InfoResponseType = {
  resultCode: 0 | 1
  message: string
}
export type InitialAppStateType = {
  status: RequestStatusType
  error: string
  isInitialized: boolean
}

const initialState: InitialAppStateType = {
  status: "idle",
  error: "",
  isInitialized: false,
}

const slice = createSlice({
  name: "app",
  initialState: initialState,
  reducers: {
    setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
      state.status = action.payload.status
    },
    setAppErrorAC(state, action: PayloadAction<{ error: string }>) {
      state.error = action.payload.error
    },
    setAppInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const appReducer = slice.reducer
export const setAppErrorAC = slice.actions.setAppErrorAC
export const setAppInitializedAC = slice.actions.setAppInitializedAC
export const setAppStatusAC = slice.actions.setAppStatusAC

export const isInitializedTC = createAsyncThunk("app/initialized", async (token: string | null, thunkApi) => {
  try {
    if (token) {
      const response = await authApi.me(token)
      if (response.data) {
        thunkApi.dispatch(setAppInitializedAC({ isInitialized: true }))
      }
    }
  } catch (e) {
    thunkApi.dispatch(setAppInitializedAC({ isInitialized: false }))
    handleServerNetworkError(e, thunkApi.dispatch)
  } finally {
    thunkApi.dispatch(setAppInitializedAC({ isInitialized: true }))
  }
})
