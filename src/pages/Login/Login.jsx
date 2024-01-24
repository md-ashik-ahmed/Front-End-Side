// import { useRef } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../../redux/actions/useActions";
import { PulseLoader } from "react-spinners";
import { useEffect } from "react";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const loginResponseMessage = useSelector(
    (state) => state.user.responseMessage
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogInData = async (formData) => {
    setIsLoading(true);
    await dispatch(userLogin(formData));
    setIsLoading(false);
  };
  useEffect(() => {
    if (loginResponseMessage === "Successfully logged in") {
      setTimeout(() => {
        navigate("/dashboard");
      }, 400);
    }
  }, [navigate, loginResponseMessage]);

  return (
    <section className=" max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 py-3 md:py-6 lg:py-9 2xl:py-12">
      <div className=" flex flex-col justify-center items-center max-w-lg mx-4 sm:mx-auto shadow-md bg-white py-5 border-neutral-200 border rounded-xl">
        <h5 className=" text-textColor text-3xl font-medium">Log in</h5>
        <div className=" py-4">
          <form onSubmit={handleSubmit(handleLogInData)}>
            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="input input-bordered w-[300px] sm:w-[400px]"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>
            <div className="relative mt-3">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full transition-all duration-300"
                {...register("password", {
                  required: true,
                })}
              />
              <span
                className="absolute top-[70%] right-3 transform -translate-y-1/2 text-[#222222] text-xs font-semibold underline cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? "Hide" : "Show"}
              </span>
            </div>
            <div className="w-[300px] sm:w-[400px] mt-5">
              <button
                disabled={isLoading}
                className={`w-full py-3 rounded-md text-white font-medium bg-primary hover:bg-accent duration-300 transition ease-in-out disabled:bg-[#dddddd] ${
                  isLoading ? "cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <PulseLoader
                    color="#5cd183"
                    size={7}
                    margin={4}
                    speedMultiplier={0.6}
                  />
                ) : (
                  "Login"
                )}
              </button>
              <p className=" text-sm mt-2 flex gap-1 justify-center">
                New to House Hunter?
                <Link to="/register" className=" text-blue-600 hover:underline">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;

