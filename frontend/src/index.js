import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import ChatProvider from "./Context/ChatProvider";
import { BrowserRouter } from "react-router-dom";
const theme = extendTheme({
  colors: {
    primary: {
      main: "#41beb0",
      50: "#41beb0",
      100: "#41beb0",
      200: "#41beb0",
      300: "#41beb0",
      400: "#41beb0",
      500: "#41beb0",
      600: "#41beb0",
      700: "#41beb0",
      800: "#41beb0",
      900: "#41beb0",
    },

    secondary: {
      main: "#FFA500",
      50: "#FFA500",
      100: "#FFA500",
      200: "#FFA500",
      300: "#FFA500",
      400: "#FFA500",
      500: "#FFA500",
      600: "#FFA500",
      700: "#FFA500",
      800: "#FFA500",
      900: "#FFA500",
    },
  },
});
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <ChatProvider>
        <App />
      </ChatProvider>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
