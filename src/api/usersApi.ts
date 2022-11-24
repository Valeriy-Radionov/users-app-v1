import { AxiosResponse } from "axios"
import { InfoResponseType } from "../features/bll/reducers/appReducer"
import { baseInstance, UserDataType } from "./authApi"

const usersUrl = "users"
export const usersApi = {
  getUsers() {
    return baseInstance.get<UserDataType[], AxiosResponse<UserDataType[]>>(usersUrl)
  },
  deleteUser(id: string, isAll: boolean) {
    return baseInstance.delete<AxiosResponse<InfoResponseType>>(`${usersUrl}/${id}/${isAll}`)
  },

  blockUser(id: string, isBlocked: boolean, isAll: boolean) {
    return baseInstance.put<{ id: string; isBlocked: boolean; isAll: boolean }, AxiosResponse<InfoResponseType>>(`${usersUrl}/${id}/${isBlocked.toString()}/${isAll.toString()}`)
  },
}
