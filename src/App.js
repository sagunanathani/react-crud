import React from "react";
import './App.css';
import Registration from "./Components/Registration";
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./Components/Login";
import PrivateRoute from "./Components/PrivateRoute";
import Profile from "./Components/Profile";

function App() {
  return (
    <div>
        <Router>
            <Routes>
                <Route exact path="/" element={<Login/>}> </Route>
                {/*//private route*/}
                <Route path="/Profile" element={<PrivateRoute Component={Profile}/>}/>
                <Route exact path="/Registration" element={<Registration/>}> </Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
