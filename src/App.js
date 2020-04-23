import React from "react";
import "./App.scss";

import Home from "./pages/Home";
import Fixtures from "./pages/Fixtures";
import News from "./pages/News";
import ArticleTemplate from "./components/ArticleTemplate/ArticleTemplate";
import Gallery from "./pages/Gallery";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";

import Layout from "./components/Layout/Layout";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Layout>
          <Route exact path="/" component={Home} />
          <Route path="/fixtures" component={Fixtures} />
          <Route exact path="/news" component={News} />
          <Route exact path="/news/:slug" component={ArticleTemplate} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/resources" component={Resources} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Layout>
      </div>
    </Router>
  );
}

export default App;
