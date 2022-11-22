import { AxiosResponse } from "axios"
import { InfoResponseType } from "../features/bll/reducers/appReducer"
import { baseInstance, UserDataType } from "./authApi"

const usersUrl = "users"
export const authApi = {
  getUsers() {
    return baseInstance.get<null, AxiosResponse<UserDataType[]>>(usersUrl)
  },
  deleteUser(id: string) {
    return baseInstance.delete<null, AxiosResponse<InfoResponseType>>(`${usersUrl}/${id}`)
  },

  blockUser(id: string, isBlocked: boolean) {
    return baseInstance.put<boolean, AxiosResponse<InfoResponseType>>(`${usersUrl}/${id}`, isBlocked)
  },
}
