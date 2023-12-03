import React from 'react';
// import ReactDOM from 'react-dom/client';
import { createRoot } from "react-dom/client";
import './styles/global.css';
import App from "./App";

const root = createRoot(document.querySelector("#root"));

root.render(<App />);

