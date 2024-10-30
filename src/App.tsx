import { Routes, Route } from "react-router-dom";
import Editor from "./components/Editor";
import Settings from "./components/Settings";
import { ToastContainer } from "react-toastify";
import { Footer, Navbar, ArticleList, Article, Profile, LoginPage, RegisterPage, NotFoundPage } from "./components";

import "react-toastify/dist/ReactToastify.css";
import { Fragment } from "react/jsx-runtime";

function App() {
  return (
    <Fragment>
      <Navbar />
      <main>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/global-feed" element={<ArticleList />} />
          <Route path="/your-feed" element={<ArticleList />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/editor/:slug" element={<Editor />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/profile/:username/my" element={<Profile />} />
          <Route path="/profile/:username/favorites" element={<Profile />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
