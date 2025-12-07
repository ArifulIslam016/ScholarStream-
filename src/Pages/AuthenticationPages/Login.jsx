import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuthhooks from "../../hooks/Authhooks";
import SocialLoginGoogle from "../../Components/SocialLogin/SocialLoginGoogle";

const Login = () => {
  const location=useLocation()
    const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signInUser } = useAuthhooks();
  const handleLogin = (data) => {
    signInUser(data.email, data.password)
      .then((data) => {
        if (data) {
          navigate(location?.state||"/");
        }
      })
      .catch((err) => {
      });
  };
  return (
    <div className="card bg-base-100 p-10 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-3xl font-extrabold title">Please Login</h1>

      <form onSubmit={handleSubmit(handleLogin)}>
        <fieldset className="fieldset">
          <label className="label">Email</label>
          <input
            {...register("email", { required: true })}
            type="email"
            className="input"
            placeholder="Email"
          />
          {errors?.email?.type === "required" && (
            <p className="text-red-500">Email required</p>
          )}
          <label className="label">Password</label>
          <input
            {...register("password", {
              required: true,
            })}
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors?.password?.type === "required" && (
            <p className="text-red-500">Password cannot be empty</p>
          )}

          {/* <div>
            <a className="link link-hover">Forgot password?</a>
          </div> */}
          <button className="btn  bg-gradient-to-l from-[#16E2F5] to-[#1E90FF]  outline-0 focus:outline-0 focus:ring-0 border-0  mt-4">
            Login
          </button>
        </fieldset>
      </form>
      <p>
        You dont have any account?{" "}
        <Link state={location.state} className="text-pink-500 underline" to={"/register"}>
          Register
        </Link>
      </p>
      <SocialLoginGoogle></SocialLoginGoogle>
    </div>
  );
};

export default Login;