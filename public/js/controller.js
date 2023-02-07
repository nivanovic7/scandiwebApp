import Home from "/static/pages/Home.js";
import About from "/static/pages/About.js";
import Login from "/static/pages/Login.js";
import Add from "/static/pages/Add.js";
import View from "/static/pages/View.js";
import Error from "/static/pages/Error.js";
import { parseRequestUrl } from "./services/utils.js";

const router = async function () {
  const content = document.querySelector(".content-root");

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

  const page = routes[parsedUrl] || Error;
  content.innerHTML = await page.render();
  page.afterRender();
};

// Listen on hash change.
window.addEventListener("hashchange", router);
// Listen on page load.
window.addEventListener("load", router);
