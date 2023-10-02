import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/SignIn";
import UsersList from "./UsersList";
import UserByID from "./UserByID";
import NavigationBar from "./NavigationBar";


import SignOut from "./SignOut";

function App() {

  return (
   
      <div className="App">
        <NavigationBar  />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/users"  element={<UsersList />}/>
          <Route path="/users/:id" element={<UserByID />} />

        </Routes>
      </div>
   
  );
}

export default App;
