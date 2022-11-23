import { AxiosResponse } from "axios"
import { InfoResponseType } from "../features/bll/reducers/appReducer"
import { baseInstance, UserDataType } from "./authApi"

const usersUrl = "users"
export const usersApi = {
  getUsers() {
    return baseInstance.get<null, AxiosResponse<UserDataType[]>>(usersUrl)
  },
  deleteUser(id: string, isAll: boolean) {
    return baseInstance.delete<AxiosResponse<InfoResponseType>>(`${usersUrl}/${id}/${isAll}`)
  },

  blockUser(id: string, isBlocked: boolean) {
    return baseInstance.put<boolean, AxiosResponse<InfoResponseType>>(`${usersUrl}/${id}`, isBlocked)
  },
}
