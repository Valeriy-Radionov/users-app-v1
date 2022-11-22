import axios, { AxiosResponse } from "axios"

export const baseInstance = axios.create({
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://backend-users-01.herokuapp.com/",
})
const loginUrl = "auth/login"
const registrUrl = "auth/registration"
const logoutUrl = "auth/logout"
export const authApi = {
  login(loginData: LoginDataType) {
    return baseInstance.post<LoginDataType, AxiosResponse<LoginResponseType>>(loginUrl, loginData)
  },
  registration(registerData: RegistrationDataType) {
    return baseInstance.post<RegistrationDataType, AxiosResponse<UserDataType>>(registrUrl, registerData)
  },
  logOut(id: string) {
    return baseInstance.post<LogoutDataType>(logoutUrl, id)
  },
}

type ResultCode = 0 | 1

export type UserDataType = {
  id: string
  name: string
  email: string
  password: string
  registrationDate: string
  lastLoginDate: string
  blockStatus: boolean
  isAuth: boolean
}

export type LoginDataType = {
  email: string
  password: string
}

export type LoginResponseType = {
  resultCode: ResultCode
  message: string
}
export type RegistrationDataType = {
  email: string
  password: string
  name: string
}
export type LogoutDataType = {
  id: string
}
