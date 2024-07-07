import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import { Heading } from "../components/Heading";
import { InputFeild } from "../components/InputFeild";
import NavBar from "../components/NavBar";
import { SubHeading } from "../components/SubHeading";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";
import { signUp } from "../features/auth/authSlice";

function SignUp() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (authStatus === "succeeded") {
      navigate("/landing");
    }
  }, [authStatus, navigate]);

  return (
    <div className="overflow-x-hidden overflow-y-hidden bg-slate-100 w-screen h-screen">
      <NavBar></NavBar>
      <div className=" mt-16 w-screen  bg-slate-100 flex justify-center items-center">
        <div className="bg-white p-3 h-max rounded-md shadow-md">
          <Heading text="Sign Up"></Heading>
          <SubHeading text="Enter your info to create an account"></SubHeading>
          <InputFeild
            label="Name"
            placeholder="Ghazali"
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></InputFeild>
          <InputFeild
            label="Email"
            placeholder="ghz@yahoo.com"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          ></InputFeild>
          <InputFeild
            type="password"
            label="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></InputFeild>
          <div className="w-full p-2 text-center">
            {authStatus === "loading" ? (
              <CircularProgress />
            ) : (
              <button
                className="bg-blue-500 text-white w-full p-2 pt-2 pb-2 rounded mt-2"
                onClick={() => {
                  dispatch(signUp({ email, name, password }));
                }}
              >
                Sign Up
              </button>
            )}
          </div>
          {authError && <div className="mt-2 text-red-600">{authError}</div>}
          <div>
            <Alert
              text="Already Have an Account?"
              buttonText="Sign In"
              to={"/signin"}
            ></Alert>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
