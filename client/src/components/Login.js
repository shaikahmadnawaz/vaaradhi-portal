import React from "react";
import LoginImg from "../assets/login.svg";

const Login = () => {
  return (
    <div className="container w-screen h-screen grid grid-cols-2 gap-[7rem] py-[2rem]">
      <div className="img flex justify-end items-center">
        <img className="w-[500px]" src={LoginImg} alt="" />
      </div>
      <div className="login-content flex justify-start items-center text-center">
        <form className="w-[360px]" action="">
          <h2 className="title my-[15px] text-blueTheme uppercase text-5xl font-bold">
            Welcome
          </h2>
          <div className="input-div relative grid grid-cols-14 my-[25px] py-[5px]">
            <div className="input-div-one mt-0 flex items-center">
              <div className="i text-blueTheme flex justify-center items-center">
                <i className="fas fa-envelope"></i>
              </div>
              <div className="input-div-two">
                <input
                  type="email"
                  id="email"
                  className="input border-b-2 border-gray-400 focus:outline-none w-full py-1 text-base ml-2"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div className="input-div pass mb-4 flex items-center">
              <div className="i text-blueTheme flex justify-center items-center">
                <i className="fas fa-lock"></i>
              </div>
              <div className="input-div-two">
                <input
                  type="password"
                  id="password"
                  className="input border-b-2 border-gray-400 focus:outline-none w-full py-1 text-base ml-2"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-row items-start mx-4">
            <div className="flex mx-4 items-center">
              <input type="radio" name="login-type" id="Donor" value="Donor" />
              <label htmlFor="Donor" className="ml-2 text-blueTheme">
                Donor
              </label>
            </div>
            <div className="flex mx-4 items-center">
              <input type="radio" name="login-type" id="admin" value="admin" />
              <label htmlFor="admin" className="ml-2 text-blueTheme">
                Admin
              </label>
            </div>
            <div className="flex mx-4 items-center">
              <input
                type="radio"
                name="login-type"
                id="Caretaker"
                value="Caretaker"
              />
              <label htmlFor="Caretaker" className="ml-2 text-blueTheme">
                Caretaker
              </label>
            </div>
          </div>
          <input
            type="submit"
            className="btn block w-full h-12 rounded-lg uppercase my-4 cursor-pointer bg-blueTheme text-white hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
