import { Typography, Layout, Space } from "antd";
import { Switch, Route, Link, Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import News from "./components/New";
import Currencies from "./components/Currencies";
import Exchanges from "./components/Exchanges";
import "./App.css";
import CryptoDetail from "./components/CoinDetail";

function App() {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/currencies">
                <Currencies />
              </Route>
              <Route exact path="/exchanges">
                <Exchanges />
              </Route>
              <Route exact path="/news">
                <News />
              </Route>
              <Route exact path="/crypto/:id">
                <CryptoDetail />
              </Route>
            </Switch>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title
            level={5}
            style={{ textAlign: "center", color: "white" }}
          >
            All Rights Reserved
            <br />
            Crypto Hub
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/currencies">Currencies</Link>
            <Link to="/news">News</Link>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default App;
