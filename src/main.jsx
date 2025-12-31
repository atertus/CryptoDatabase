import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../routes/layout.jsx";
import DetailView from "../routes/DetailView.jsx";
import NotFound from "../routes/NotFound.jsx"; // Import the NotFound component

// Create the root and render the app
const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={false} path="/CoinDetails/:symbol" element={<DetailView />} />
          <Route index={true} element={<App />} />
        </Route>
        <Route path="*" element={<NotFound />} /> {/* Catch-all route */}
      </Routes>
    </BrowserRouter>
  </StrictMode>
);