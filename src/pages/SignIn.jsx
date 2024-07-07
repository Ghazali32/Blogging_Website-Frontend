import { useEffect, useState } from "react";
import { Heading } from "../components/Heading";
import { InputFeild } from "../components/InputFeild";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/Alert";
import NavBar from "../components/NavBar";
import { signIn } from "../features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const res = useSelector((state) => state.auth.user);
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useEffect(()=>{
    if(authStatus === "succeeded")
    {
      navigate("/landing")
    }
  },[authStatus, navigate])
  return (
    <div className="overflow-x-hidden overflow-y-hidden bg-slate-100 w-screen h-screen">
      <NavBar></NavBar>
      <div className="mb-8 h-full  bg-slate-100 flex justify-center items-center">
        <div className="bg-white  rounded shadow-md p-3">
          <Heading text="Sign In"></Heading>
          <SubHeading text="Enter your credidential to access"></SubHeading>
          <InputFeild
            placeholder={"user@gmail.com"}
            label="Email"
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
                  dispatch(signIn({ email, password }));
                }}
              >
                Sign In
              </button>
            )}
          </div>
          {authError && <div className="mt-2 text-red-600">{authError}</div>}
          <div>
            <Alert
              text="Don't Have an Account?"
              buttonText="Sign Up"
              to={"/"}
            ></Alert>
          </div>
        </div>
      </div>
    </div>
  );
}
