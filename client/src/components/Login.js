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
          <div className="input-div relative">
            <div className="input-div-one mt-[0]">
              <div className="i flex justify-center items-center">
                <i className="fas fa-envelope "></i>
              </div>
              <div class="div">
                <h5 className="absolute">Email</h5>
                <input type="text" class="input" />
              </div>
              <div class="input-div pass mb-[4px]">
                <div class="i">
                  <i class="fas fa-lock"></i>
                </div>
                <div class="div">
                  <h5>Password</h5>
                  <input type="password" class="input" />
                </div>
              </div>
            </div>
          </div>

          <input
            type="submit"
            class="btn block w-[100%] h-[50px] border rounded-3xl outline-none text-xl uppercase my-[1rem] cursor-pointer bg-blueTheme duration-[.5s] "
            value="Login"
          />
        </form>
      </div>
    </div>
  );
};

export default Login;
