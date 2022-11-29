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

  const onChangeDateTime = e => {
    const resDateTime = e.target.value;
    setResDateTime(resDateTime);
  };

  const onChangeNumGuests = e => {
    const resNumGuests = e.target.value;
    setResNumGuests(resNumGuests);
  };



  const retrieveTables = () => {
    RestaurantDataService.getAll() 
      .then(response => {
        console.log(response.data);
        setTables(response.data.tables);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTables();
  };

  const find = (query, by) => {
    RestaurantDataService.find(query, by)
      .then(response => {
        console.log(response.data);
        setTables(response.data.tables);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <h1>Make a Reservation</h1>
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

        {/* 4th input box - number of customers */}
        <div className="input-group col-lg-4">
          <input
            type="number"
            className="form-control"
            placeholder="Number of Guests"
            value={resNumGuests}
            onChange={onChangeNumGuests}
          />
        </div>

        {/* 5th input box - date & time */}
        <div className="input-group col-lg-4">
          <label for="date_time">Date and Time of Reservation:</label>
          <input
            type="datetime-local"
            className="form-control"
            id="date_time"
            value={resDateTime}
            onChange={onChangeDateTime}
          />
        </div>

          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={retrieveTables}
            >
              Search for Tables
            </button>
          </div>
      </div>
      
      <div className="row">
        {tables.map((table) => {
          return (
            <div className="col-lg-4 pb-1">
              
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Table {table.table_number}</h5>
                  <p className="card-text">
                    <strong>Number of Seats: </strong>{table.table_capacity}<br/>
                  </p>
                  <div className="row">
                  <Link to={"/tables"} className="btn btn-primary col-lg-5 mx-1 mb-1">
                    Add to Reservation
                  </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })}


      </div>
    </div>
  );
};

export default RestaurantsList;