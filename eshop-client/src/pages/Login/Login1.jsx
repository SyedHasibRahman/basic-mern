import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import loginImg from "../../OTA/assets/signin.gif";
import { FaGoogle } from "react-icons/fa";

const Login1 = () => {
  return (
    <section id="signup ">
      <div className="mx-auto container p-4 mt-20">
        <div className="bg-slate-100 p-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
              <img src={loginImg} alt="login icons" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Photo
                </div>
                <input type="file" className="hidden" />
              </label>
            </form>
          </div>

          <form className="pt-6 flex flex-col gap-2">
            <div className="grid">
              <label>Email : </label>
              <div className="bg-white p-2">
                <input
                  type="email"
                  placeholder="enter email"
                  name="email"
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
              </div>
            </div>

            <div>
              <label>Password : </label>
              <div className="bg-white p-2 flex">
                <input
                  type="password"
                  placeholder="enter password"
                  name="password"
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div className="cursor-pointer text-xl">
                  <span>
                    {" "}
                    <FaEyeSlash />{" "}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to={"/forgotPassword"}
              className="block w-fit ml-auto hover:underline hover:text-red-600"
            >
              Forgot password ?
            </Link>

            <div className="flex">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                <div className="flex ">
                  <p className="mr-2">
                    <FaGoogle className="mt-1" />
                  </p>
                  <p>Google</p>
                </div>
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
                Sign Up
              </button>
            </div>
          </form>

          <p className="my-5">
            Don&apos;t have an account?{" "}
            <Link
              to={"/signup1"}
              className=" text-red-600 hover:text-red-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login1;
