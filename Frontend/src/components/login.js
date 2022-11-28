import React, { useState } from "react";

const Login = props => {

  const initialUserState = {
    name: "",
    id: "",
    phone: "",
    email: "",
    date_time: "",
    numberofGuests: ""

  };

  const [user, setUser] = useState(initialUserState);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const login = () => {
    props.login(user)
    props.history.push('/'); //update url - go to homepage
  }

  return (
    <div className="submit-form">
      <div>
        <div className="form-group">
          <label htmlFor="user">Username</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            value={user.name}
            onChange={handleInputChange}
            name="name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            className="form-control"
            id="id"
            required
            value={user.id}
            onChange={handleInputChange}
            name="id"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            className="form-control"
            id="phone"
            required
            value={user.phone}
            onChange={handleInputChange}
            name="phone"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            className="form-control"
            id="email"
            required
            value={user.email}
            onChange={handleInputChange}
            name="email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="date_time">Date & Time</label>
          <input
            type="datetime-local"
            className="form-control"
            id="date_time"
            required
            value={user.date_time}
            onChange={handleInputChange}
            name="date_time"
          />
        </div>

        <div className="form-group">
          <label htmlFor="numberofGuests">Number of Guests</label>
          <input
            type="text"
            className="form-control"
            id="numberofGuests"
            required
            value={user.numberofGuests}
            onChange={handleInputChange}
            name="numberofGuests"
          />
        </div>

        <button onClick={login} className="btn btn-success">
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;