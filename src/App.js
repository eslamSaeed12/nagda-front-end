import React from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Index from "./pages/index";
import InternalSdown from "./pages/internal-server-down";
import AboutUs from "./pages/about-us";
import faqs from "./pages/faqs";
import webApp from "./pages/web-app";
import profile from "./pages/profile";
import contactUs from "./pages/contact-us";
import MaxUsage from "./pages/max-usage";
import logout from "./pages/logout";
import login from "./pages/login";
import NoStations from "./pages/no-stations";

const pages = [
  {
    route: "/",
    page: Index,
  },
  {
    route: "/internal-server-down",
    page: InternalSdown,
  },
  {
    route: "/about-us",
    page: AboutUs,
  },
  {
    route: "/faqs",
    page: faqs,
  },
  {
    route: "/web-app",
    page: webApp,
  },
  {
    route: "/profile",
    page: profile,
  },
  {
    route: "/contact-us",
    page: contactUs,
  },
  {
    route: "/login",
    page: login,
  },
  {
    route: "/logout",
    page: logout,
  },
  {
    route: "/max-usage",
    page: MaxUsage,
  },
  {
    route: "/no-stations",
    page: NoStations,
  },
];

function App() {
  return (
    <>
      <Router>
        <Switch>
          {pages.map((p, i) => {
            let key = Math.round(Math.random() * 1000);
            if (p.route === "/") {
              return (
                <Route
                  component={p.page}
                  path={p.route}
                  key={`${key}-${i}`}
                  exact
                />
              );
            }
            return (
              <Route component={p.page} path={p.route} key={`${key}-${i}`} />
            );
          })}
        </Switch>
      </Router>
    </>
  );
}

export default App;
