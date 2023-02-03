import Home from "/static/pages/Home.js";
import About from "/static/pages/About.js";
import Login from "/static/pages/Login.js";
import Add from "/static/pages/Add.js";
import View from "/static/pages/View.js";

import { parseRequestUrl } from "./services/utils.js";

const router = function () {
  const { resource, id, verb } = parseRequestUrl();

  const routes = {
    "/": Home,
    "/about": About,
    "/login": Login,
    "/add": Add,
    "/view": View,
  };
  const parsedUrl =
    (resource ? "/" + resource : "/") +
    (id ? `${id}` : "") +
    (verb ? "/" + verb : "");

  const page = routes[parsedUrl];
  document.querySelector(".content-root").innerHTML = page.render();
};

// Listen on hash change.
window.addEventListener("hashchange", router);

// Listen on page load.
window.addEventListener("load", router);
