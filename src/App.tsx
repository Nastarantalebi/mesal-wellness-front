import { Provider } from "react-redux";
import "./assets/css/app.css";
import "./assets/css/fonts/_public-sans.css";
import "./assets/css/fonts/_vazirmatn.css";
import { store } from "./stores/store";
import Router from "./router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./libs/queryClient";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
