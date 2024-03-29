import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthContext, ColorModeContext } from "./contexts";
import { createTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const AppWrapper = () => {
  const [login, setLogin] = useState(false);
  const [mode, setMode] = React.useState('light');

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("login")) === true) setLogin(true);
    return () => {};
  }, []);

  return (
    <React.StrictMode>
      <ColorModeContext.Provider value={{ mode, setMode }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthContext.Provider value={{ login, setLogin }}>
            <App />
          </AuthContext.Provider>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.render(<AppWrapper />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
