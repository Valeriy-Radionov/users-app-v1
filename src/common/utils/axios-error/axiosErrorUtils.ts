import { Dispatch } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"
import { setAppErrorAC, setAppStatusAC } from "../../../features/bll/reducers/appReducer"

export const handleServerNetworkError = (e: unknown, dispatch: Dispatch) => {
  const err = e as Error | AxiosError
  if (axios.isAxiosError(err)) {
    const error = err.response?.data.message ? err.response.data.message : err.message
    dispatch(setAppErrorAC({ error: error }))
  }
  dispatch(setAppStatusAC({ status: "failed" }))
}
