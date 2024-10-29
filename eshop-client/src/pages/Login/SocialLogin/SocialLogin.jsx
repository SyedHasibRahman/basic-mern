

import { FaGoogle } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation hook to get location state

  // Fallback to root path if no previous state is found
  const from = location.state?.from?.pathname || "/";

  /* console.log("location.state:", location.state);
  console.log("location.state?.from?.pathname:", from); */

  const handleGoogleSignIn = (e) => {
    e.preventDefault(); // Prevent default form submission
    googleSignIn().then((result) => {
      console.log(result.user);
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
    <div>
      <form>
        <button
          onClick={ handleGoogleSignIn }
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6"
        >
          <div className="flex ">
            <p className="mr-2">
              <FaGoogle className="mt-1" />
            </p>
            <p>Google</p>
          </div>
        </button>
      </form>
    </div>
  );
};

export default SocialLogin;
