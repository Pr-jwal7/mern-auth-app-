import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";

const URL = "http://localhost:5000/api/auth/login";
export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const {storeTokenInLS} = useAuth(); // getting it as object

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
        ...user,
        [name] : value,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login submitted", user);

    try {
      const response = await fetch(URL,{
        method:"POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(user),
      });

      console.log("login form",response);

      if(response.ok){
        const res_data = await response.json();
        alert('Login Successfull');
        storeTokenInLS(res_data.token) ; // calling a fn to store the token in local storage m1
        
        setUser({  email: "",password: "",});
        navigate("/");
      }
      else{
        console.log("Invalid credentials");
      }
    } catch (error) {
      console.log("Login",error);
    }

  };

    return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/login.png"
                  alt="a girl is trying to do registration"
                  width="500"
                  height="500"
                />
              </div>

              <div className="registration-form">
                <h1 className="main-heading mb-3">login form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">email</label>
                    <input
                      type="text"
                      name="email"
                      placeholder="email"
                      id="email"
                      required
                      autoComplete="off"
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="enter your email"
                      id="password"
                      required
                      autoComplete="off"
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    
    </>
    );
};
