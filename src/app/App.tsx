import CircularProgress from "@mui/material/CircularProgress"
import { useEffect } from "react"
import { ErrorSnackbar } from "../common/components/error/ErrorSnackBar"
import { Header } from "../common/components/header/Header"
import { LoadingLiner } from "../common/components/liner-progress/LoadingLiner"
import { Routs } from "../common/components/routes/Routs"
import { useAppDispatch, useAppSelector } from "../common/hooks/storeHooks"
import { isInitializedTC } from "../features/bll/reducers/appReducer"

const App = () => {
  const dispatch = useAppDispatch()
  const isInitializad = useAppSelector((state) => state.app.isInitialized)
  const loading = useAppSelector((state) => state.app.status)
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
      {loading === "loading" && <LoadingLiner />}
      <Routs />
    </div>
  )
}
export default App
