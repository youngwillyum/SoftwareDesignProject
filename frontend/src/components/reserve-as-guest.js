import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RestaurantDataService from "../services/restaurant"

const RestaurantsList = props => {
  //variables to hold reservation
  const [tables, setTables] = useState([]);
  const [resName, setResName ] = useState("");
  const [resPhone, setResPhone ] = useState("");
  const [resEmail, setResEmail ] = useState("");
  const [resDateTime, setResDateTime ] = useState("");
  const [resNumGuests, setResNumGuests ] = useState("");

  const [resTables, setResTables] = useState([]);

  //tells react that app should do these after render
  useEffect(() => {
    //log in prompt???
    //retrieveRestaurants();
    //retrieveCuisines();
  }, []);

  const onChangeName = e => {
    const resName = e.target.value;
    setResName(resName);
  };

  const onChangePhone = e => {
    const resPhone = e.target.value;
    setResPhone(resPhone);
  };

  const onChangeEmail = e => {
    const resEmail = e.target.value;
    setResEmail(resEmail);
  };

  const createReservation = e => {
    const resEmail = e.target.value;
    setResEmail(resEmail);
  };

  return (
    <div>
      <div className="current-reservation">
        <h1>Make Reservation</h1>
      </div>
      <div className="row pb-1">
        {/* 1st input box- name */}
        <div className="input-group col-lg-4"> 
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={resName}
            onChange={onChangeName}
          />
        </div>
        {/* 2nd input box - phone */}
        <div className="input-group col-lg-4">
          <input
            type="text"
            className="form-control"
            placeholder="Phone Number"
            value={resPhone}
            onChange={onChangePhone}
          />
        </div>
        {/* 3rd input box - email */}
        <div className="input-group col-lg-4">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={resEmail}
            onChange={onChangeEmail}
          />
        </div>
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={createReservation}
            >
              Confirm Reservation
            </button>
          </div>
      </div>
    </div>
  );
};

export default RestaurantsList;