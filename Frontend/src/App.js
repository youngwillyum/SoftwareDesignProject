import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import AddReview from "./components/add-review";
import Restaurant from "./components/restaurants";
import RestaurantsList from "./components/restaurants-list";
import Login from "./components/login";
import Register from "./components/register";

function App() {
  const [user, setUser] = React.useState(null); //create state variable (user), initialize to null, and setUser

  //login function - pass user, sets use to equal parameter
  async function login(user) {
    setUser(user);
  }

  async function register(user = null){
    setUser(user);
  }

  //logout function no parameter needed, user set to null
  async function logout() {
    setUser(null)
  }

  return (
    <div>
      {/* Nav bar from bootstrap */}
      <nav className="navbar navbar-expand navbar-dark bg-dark">

        {/* 1st link - brand/home */}
        <a href="/restaurants" className="navbar-brand">Restaurant Name</a>

        {/* remaining links */}
        <div className="navbar-nav mr-auto">

          {/* 2nd link - link to restaurants */}
          <li className="nav-item">
            {/* link imported from react-router-dom */}
            <Link to={"/restaurants"} className="nav-link">Reservations</Link> 
          </li>

          {/* 3rd link - one link that looks different based on a variable */}
          <li className="nav-item">
            {/* if user exists, run logout fxn onClick, if user does not exist, go to /login page when link clicked */}
            { user ? (<a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>Logout {user.name}</a>)
               : (<Link to={"/login"} className="nav-link">Login</Link>) }
          </li>

          <li className="nav-item">
            { user ? (<a></a>)
               : (<Link to={"/register"} className="nav-link">Register</Link>) }
          </li>
        

        </div>
      </nav>


      {/* Route section/rest of page */}
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/restaurants"]} component={RestaurantsList} />
          <Route path="/restaurants/:id/review"
            render={(props) => ( <AddReview {...props} user={user}/>)} //render allows props to be passed to AddReviews component
          />
          <Route path="/restaurants/:id"
            render={(props) => ( <Restaurant {...props} user={user}/>)}
          />
          <Route path="/login"
            render={(props) => ( <Login {...props} login={login} />)}
          />
          <Route path="/register"
            render={(props) => ( <Register {...props} register={register}/>)}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
