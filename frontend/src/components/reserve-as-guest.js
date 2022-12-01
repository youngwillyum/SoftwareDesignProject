import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import RestaurantDataService from "../services/restaurant"


const RestaurantsList = props => {
  
  //variables to hold reservation
  const [resName, setResName ] = useState("");
  const [resPhone, setResPhone ] = useState("");
  const [resEmail, setResEmail ] = useState("");


  const [resDateTime, setResDateTime ] = useState("");
  const [resNumGuests, setResNumGuests ] = useState("");
  const [resTables, setResTables] = useState([]);

  const [submitted, setSubmitted] = useState(false);
  const [traf, setTraf] = useState(false);

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber ] = useState("");
  const [cardDate, setCardDate] = useState([]);

  // setResNumGuests(props.location.state.numGuests);

  const setVariables = e => {
    setResNumGuests(props.location.state.numGuests);
    setResDateTime(props.location.state.resDT);
    setResTables(props.location.state.tabs);
    setTraf(props.location.state.traf);
  };
  
  const saveReservation = () => {
    
    var data = {
      name : resName,
	    phone : resPhone,
	    email : resEmail,
	    date : resDateTime,
	    num_guests : resNumGuests,
	    tables : resTables
    };
    
    RestaurantDataService.createReservation(data)
        .then(response => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      };

  //tells react that app should do these after render
  useEffect(() => {
    setVariables();
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

  const onChangeCardName = e => {
    const cardName = e.target.value;
    setCardName(cardName);
  };

  const onChangeCardNum = e => {
    const cardNumber = e.target.value;
    setCardNumber(cardNumber);
  };

  const onChangeCardDate = e => {
    const cardDate = e.target.value;
    setCardDate(cardDate);
  };

  return (
    <div>
      <div className="submit-form">
        {submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <Link to={"/tables"} className="btn btn-success">
              Back to Table Search
            </Link>
          </div>
        ) : (
          <div>
            <div className="current-reservation">
              <h1>Make Reservation</h1>
            </div>

            <div className="display-group col-lg-4">
              <h5>Number of guests: {resNumGuests} </h5>
            </div>

            <div className="display-group col-lg-4">
              <h5>Reservation Date and Time: {resDateTime} </h5>
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
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="display-group col-lg-4">
              {/* <h5>Tables reserved: {props.location.state.tabs} </h5> */}
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
              <div>{traf ? (
                <div>
                  <div className="display-group col-lg-4">
                    <h5>Credit card info for high-traffic no show fee:</h5>
                  </div>

                  <div className="input-group col-lg-4">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name on card"
                      value={cardName}
                      onChange={onChangeCardName}
                    />
                  </div>
                  <div className="input-group col-lg-4">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Card number"
                      value={cardNumber}
                      onChange={onChangeCardNum}
                    />
                  </div>
                  <div className="input-group col-lg-4">
                    <input
                      type="month"
                      className="form-control"
                      placeholder="Expiration date"
                      value={cardDate}
                      onChange={onChangeCardDate}
                    />
                  </div>
                </div>
                ):(
                  <p></p>
                )}
                </div>
              

                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={saveReservation}
                  >
                    Create Reservation
                  </button>
                </div>
            </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantsList;