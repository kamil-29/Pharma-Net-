import { CssBaseline, ThemeProvider } from "@mui/material";
import RouterWrapper from "./routes";
import { lighttheme } from "./styles/theme";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function App() {
  return (
    <>
      <ThemeProvider theme={lighttheme}>
        <CssBaseline />
          <RouterWrapper />
      </ThemeProvider>
    </>
  );
}

export default App;
