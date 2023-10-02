import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import SignUp from "./SignUp";
import SignIn from './SignIn';
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
