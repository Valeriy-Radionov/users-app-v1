import { AxiosResponse } from "axios"
import { InfoResponseType } from "../features/bll/reducers/appReducer"
import { baseInstance, UserDataType } from "./authApi"

const usersUrl = "users"
export const usersApi = {
  getUsers() {
    return baseInstance.get<UserDataType[], AxiosResponse<UserDataType[]>>(usersUrl)
  },
  deleteUser(deleteData: DeleteResponseType) {
    return baseInstance.put<DeleteResponseType, AxiosResponse<InfoResponseType>>(`${usersUrl}`, deleteData)
  },

  blockUser(blockData: BlockUserType) {
    return baseInstance.put<BlockUserType, AxiosResponse<InfoResponseType>>(`${usersUrl}/block`, blockData)
  },
}

type DeleteResponseType = {
  id: readonly string[]
}
type BlockUserType = {
  id: readonly string[]
  isBlocked: boolean
}
