import { createSlice, PayloadAction } from "@reduxjs/toolkit"
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
    setAppInitializedAC(state, action: PayloadAction<{ value: boolean }>) {
      state.isInitialized = action.payload.value
    },
  },
})

export const appReducer = slice.reducer
export const setAppErrorAC = slice.actions.setAppErrorAC
export const setAppInitializedAC = slice.actions.setAppInitializedAC
export const setAppStatusAC = slice.actions.setAppStatusAC
