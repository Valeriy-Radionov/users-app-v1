import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { authApi, LoginDataType } from "../../../api/authApi"
import { handleServerNetworkError } from "../../../common/utils/axios-error/axiosErrorUtils"
import { setAppErrorAC, setAppStatusAC } from "./appReducer"
const initialState = {
  isLoggedIn: false,
}
const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsLoggedInAC(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})
export const setIsLoggedInAC = slice.actions.setIsLoggedInAC
export const authReducer = slice.reducer

export const loginTC = (data: LoginDataType) => async (dispatch: Dispatch) => {
  dispatch(setAppStatusAC({ status: "loading" }))
  try {
    const res = await authApi.login(data)
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC({ isLoggedIn: true }))
      dispatch(setAppStatusAC({ status: "succeeded" }))
    } else {
      dispatch(setAppErrorAC({ error: res.data.message }))
      console.log("Ошибка на стороне приложения authReducer loginTC сработало учловие if /else. Не удалось отправить данные в стейт")
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch)
    console.log("Ошибка на стороне приложения authReducer loginTC сработал блок catch! Не удалось послать запрос на сервер промис не зарезолвился")
  }
}
