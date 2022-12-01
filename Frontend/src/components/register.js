import React, { useState } from "react";
import Form from 'react-bootstrap/Form';

const Register = props => {
    
    const initialUserState = {
        name: "",
        id: "",
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

    
           
    
            <button onClick={login} className="btn btn-success">
              Register
            </button>
          </div>
        </div>
      );
}

export default Register; 