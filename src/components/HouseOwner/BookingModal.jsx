/* eslint-disable react/prop-types */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { PulseLoader } from "react-spinners";
import api from "../../redux/api/api";

const BookingModal = ({ houseId, refetch, bookingList }) => {
  const housesID = houseId;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  const user = useSelector((state) => state.user.userDetails);

  const handleBookings = async (data) => {
    const BookingUserData = {
      ...data,
      name: user?.name,
      email: user?.emailId,
      userId: user?._id,
    };
    if (bookingList.length >= 2 && user?.role === "House Owner") {
      window.my_modal_1.close();
      toast.error("Only house renter can book places");
    }
    if (bookingList.length >= 2 && user?.role !== "House Owner") {
      window.my_modal_1.close();
      toast.error("Can't book more than two place!!");
    }
    if (bookingList.length < 2) {
      try {
        setIsLoading(true);
        const bookingResponse = await api.post("/auth/bookings", {
          housesID,
          BookingUserData,
        });
        if (bookingResponse?.data.status === 200) {
          toast.success(bookingResponse?.data.message);
          setIsLoading(false);
          refetch();
          window.my_modal_1.close();
          reset();
        }
        console.log(bookingResponse, "Booking response");
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
        <form
          method="dialog"
          className="modal-box"
          onSubmit={handleSubmit(handleBookings)}
        >
          <h3 className="font-bold text-lg flex justify-center">
            Give information to book this place!
          </h3>
          {/* House information input */}
          <div className=" my-5">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                defaultValue={user?.name}
                className="input input-bordered w-full"
                {...register("name")}
                disabled={true}
              />
              {errors.name && (
                <div
                  role="alert"
                  className=" flex flex-row items-center gap-2 mt-1"
                >
                  <p className="text-xs text-[#c13515]">Name is required</p>
                </div>
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                defaultValue={user?.emailId}
                className="input input-bordered w-full"
                {...register("email")}
                disabled={true}
              />
              {errors.email && (
                <div
                  role="alert"
                  className=" flex flex-row items-center gap-2 mt-1"
                >
                  <p className="text-xs text-[#c13515]">Email is required</p>
                </div>
              )}
            </div>
            <div className="form-control w-full mt-3">
              <label className="label">
                <span className="label-text">Phone number</span>
              </label>
              <input
                type="text"
                placeholder="Your phone number"
                className="input input-bordered w-full"
                {...register("phoneNumber", {
                  required: true,
                  pattern: {
                    value: /^(?:\+?88)?01[3-9]\d{8}$/,
                    message:
                      "Please provide a valid Bangladeshi phone number. +880..",
                  },
                })}
              />
              {errors.phoneNumber && (
                <div
                  role="alert"
                  className=" flex flex-row items-center gap-2 mt-1"
                >
                  <p className="text-xs text-[#c13515]">
                    {errors.phoneNumber.message}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* submit button */}
          <div className="modal-action">
            <button
              disabled={isLoading}
              className="bg-primary disabled:btn-error disabled:cursor-not-allowed disabled:bg-[#dddddd] px-3 py-2 rounded-md text-white hover:bg-accent transition duration-200 font-medium"
            >
              {isLoading ? (
                <PulseLoader
                  color="#afd6e9"
                  size={7}
                  margin={4}
                  speedMultiplier={0.6}
                />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </form>
        {/* close button */}
        <form
          method="dialog"
          className="modal-backdrop"
          onClick={() => {
            reset();
          }}
        >
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default BookingModal;
