import { Container, CssBaseline, Switch, ThemeProvider, createTheme, } from "@mui/material";
import Header from "./Header";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import agent from "../api/agent";
import { getCookie } from "../util/util";
import LoadingCompoment from "./LoadingComponent";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/basket/basketSlice";

function App() {
const dispatch = useAppDispatch();
const[loading, setLoading] = useState(false);

useEffect(()=>{
  const buyerId = getCookie("buyerId");
  if(buyerId) {
    agent.Basket.get()
      .then(basket => dispatch(setBasket(basket)))
      .catch(error => console.log(error))
      .finally(()=> setLoading(false))
  }else{
    setLoading(false);
  }
}, [dispatch])

const [darkMode, setDarkMode] = useState(false);
const paletteType = darkMode ? "dark" : "light"

const theme = createTheme({
  palette:{
    mode: paletteType,
    background: {
      default: paletteType === "light" ? "#EAEAEA" : "#121212"
  }
}
})
  
function handleThemeChange()
{
  setDarkMode(!darkMode);
}

if(loading) return <LoadingCompoment message="Initializing app..." />

  return (
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
    <CssBaseline/>
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
      <Container>
       <Outlet />
      </Container>
   </ThemeProvider>
  );
}

export default App;
