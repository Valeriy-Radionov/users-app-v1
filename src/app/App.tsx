import { ErrorSnackbar } from "../common/components/error/ErrorSnackBar"
import { Header } from "../common/components/header/Header"
import { Routs } from "../common/components/routes/Routs"
const App = () => {
  return (
    <div>
      <ErrorSnackbar />
      <Header />
      <Routs />
    </div>
  )
}
export default App
