import { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
// import loginIcons from "../../OTA/assets/signin.gif";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const userInfo = {
              name: data.name,
              email: data.email,
            };

            axiosPublic.post("/api/v1/othooyUsers", userInfo).then((res) => {
              console.log(res.data);
              if (res.data.createdAt) {
                console.log("User added to the database");
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "User created successfully.",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate("/");
              }
            });
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Failed to update user profile.",
            });
          });
      })
      .catch((error) => {
        console.error("Error during sign up:", error);

        // Handle specific Firebase errors
        if (error.code === "auth/email-already-in-use") {
          Swal.fire({
            icon: "error",
            title: "Email Already in Use",
            text: "The email address is already in use by another account.",
          });
        } else if (error.code === "auth/weak-password") {
          Swal.fire({
            icon: "error",
            title: "Weak Password",
            text: "The password must be at least 6 characters long.",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Sign Up Failed",
            text: error.message, // Display any other errors
          });
        }
      });
  };


  return (
    <>
      <Helmet>
        <title>Othooy | Sign Up</title>
      </Helmet>

      <div className="mx-auto container p-4">
        <div className="bg-slate-100 p-5 w-full max-w-sm mx-auto">
          {/* <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={loginIcons} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input type="file" className="hidden" />
              </label>
            </form>
          </div> */}
          <form
            onSubmit={ handleSubmit(onSubmit) }
            className="pt-6 flex flex-col gap-2"
          >
            <div className="grid">
              <label className="label">Name :</label>
              <div className="bg-white p-2">
                <input
                  type="text"
                  { ...register("name", { required: true }) }
                  name="name"
                  placeholder="Name"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
              { errors.name && (
                <span className="text-red-600">Name is required</span>
              ) }
            </div>
            <div className="grid">
              <label className="label">Email :</label>
              <div className="bg-white p-2">
                <input
                  type="email"
                  { ...register("email", { required: true }) }
                  name="email"
                  placeholder="email"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
              { errors.email && (
                <span className="text-red-600">Email is required</span>
              ) }
            </div>
            <div>
              <label className="label">Password</label>
              <div className="bg-white p-2 flex">
                <input
                  type={ showPassword ? "text" : "password" }
                  { ...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                  }) }
                  placeholder="password"
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={ () => setShowPassword((preve) => !preve) }
                >
                  <span>{ showPassword ? <FaEyeSlash /> : <FaEye /> }</span>
                </div>
              </div>
              { errors.password?.type === "required" && (
                <p className="text-red-600">Password is required</p>
              ) }
              { errors.password?.type === "minLength" && (
                <p className="text-red-600">Password must be 6 characters</p>
              ) }
              { errors.password?.type === "maxLength" && (
                <p className="text-red-600">
                  Password must be less than 20 characters
                </p>
              ) }
            </div>
            <div>
              <label className="label">Confirm Password</label>
              <div className="bg-white p-2 flex">
                <input
                  type={ showConfirmPassword ? "text" : "password" }
                  { ...register("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  }) }
                  placeholder="confirm password"
                  className="w-full h-full outline-none bg-transparent"
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={ () => setShowConfirmPassword((preve) => !preve) }
                >
                  <span>
                    { showConfirmPassword ? <FaEyeSlash /> : <FaEye /> }
                  </span>
                </div>
              </div>
              { errors.confirmPassword && (
                <p className="text-red-600">{ errors.confirmPassword.message }</p>
              ) }
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Sign Up
            </button>
          </form>
          <SocialLogin />
          <p className="my-5">
            Already have account ?{ " " }
            <Link
              to={ "/login" }
              className=" text-red-600 hover:text-red-700 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUp;
