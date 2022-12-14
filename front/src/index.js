import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import './index.css'
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000/';

ReactDom.render(
  <>
    <BrowserRouter>
    <App/>
    </BrowserRouter>
  </>,
  document.getElementById("root")
)