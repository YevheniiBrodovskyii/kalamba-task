import React from "react";
import { HashRouter as Router, Routes , Route } from "react-router-dom";
import Editor from "./components/Editor";
import Settings from "./components/Settings";
import { Footer, Navbar, ArticleList, Article, Profile, LoginPage, RegisterPage } from "./components";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes >
          <Route path="/editor"  element={<Editor/>} />
          <Route path="/editor/:slug"  element={<Editor/>} />
          <Route path="/login"  element={<LoginPage/>} />
          <Route path="/profile/:username"  element={<Profile/>} />
          <Route path="/profile/:username/my"  element={<Profile/>} /> 
          <Route path="/profile/:username/favorites"  element={<Profile/>} />
          <Route path="/register"  element={<RegisterPage/>} />
          <Route path="/settings"  element={<Settings/>} />
          <Route path="/articles/:slug"  element={<Article/>} />
          <Route path="/" element={<ArticleList/>} />
          <Route path="/global-feed" element={<ArticleList/>} />
          <Route path="/your-feed" element={<ArticleList/>} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
