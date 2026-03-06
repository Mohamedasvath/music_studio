import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SongProvider } from "./context/SongContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <SongProvider>
    <App />
  </SongProvider>
);



