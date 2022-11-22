import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { ErrorSnackbar } from "../common/components/error/ErrorSnackBar"
import { Header } from "../common/components/header/Header"
import { Routs } from "../common/components/routes/Routs"
import { useAppDispatch } from "../common/hooks/storeHooks"
import { isInitializedTC } from "../features/bll/reducers/appReducer"
const App = () => {
  const dispatch = useAppDispatch()
  let token = localStorage.getItem("token")

  useEffect(() => {
    if (token) {
      dispatch(isInitializedTC(token))
    }
  }, [token])

  return (
    <div>
      <ErrorSnackbar />
      <Header />
      <Routs />
    </div>
  )
}
export default App
