import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import Article from "./components/Article";
import ArticleList from "./components/ArticleList";
import Editor from "./components/Editor";
import LoginRegister from "./components/LoginRegister";
import Logout from "./components/Logout";
import Profile from "./components/Profile";
import Settings from "./components/Settings";
import { Footer, Navbar } from "./components";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Switch>
          <Route path="/editor" exact component={Editor} />
          <Route path="/editor/:slug" exact component={Editor} />
          <Route path="/login" exact component={LoginRegister} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/profile/:username" exact component={Profile} />
          <Route path="/profile/:username/favorites" exact component={Profile} />
          <Route path="/register" exact component={LoginRegister} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/:slug" exact component={Article} />
          <Route path="/" component={ArticleList} />
        </Switch>
      </Router>
      <Footer/>
    </>
  );
}

export default App;
