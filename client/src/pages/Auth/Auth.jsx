import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './Auth.css';
import axios from 'axios';

// create a landing page for authorization
// ## stretch feature to create a get request to our DB for user/pw
// within this authorization there is a dedicated skip button to lead into the rest of the site
function Auth() {
  const [login, updateLogin] = useState(false);

  const loginHandler = (e) => {
    e.preventDefault();
    const user = document.getElementById('exampleFormControlInput1').value;
    const pass = document.getElementById('exampleFormControlInput2').value;
    axios.post('/user', {
      username: user,
      password: pass,
    })
      .then((res) => {
        // console.log(res.data._id)
        // Test the response.
        if (res.data._id) updateLogin(true);
        else console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const registerHandler = (e) => {
    e.preventDefault();
    const user = document.getElementById('exampleFormControlInput1').value;
    const pass = document.getElementById('exampleFormControlInput2').value;
    axios.post('/user/new', {
      username: user,
      password: pass,
    })
      .then((res) => {
        console.log(res);
        // Test the response.
        if (res.data._id) updateLogin(true);
      })
      .catch((err) => {
        if (err.response.status === 420) {
          alert(`Username ${user} already exists`);
        }
      });
  };

  if (login === true) return <Redirect to="/home" />;

  return (
    <div className="row m-0 h-100">
      <div className="col p-0 text-center d-flexjustify-content-center align-items-center display-none">
        <img src="https://i.ibb.co/XxJfK9q/95-EA8817-E472-4822-8-DAA-83-D8-E28-C1903-4.png" className="w-100"/>
      </div>
      <div className="col p-0 bg-custom d-flex justify-content-center align-items-center flex-column w-100">
        <form className="w-75" action="#">
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Username</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="username" required />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput2" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleFormControlInput2" placeholder="password" required />
          </div>
          <button type="button" onClick={loginHandler} name="login" className="btn btn-primary btn-lg btn-block mt-3">Login Now</button>
          <button type="button" name="register" className="btn btn-custom btn-lg btn-block mt-3" onClick={registerHandler}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Auth;

