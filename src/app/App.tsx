import CircularProgress from "@mui/material/CircularProgress"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import { ErrorSnackbar } from "../common/components/error/ErrorSnackBar"
import { Header } from "../common/components/header/Header"
import { Routs } from "../common/components/routes/Routs"
import { useAppDispatch, useAppSelector } from "../common/hooks/storeHooks"
import { isInitializedTC } from "../features/bll/reducers/appReducer"
const App = () => {
  const dispatch = useAppDispatch()
  const isInitializad = useAppSelector((state) => state.app.isInitialized)
  const token = localStorage.getItem("token")

  useEffect(() => {
    dispatch(isInitializedTC(token))
  }, [dispatch])

  if (!isInitializad) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }
  return (
    <div>
      <ErrorSnackbar />
      <Header />
      <Routs />
    </div>
  )
}
export default App
