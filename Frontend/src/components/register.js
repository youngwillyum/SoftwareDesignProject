import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import validator from 'validator'

const Register = props => {
    
    const initialUserState = {
        name: "",
        password: "",
        phone: "",
        email: "",
        mailingaddress: "",
        billingaddress: "",
        billingtoggle: "",
        PreferredNumber: "",
        Points: "",
        PreferredPayment: "",

    
      };
    
      const [user, setUser] = useState(initialUserState);
      const [emailError, setEmailError] = useState('');
      const [passwordError, setPasswordError] = useState('');
      const validateEmail = (e) => {
        var email = e.target.value

        if (validator.isEmail(email)) {
        setEmailError('Valid Email :)')
        } else {
        setEmailError('Enter valid Email!')
      }
      
      }

      const validatePassword = (e) => {
        var password = e.target.value

        if (validator.isStrongPassword(password)) {
        setPasswordError('Strong Password :)')
        } else {
        setPasswordError('Improve Password')
      }
      
      }

    
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
                type="username"
                className="form-control"
                id="name"
                required
                maxLength={12}
                minLength={4}
                value={user.name}
                onChange={handleInputChange}
                name="name"
              />
            </div>
    
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={user.password}
                onChange={(e) => {
                  validatePassword(e)
                  handleInputChange(e)
                  }}
                name="password"
              /> <span style={{
                fontWeight: 'bold',
                color: 'red',
                }}>{passwordError}</span>
            </div>
    
            <div className="form-group" >
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                className="form-control"
                id="phone"
                required
                maxLength={12}
                minLength={10}
                value={user.phone}
                onChange={handleInputChange}
                name="phone"
              />
            </div>
          
            <div className="form-group" >
                <label htmlFor="email">Email: </label><input className="form-control" type="text" id="email"
                onChange={(e) => {
                  validateEmail(e)
                  handleInputChange(e)
                  }}></input> 
                <span style={{
                fontWeight: 'bold',
                color: 'red',
                }}>{emailError}</span>
             
            </div>

            <div className="form-group">
              <label htmlFor="mailingaddress">Mailing Address</label>
              <input
                type="text"
                className="form-control"
                id="mailingaddress"
                required
                value={user.mailingaddress}
                onChange={handleInputChange}
                name="mailingaddress"
              />
            </div>

            <div className="form-group">
              <label htmlFor="bilingaddress">Billing Address</label>
              <input
                type="text"
                className="form-control"
                id="billingaddress"
                required
                value={user.billingaddress}
                onChange={handleInputChange}
                name="billingaddress"
              />
            </div>



            <Form>
                {['radio'].map((type) => (
                    <div key={`default-${type}`} className="form-group">
                        <Form.Check 
                        type={type}
                        id={`default-${type}`}
                        label={`same as Mailing Address`}
                        />
                    </div>
                ))}
            </Form>


            <div className="form-group">
              <label htmlFor="PreferredNumber">Preferred Number</label>
              <input
                type="number"
                className="form-control"
                id="PreferredNumber"
                required
                value={user.PreferredNumber}
                onChange={handleInputChange}
                name="PreferredNumber"
              />
            </div>
           
            <div className="form-group">
              <label htmlFor="Points">Points</label>
              <input
                type="number"
                className="form-control"
                id="Points"
                disabled
                value={user.Points}
                onChange={handleInputChange}
                name="Points"
              />
            </div>

            <div className="form-group">
              <label htmlFor="PreferredPayment">Preferred Payment Method</label>
              <input
                type="text"
                className="form-control"
                id="PreferredPayment"
                required
                value={user.PreferredPayment}
                onChange={handleInputChange}
                name="PreferredPayment"
              />
            </div>
    
            <button onClick={login} className="btn btn-success">
              Register
            </button>
          </div>
        </div>
      );
}

export default Register; 