import React from "react"
import './App.css';
import {Route} from "react-router-dom"
import Landing from "./Pages/Landing";
import Home from "./Pages/Home";
import Detail from "./Pages/Detail";
import Post from "./Pages/Post";
import Update from "./Pages/Update";

function App() {
  return (
    <div className="App">
      <Route exact path={"/"}>
        <Landing />
      </Route>
      <Route path={"/home"} component={Home} />
      <Route path={"/detail/:id"} component={Detail}/>
      <Route path={"/post"} component={Post} />
      <Route path={"/update/:id"} component={Update}/>


    </div>
  );
}

export default App;
