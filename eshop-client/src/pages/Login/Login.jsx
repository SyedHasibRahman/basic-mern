import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import SocialLogin from "./SocialLogin/SocialLogin";
import useAxiosPublic from "../../hooks/useAxiosPublic";
// import useAxiosPublic from '../../hooks/useAxiosPublic';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const axiosPublic = useAxiosPublic();
  // const axiosPublic = useAxiosPublic()

  const from = location.state?.from?.pathname || "/";
  /*  console.log("location.state:", location);
   console.log(
     "location.state?.from?.pathname:",
     location.state?.from?.pathname
   ); */

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log(email, password);
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire({
        title: "User Login Successful.",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
      navigate(from, { replace: true });
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photoURL: result.user?.photoURL,
      };
      axiosPublic.post("/api/v1/othooyUsers", userInfo).then((res) => {
        console.log(res.data);
        // Navigate to the "from" path or fallback to root "/"
        navigate(from, { replace: true });
      });
    });
  };

  return (
    <>
      <Helmet>
        <title>Othooy | Login</title>
      </Helmet>
      <div className="mx-auto container p-4">
        <div className="bg-slate-100 p-5 w-full max-w-sm mx-auto">
          {/* <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
            <SocialLogin></SocialLogin> */}
          <form onSubmit={ handleLogin } className="pt-6 flex flex-col gap-2">
            <div className="grid">
              <label className="label">Email :</label>
              <div className="bg-white p-2">
                <input
                  type="email"
                  name="email"
                  placeholder="email"
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>
            <div>
              <label className="label">Password :</label>
              <div className="bg-white p-2 flex">
                <input
                  type={ showPassword ? "text" : "password" }
                  name="password"
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
              <Link
                to={ "/forgot-password" }
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot password ?
              </Link>
            </div>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Login
            </button>
          </form>
          <SocialLogin />
          <p className="my-5">
            Don&apos;t have account ?{ " " }
            <Link
              to={ "/signup" }
              className=" text-red-600 hover:text-red-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
      {/* </div> */ }
    </>
  );
};

export default Login;
