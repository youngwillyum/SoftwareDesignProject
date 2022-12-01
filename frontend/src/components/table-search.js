import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RestaurantDataService from "../services/restaurant"

const TableSearch = props => {
  var tableList = "";
  //variables to hold reservation
  const [tables, setTables] = useState([]);
  const [resDateTime, setResDateTime ] = useState("");
  const [resNumGuests, setResNumGuests ] = useState("");

  const [resTables, setResTables] = useState([]);

  //tells react that app should do these after render
  useEffect(() => {
    //log in prompt???
    //retrieveRestaurants();
    //retrieveCuisines();
  }, []);

  const onChangeDateTime = e => {
    const resDateTime = e.target.value;
    setResDateTime(resDateTime);
  };

  const onChangeNumGuests = e => {
    const resNumGuests = e.target.value;
    setResNumGuests(resNumGuests);
  };

  const retrieveTables = () => {
    if (resNumGuests != ""){
      RestaurantDataService.getWithNumGuests(resNumGuests) 
      .then(response => {
        console.log(response.data);
        setTables(response.data.tables);
        setResTables([]);
      })
      .catch(e => {
        console.log(e);
      });
    }else{
      RestaurantDataService.getAll() 
        .then(response => {
          console.log(response.data);
          setTables(response.data.tables);
          setResTables([]);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const addToRes = e => {
    const tableNumToAdd = e.target.value;
    // if (tableList.length == 0) {
    //   tableList += tableNumToAdd
    // }
    // else {
    //   tableList = tableList + ", " + tableNumToAdd 
    // }
    for (let i = 0; i < tables.length; i++) {
      if (tables[i].table_number == tableNumToAdd){
        setResTables(resTables.concat(tables[i]));
        tables.splice(i,1)
      }
    }
  };

  const removeFromRes = e => {
    const tableNumToRemove = e.target.value;
    for (let i = 0; i < resTables.length; i++) {
      if (resTables[i].table_number == tableNumToRemove){
        setTables(tables.concat(resTables[i]));
        resTables.splice(i,1)
      }
    }
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

  const continueAsGuest = () => {

  }

  return (
    <div>
      <h1>Search For Tables</h1>
      <div className="row pb-1">
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
                    <button
                      className="btn btn-primary col-lg-5 mx-1 mb-1" 
                      type="button" 
                      value={table.table_number}
                      onClick={addToRes}
                    >
                      Add to Reservation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="current-reservation">
        <h1>Current Reservation</h1>
      </div>
      <div className="row">
        {resTables.map((table) => {
          return (
            <div className="col-lg-4 pb-1">
              
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Table {table.table_number}</h5>
                  <p className="card-text">
                    <strong>Number of Seats: </strong>{table.table_capacity}<br/>
                  </p>
                  <div className="row">
                    <button
                      className="btn btn-primary col-lg-5 mx-1 mb-1" 
                      type="button" 
                      value={table.table_number}
                      onClick={removeFromRes}
                    >
                      Remove From Reservation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="row pb-1">
          <div className="input-group-append">
          { props.user ? (<a><button
              className="btn btn-outline-secondary"
              type="button"
              onClick={retrieveTables}
            >
              Continue
            </button></a>)
               : (
                <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={retrieveTables}
              >
                Login and Continue
              </button>
                )}

            { props.user ? (<a></a>)
               : (
                <Link to={{
                  pathname:"/guest",
                  state: {
                    numGuests: resNumGuests,
                    resDT: resDateTime,
                    tabs: resTables ////////////////////////
                  }
                }} className="nav-link">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={retrieveTables}
                    >
                      Continue as Guest
                    </button>
                  </Link>
                )}
          </div>
      </div>
    </div>
  );
};

export default TableSearch;