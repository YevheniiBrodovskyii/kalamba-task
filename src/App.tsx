import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Editor from "./components/Editor";
import Settings from "./components/Settings";
import { Footer, Navbar, ArticleList, Article, Profile, LoginPage, RegisterPage } from "./components";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/editor" exact component={Editor} />
          <Route path="/editor/:slug" exact component={Editor} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/profile/:username" exact component={Profile} />
          <Route path="/profile/:username/favorites" exact component={Profile} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/settings" exact component={Settings} />
          <Route path="/articles/:slug" exact component={Article} />
          <Route path="/" component={ArticleList} />
        </Switch>
      </Router>
      <Footer />
    </>
  );
}

export default App;
