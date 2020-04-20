import React from "react";
import "./App.css";

import Home from "./containers/Home";
import Fixtures from "./containers/Fixtures";
import News from "./containers/News";
import ArticleTemplate from "./components/ArticleTemplate";
import Gallery from "./containers/Gallery";
import Resources from "./containers/Resources";
import Contact from "./containers/Contact";

import Layout from "./components/Layout";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
        </Layout>
      </div>
    </Router>
  );
}

export default App;
