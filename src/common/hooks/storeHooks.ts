import { TypedUseSelectorHook, useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { AppDispatch, RootState } from "../../features/bll/store/store"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
