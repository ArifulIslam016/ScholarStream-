import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import useSecureInstance from "../../hooks/SecureInstance";
import useAuthhooks from "../../hooks/Authhooks";
import SocialLoginGoogle from "../../Components/SocialLogin/SocialLoginGoogle";
import { useState } from "react";

const Register = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [firebaseError,setFirebaseError]=useState('')
  const Instance = useSecureInstance();
  const { UpdateUserProfile, CreateUser,test } = useAuthhooks();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleRegister = (data) => {
    const profileImg = data.photo[0];
    CreateUser(data.email, data.password)
      .then(() => {
        setFirebaseError('')
        const formData = new FormData();
        formData.append("image", profileImg);
        const imagebbHostApi = `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_Image_host_key
        }`;
        axios
          .post(imagebbHostApi, formData)
          .then((imagedata) => {
            Instance.post("/users", {
              displayName: data.name,
              photoURL: imagedata.data.data.url,
              email: data.email,
            }).then((res) => {
              if (res.data) {
                // console.log("User Insfo saved", res.data);
              }
            });
            UpdateUserProfile({
              displayName: data.name,
              photoURL: imagedata.data.data.url,
            }).then(() => {
              navigate(location.state || "/");
            });
          })
          .catch((err) =>{
            // 
          });
      })
      .catch((eror) => {
        setFirebaseError(eror)
      });
  };
  return (
    <div className="card bg-base-100 p-10 mx-auto my-10 w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-3xl font-extrabold title">
        Register to login
      </h1>
      <form onSubmit={handleSubmit(handleRegister)}>
        <fieldset className="fieldset">
          {/* Name Section */}
          <label className="label">Name</label>
          <input
            {...register("name", { required: true })}
            type="text"
            className="input"
            placeholder="Name"
          />
          {errors?.email?.type === "required" && (
            <p className="text-red-500">Name required</p>
          )}
          {/* Photo section */}
          <label className="label">Photo</label>
          <input
            {...register("photo", { required: true })}
            type="file"
            className="file-input"
            placeholder="Photo"
          />
          {errors?.email?.type === "required" && (
            <p className="text-red-500">Photo required</p>
          )}
          {/* Email Section */}
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
              minLength: 6,
              pattern: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
            })}
            type="password"
            className="input"
            placeholder="Password"
          />
          {errors?.password?.type === "required" && (
            <p className="text-red-500">Password required</p>
          )}
          {errors?.password?.type === "minLength" && (
            <p className="text-red-500">Password must be 6 charecters</p>
          )}
          {errors?.password?.type === "pattern" && (
            <p className="text-red-500">Atleast one uppercase and speacial carecter need.</p>
          )}

          {/* <div>
            <a className="link link-hover">Forgot password?</a>
          </div> */}
          <button className="btn  outline-0 focus:outline-0 focus:ring-0 border-0  bg-gradient-to-l from-[#16E2F5] to-[#1E90FF] mt-4">
            Register
          </button>
          {firebaseError&&<p className="text-red-500">{firebaseError.code.split('/')[1].split('-').join(" ")}</p>}
        </fieldset>
      </form>
      <p>
        Already have an account?{" "}
        <Link
          state={location.state}
          className="text-pink-500 underline"
          to={"/login"}
        >
          Login
        </Link>
      </p>
      <SocialLoginGoogle></SocialLoginGoogle>
    </div>
  );
};

export default Register;