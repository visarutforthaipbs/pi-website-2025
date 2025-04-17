import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import App from "./App";

// Extend the theme to customize it
const theme = extendTheme({
  colors: {
    brand: {
      50: "#f8f9fa",
      100: "#e9ecef",
      500: "#fcb000", // primary color
      700: "#e6a000",
      900: "#1f2937", // secondary color
    },
  },
  fonts: {
    heading: "system-ui, sans-serif",
    body: "system-ui, sans-serif",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
